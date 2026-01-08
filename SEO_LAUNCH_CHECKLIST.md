# SEO Launch Checklist

## Current Status: 🔒 BLOCKED FROM SEARCH ENGINES

The site is currently protected from search engine indexing.

### Active Protections:
1. ✅ `<meta name="robots" content="noindex, nofollow">` in `client/index.html`
2. ✅ `<meta name="googlebot" content="noindex, nofollow">` in `client/index.html`
3. ✅ `robots.txt` with `Disallow: /`

## When Ready to Launch

### Step 1: Remove Meta Tags
Edit `client/index.html` and **remove** these lines:
```html
<!-- SEO: Prevent indexing until launch -->
<meta name="robots" content="noindex, nofollow" />
<meta name="googlebot" content="noindex, nofollow" />
```

### Step 2: Update robots.txt
Replace `client/public/robots.txt` with:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Step 3: Verify
1. Check live site source code - no `noindex` meta tags
2. Visit `https://yourdomain.com/robots.txt` - should show `Allow: /`
3. Submit sitemap to Google Search Console

### Step 4: Submit to Search Engines
- **Google**: https://search.google.com/search-console
- **Bing**: https://www.bing.com/webmasters

## Testing Before Launch

To verify protections are working:
1. View page source on live site
2. Look for `<meta name="robots" content="noindex, nofollow">`
3. Visit `/robots.txt` - should show `Disallow: /`

## Notes
- These protections are active on **all environments** (local, Railway)
- Search engines respect these tags within 24-48 hours
- Already-indexed pages will be removed gradually after enabling protections
