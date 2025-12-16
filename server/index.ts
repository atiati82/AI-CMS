import 'dotenv/config';
import { validateEnvironment } from './middleware/envValidator';
import { apiLimiter } from './middleware/rateLimiter';
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import path from "path";
import { registerRoutes } from "./routes";
import { registerModularRoutes } from "./routes/index";
import { serveStatic } from "./static";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import { getStripeSync } from "./services/stripeClient";
import { WebhookHandlers } from "./services/webhookHandlers";

// Validate environment variables before starting server
validateEnvironment();

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

declare module "express-session" {
  interface SessionData {
    adminUserId?: string;
  }
}

// CRITICAL: Stripe webhook route MUST be registered BEFORE express.json() middleware
// This ensures the raw body is available for signature verification
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    const payload = req.body;
    if (!Buffer.isBuffer(payload)) {
      return res.status(400).json({ error: 'Payload must be raw buffer' });
    }

    const uuid = uuidv4();
    await WebhookHandlers.processWebhook(payload, signature, uuid);

    res.status(200).json({ received: true, uuid });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(400).json({ error: 'Webhook processing failed' });
  }
});

// Setup PostgreSQL session store
const PgSession = connectPgSimple(session);
const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "andara-ionic-cms-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    store: new PgSession({
      pool: pgPool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

app.use(
  express.json({
    limit: '50mb', // Reduced from 300mb for security
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: '50mb' })); // Reduced from 300mb

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Debug session info for admin routes
      if (path.startsWith("/api/admin")) {
        const cookieHeader = req.headers.cookie || 'NO_COOKIE';
        const sessionId = req.session?.id || 'NO_SESSION';
        const adminUserId = req.session?.adminUserId || 'NO_ADMIN_USER';
        log(`[SESSION DEBUG] cookie: ${cookieHeader.substring(0, 50)}... sessionId: ${sessionId} adminUserId: ${adminUserId}`);
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize Stripe sync (StripeSync auto-initializes in constructor)
  try {
    await getStripeSync();
    console.log('[stripe] Stripe sync ready');
  } catch (error) {
    console.error('[stripe] Failed to initialize Stripe sync:', error);
  }

  // Serve generated images and attached assets
  app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

  // Register new modular routes (Phase 1: Public routes)
  await registerModularRoutes(httpServer, app);

  // Register old monolithic routes (will be phased out)
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Server error:", err);
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
