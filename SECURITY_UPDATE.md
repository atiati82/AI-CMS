# Security Update Instructions

## Secure Secrets Generated

Your `.env` file needs to be updated with secure random secrets. Here are the generated values:

### SESSION_SECRET
```
bTglpo7_LSMLtjhcYJ_zwS92wPHOq4k0W5rFL7EqPuai01PohHR6hd_BQYyBA2hUP6B55x9ih1UOoqyYBkYj3A
```

### JWT_SECRET
```
TMDNTJ4TprdD9EQAdf3rjwLcR5aLq_TSu44tikIILT6nMGnfPUmWZYUzsW0RysqCK21atnB5XvgQZGmk8m-SgQ
```

## How to Update

1. Open your `.env` file (it's gitignored for security)
2. Replace the `SESSION_SECRET` value with the one above
3. Add a new line with `JWT_SECRET` and the value above

Your `.env` file should look like this:

```bash
# Database Configuration
DATABASE_URL=postgresql://localhost:5432/andara_cms

# Server Port
PORT=3000

# Session Secret - IMPORTANT: Keep this secret and never commit to git
SESSION_SECRET=bTglpo7_LSMLtjhcYJ_zwS92wPHOq4k0W5rFL7EqPuai01PohHR6hd_BQYyBA2hUP6B55x9ih1UOoqqyYBkYj3A

# JWT Secret - IMPORTANT: Keep this secret and never commit to git
JWT_SECRET=TMDNTJ4TprdD9EQAdf3rjwLcR5aLq_TSu44tikIILT6nMGnfPUmWZYUzsW0RysqCK21atnB5XvgQZGmk8m-SgQ

# AI API Keys (optional - required for AI features)
GOOGLE_API_KEY=
OPENAI_API_KEY=

# Stripe (optional - required for ecommerce features)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## To Generate New Secrets

If you need to generate new secrets in the future, run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64url'))"
```

**IMPORTANT**: Never commit your `.env` file to git. It's already in `.gitignore`.
