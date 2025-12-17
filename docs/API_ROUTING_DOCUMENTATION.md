# Andara AI CMS - Complete API Routing Documentation

## Overview

The AI CMS has 80+ API endpoints organized into 12 categories. This document provides complete documentation for AI understanding and integration.

**Base URL:** `http://localhost:3000`

## Route Categories at a Glance

| Category | Base Path | Endpoints | Purpose |
|----------|-----------|-----------|---------|
| BigMind Agents | `/api/agents` | 10 | AI agent control and monitoring |
| AI Chat | `/api/ai/chat` | 4 | Natural language CMS interface |
| AI Pages | `/api/ai/pages` | 8 | AI page management |
| AI SEO | `/api/ai/seo` | 8 | SEO analysis and optimization |
| AI Knowledge | `/api/ai/knowledge` | 5 | RAG document ingestion |
| AI Agents Status | `/api/ai/agents` | 4 | Agent registry and tools |
| Public Pages | `/api/pages` | 6 | Public page access |
| Public Products | `/api/products` | 2 | Product catalog |
| Admin Auth | `/api/admin` | 4 | Authentication |
| Admin Pages | `/api/admin/pages` | 6 | Page management |
| Admin SEO | `/api/admin/seo` | 8 | SEO analytics |
| Admin AI | `/api/admin` | 4 | AI generation |

---

## 1. BigMind Agent Routes

Control the multi-agent AI system with job queues and health monitoring.

### Agent Status & Control

#### GET /api/agents/status
Get overall agent system status including Redis connection and queue statistics.

**Response:**
```json
{
  "core": { "initialized": true, "redis": true },
  "queues": {
    "co": { "waiting": 0, "active": 0, "completed": 5 },
    "enrichment": { "waiting": 0, "active": 0, "completed": 3 },
    "devops": { "waiting": 0, "active": 0, "completed": 10 }
  },
  "timestamp": "2024-12-17T10:00:00Z"
}
```

### CO Agent (Content Optimization)

#### POST /api/agents/co/scan
Manually trigger daily content optimization scan. Analyzes SEO, content quality, and links.

**Response:**
```json
{
  "success": true,
  "jobId": "job-123",
  "message": "CO scan queued successfully"
}
```

#### GET /api/agents/co/suggestions
Get latest CO Agent suggestions for page improvements.

**Response:**
```json
{
  "total": 45,
  "highPriority": 12,
  "suggestions": [
    {
      "pageId": "uuid",
      "pagePath": "/science/water",
      "pageTitle": "Water Science",
      "priority": "high",
      "issues": [{ "type": "seo", "severity": "high", "description": "SEO title too short" }],
      "estimatedImpact": "+25% potential",
      "quickWin": true
    }
  ]
}
```

### Enrichment Agent

#### POST /api/agents/enrichment/generate
Generate enrichment package for a specific page.

**Request:** `{ "pageId": "uuid" }`

**Response:**
```json
{
  "success": true,
  "jobId": "job-456",
  "message": "Enrichment generation queued"
}
```

#### GET /api/agents/enrichment/:pageId
Get enrichment for a page directly (synchronous).

**Response:**
```json
{
  "pageId": "uuid",
  "pagePath": "/science/minerals",
  "seo": { "title": "Generated SEO Title", "description": "Generated description" },
  "internalLinks": [{ "anchor": "Water Science", "targetPath": "/science/water" }],
  "contentSuggestions": [{ "type": "expand_content", "description": "Add more detail" }],
  "visualConfig": { "vibeKeywords": ["crystalline"], "emotionalTone": ["scientific"] },
  "status": "ready"
}
```

#### POST /api/agents/enrichment/:enrichmentId/apply
Apply an enrichment package to its target page.

**Response:** `{ "success": true, "message": "Enrichment applied", "updates": { "seoTitle": "..." } }`

#### POST /api/agents/enrichment/:enrichmentId/reject
Reject an enrichment package.

**Response:** `{ "success": true, "message": "Enrichment rejected" }`

### DevOps Agent

