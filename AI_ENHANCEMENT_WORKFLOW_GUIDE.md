# AI Enhancement Workflow - Complete Guide

## Overview
The AI Enhancement Workflow allows you to:
1. **Generate** page content via AI chat
2. **Store** it in `aiStartupHtml`
3. **Enhance** it to extract motion specs, SEO, and visual config
4. **Display** enhancement tasks in the UI for review and application

## Architecture

### Backend Flow
```
User Message → /api/admin-chat → andara-chat.ts
                                      ↓
                            Generates HTML content
                                      ↓
                            Stored in aiStartupHtml
                                      ↓
                            enrichPageContent tool
                                      ↓
                            ai-enricher.ts extracts:
                            - Motion Specs
                            - Image Prompts
                            - Visual Config
                            - SEO suggestions
```

### Frontend Display
The UI (`admin.tsx` lines 10058-10166) shows:
- **AI Enhancement Tasks** section
- Checkboxes for each detected enhancement
- "Apply X Enhancements" button
- Visual Config display (vibe keywords, emotional tone)
- Image prompts with "Featured" and "Hero" buttons

## How to Use

### Step 1: Access AI Page Builder
1. Login to admin: http://localhost:5000/admin
   - Username: `admin`
   - Password: `password`
2. Navigate to **Pages** tab
3. Click "New Page" or edit existing page
4. Scroll to **AI Page Builder** section

### Step 2: Generate Content
In the AI chat input, try:
```
Create a hero section for "Crystalline Water Science" with:
- Headline about water structure
- 3 benefit cards
- Motion: scroll-fade-up for hero, hover-lift for cards
- Vibe: scientific, crystalline, pure
```

### Step 3: Enhancement Tasks Appear
The UI will automatically detect and display:
- ✅ SEO Title (if detected)
- ✅ Visual Config (vibe keywords, emotional tone)
- ✅ Motion Presets
- ✅ Image Prompts

### Step 4: Apply Enhancements
1. Review the detected tasks (they're auto-selected)
2. Uncheck any you don't want
3. Click "Apply X Enhancements"
4. The form fields update automatically

### Step 5: Save Page
Click "Save Changes" to persist the enhanced page

## API Endpoints

### Generate Content
```bash
POST /api/admin-chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Create a page about..." }
  ],
  "includeContext": true
}
```

### Enrich Page (BigMind Tool)
```bash
POST /api/admin/bigmind/chat
Authorization: Bearer <token>

{
  "messages": [
    { "role": "user", "content": "enrichPageContent with pageId: <id>" }
  ]
}
```

## Troubleshooting

### "Sorry, I encountered an error"
**Cause**: `/api/admin-chat` endpoint failed
**Fix**: Check server logs for AI provider errors

### Enhancement Tasks Not Showing
**Cause**: Content doesn't contain ANDARA VISUAL CONFIG format
**Fix**: Ask AI to include visual config in response

### Apply Button Does Nothing
**Cause**: No tasks selected
**Fix**: Check at least one enhancement task checkbox

## Testing Checklist
- [ ] Login to admin panel
- [ ] Open AI Page Builder
- [ ] Send a message requesting page content
- [ ] Verify AI response appears
- [ ] Check "AI Enhancement Tasks" section appears
- [ ] Verify tasks are detected and displayed
- [ ] Click "Apply Enhancements"
- [ ] Verify form fields update
- [ ] Save page successfully