#### GET /api/agents/devops/health
Get current system health report.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-17T10:00:00Z",
  "metrics": {
    "uptime": 86400,
    "memory": { "total": 16000000000, "used": 8000000000, "free": 8000000000, "percentUsed": 50 },
    "cpu": { "loadAvg": [0.5, 0.4, 0.3], "cores": 8 },
    "process": { "uptime": 3600, "memory": { "heapUsed": 50000000, "heapTotal": 100000000 } }
  },
  "alerts": [],
  "recommendations": []
}
```

#### POST /api/agents/devops/check
Manually trigger health check.

**Response:** `{ "success": true, "jobId": "job-789", "message": "Health check queued" }`

### Job Monitoring

#### GET /api/agents/jobs/:jobId
Get status of a specific job.

**Response:**
```json
{
  "id": "job-123",
  "name": "manual-scan",
  "data": { "trigger": "manual" },
  "state": "completed",
  "returnvalue": { "totalPages": 100 },
  "progress": 100,
  "timestamp": 1702800000000,
  "processedOn": 1702800001000,
  "finishedOn": 1702800010000
}
```

---

## 2. AI Chat Routes

Natural language interface to the CMS via orchestrator agent.

#### POST /api/ai/chat
Send a message to the AI orchestrator.

**Request:**
```json
{
  "message": "Create a new page about water science",
  "conversationId": "uuid" // optional
}
```

**Response:**
```json
{
  "ok": true,
  "conversationId": "uuid",
  "response": "I've created a new page about water science at /science/water",
  "result": { "action": "create_page", "pageId": "uuid" }
}
```

#### GET /api/ai/chat/conversations
List all chat conversations.

**Response:** `{ "ok": true, "conversations": [{ "id": "uuid", "messages": [], "createdAt": "..." }] }`

#### GET /api/ai/chat/conversations/:id
Get a specific conversation with all messages.

#### DELETE /api/ai/chat/conversations/:id
Delete a conversation.

---

## 3. AI Pages Routes

AI-powered page management with generation and optimization.

#### GET /api/ai/pages
List all AI pages.

**Query params:** `?status=ai_draft|review|published&limit=50`

**Response:**
```json
{
  "ok": true,
  "pages": [{ "id": "uuid", "title": "Page Title", "slug": "page-title", "status": "published" }],
  "total": 100
}
```

#### GET /api/ai/pages/:id
Get a single page by ID.

#### POST /api/ai/pages
Create a new page.

**Request:**
```json
{
  "title": "New Page",
  "slug": "new-page",
  "content": "<p>Content</p>",
  "status": "ai_draft",
  "seoTitle": "SEO Title",
  "seoDescription": "SEO description"
}
```

#### PATCH /api/ai/pages/:id
Update a page.

#### DELETE /api/ai/pages/:id
Delete a page.

#### POST /api/ai/pages/:id/publish
Publish a page.

**Response:** `{ "ok": true, "page": { ... } }`

#### POST /api/ai/pages/:id/optimize
Optimize page SEO using SEO Agent.

**Response:** `{ "ok": true, "result": { "seoScore": 85, "improvements": [...] } }`

#### POST /api/ai/pages/generate
Generate a page with AI.

**Request:**
```json
{
  "topic": "Water Science Introduction",
  "intent": "educational",
  "targetAudience": "health-conscious adults"
}
```

---

## 4. AI SEO Routes

SEO analysis, scoring, and optimization.

#### GET /api/ai/seo/stats
Get comprehensive SEO statistics.

**Response:**
```json
{
  "ok": true,
  "stats": {
    "totalPages": 100,
    "avgScore": 72,
    "excellent": 25,
    "good": 50,
    "needsWork": 25
  }
}
```

#### GET /api/ai/seo/scores
Get all pages with their SEO scores.

#### GET /api/ai/seo/low-performers
Get pages with low SEO scores.

**Query:** `?threshold=60`

#### GET /api/ai/seo/pages/:id/score
Calculate SEO score for a specific page.

#### POST /api/ai/seo/pages/:id/optimize
Optimize SEO for a specific page.

**Request:** `{ "aspects": ["title", "description", "headings"] }`

#### GET /api/ai/seo/pages/:id/issues
Find SEO issues for a page.

#### POST /api/ai/seo/bulk-optimize
Optimize multiple pages at once.

**Request:** `{ "pageIds": ["uuid1", "uuid2"], "threshold": 60 }`

#### POST /api/ai/seo/keywords
Suggest keywords for a topic.

**Request:** `{ "topic": "water science", "count": 10 }`

---

## 5. AI Knowledge Base Routes

Document ingestion and RAG (Retrieval-Augmented Generation).

#### GET /api/ai/knowledge
List all knowledge items.

**Query:** `?limit=50`

**Response:**
```json
{
  "ok": true,
  "items": [{ "id": "uuid", "type": "document", "title": "Title", "source": "manual" }],
  "count": 50
}
```

#### POST /api/ai/knowledge/search
Search the knowledge base.

**Request:** `{ "query": "water science", "limit": 5 }`

**Response:**
```json
{
  "ok": true,
  "results": [{ "id": "uuid", "title": "Title", "content": "...", "score": 0.95 }],
  "count": 5
}
```

#### POST /api/ai/knowledge/ingest
Ingest a new document.

**Request:**
```json
{
  "title": "Document Title",
  "content": "Full document content...",
  "source": "manual",
  "type": "document",
  "metadata": { "author": "Name" }
}
```

#### POST /api/ai/knowledge/ingest-pages
Ingest all published pages into knowledge base.

**Response:** `{ "ok": true, "ingested": 100, "message": "Ingested 100 pages" }`

#### DELETE /api/ai/knowledge/:id
Delete a knowledge item.

---

## 6. AI Agents Registry Routes

Agent status and tool registry.

#### GET /api/ai/agents
List all registered agents.

**Response:**
```json
{
  "ok": true,
  "agents": [
    { "id": "orchestrator", "name": "Orchestrator", "type": "coordinator", "capabilities": ["routing"] },
    { "id": "content", "name": "Content Agent", "type": "content", "capabilities": ["create_page"] },
    { "id": "seo", "name": "SEO Agent", "type": "seo", "capabilities": ["optimize"] },
    { "id": "devops", "name": "DevOps Agent", "type": "devops", "capabilities": ["health_check"] }
  ]
}
```

#### GET /api/ai/agents/:name
Get specific agent details with tools.

#### GET /api/ai/agents/system/health
Get system health via DevOps agent.

#### GET /api/ai/agents/registry/tools
List all available tools across agents.

---

## 7. Public Page Routes

Public access to pages without authentication.

#### GET /api/pages
List all pages.

**Query:** `?clusterKey=water_science&parentKey=parent&tree=true`

#### GET /api/pages/by-path/*
Get page by URL path. Example: `GET /api/pages/by-path/science/water`

#### GET /api/pages/by-key/:key
Get page by unique key.

#### GET /api/pages/:key/breadcrumbs
Get breadcrumb navigation for a page.

#### GET /api/pages/:key/children
Get child pages.

#### GET /api/navigation
Get site navigation structure.

---

## 8. Public Product Routes

#### GET /api/products
List all products.

#### GET /api/products/:slug
Get product by slug.

---

## 9. Admin Authentication

#### POST /api/admin/login
Login to admin.

**Request:** `{ "username": "admin", "password": "password" }`

**Response:** `{ "success": true, "token": "jwt-token", "user": { "id": "uuid", "username": "admin" } }`

#### POST /api/admin/logout
Logout.

#### GET /api/admin/me
Get current admin user (requires Bearer token).

#### GET /api/admin/stats
Get content statistics.

---

## 10. Admin Page Routes

Requires authentication via JWT Bearer token.

#### POST /api/admin/pages
Create a page.

#### POST /api/admin/pages/bulk
Bulk create pages.

**Request:** `{ "pages": [{ "title": "...", "path": "..." }] }`

#### PUT /api/admin/pages/:id
Update a page.

#### DELETE /api/admin/pages/:id
Delete a page.

#### POST /api/admin/pages/:id/enrich
Enrich page with AI (generate SEO, links, visual config).

**Request:** `{ "steps": { "imagePrompts": true, "suggestedSeo": true, "visualConfig": true } }`

#### POST /api/admin/pages/:id/integrate
Integrate TSX code into the application.

---

## 11. Admin AI Generation

#### POST /api/admin/ai-startup
Generate a page from a brief.

**Request:**
```json
{
  "brief": "Create a page about the science of structured water",
  "pageSlug": "structured-water"
}
```

**Response:**
```json
{
  "success": true,
  "layoutsDetected": ["hero_centered", "feature_cards"],
  "seo": { "title": "...", "description": "..." },
  "tsx": "// React component code",
  "html": "<div>...</div>"
}
```

#### POST /api/admin/generate-image
Generate an image with AI.

**Request:** `{ "prompt": "Crystalline water structure with blue glow" }`

**Response:** `{ "success": true, "publicUrl": "/uploads/image.png", "filePath": "..." }`

#### POST /api/admin/regenerate-image
Regenerate an image with new prompt.

**Request:** `{ "prompt": "...", "oldFilePath": "/uploads/old.png" }`

---

## 12. Admin SEO Analytics (Google Search Console)

#### GET /api/admin/seo/status
Check if GSC is configured.

#### GET /api/admin/seo/sites
List connected GSC sites.

#### GET /api/admin/seo/summary
Get SEO summary stats.

**Query:** `?days=28`

#### GET /api/admin/seo/queries
Get top search queries.

**Query:** `?days=28&limit=50`

#### GET /api/admin/seo/pages
Get top performing pages.

#### GET /api/admin/seo/performance
Get performance by date.

#### POST /api/admin/seo/inspect
Inspect a URL in GSC.

**Request:** `{ "url": "https://example.com/page", "siteUrl": "https://example.com" }`

---

## 13. Knowledge Learning Routes

Automated knowledge extraction from conversations.

#### POST /api/knowledge/save-conversation
Save a conversation for learning.

**Request:** `{ "sessionId": "uuid", "messages": [...] }`

#### GET /api/knowledge/stats
Get learning statistics.

#### POST /api/knowledge/process-recent
Process recent conversations for knowledge extraction.

**Query:** `?limit=10`

#### POST /api/knowledge/setup-database
Initialize knowledge learning tables.

---

## Authentication

Most admin routes require authentication via JWT:

```bash
# Login to get token
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}'

# Use token in subsequent requests
curl http://localhost:3000/api/admin/pages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "ok": false,
  "error": "Error message"
}
// or
{
  "error": "Error message"
}
```

**Common HTTP status codes:**
- `200` - Success
- `201` - Created
- `400` - Bad request (validation error)
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

---

## Summary

This API provides:
- **Natural Language Interface** via `/api/ai/chat`
- **Multi-Agent System** via `/api/agents`
- **AI Content Generation** via `/api/admin/ai-startup`
- **SEO Optimization** via `/api/ai/seo`
- **Knowledge Base (RAG)** via `/api/ai/knowledge`
- **Full CRUD** for pages, products, clusters
- **Health Monitoring** via DevOps agent
