# Lesson: Page Edit Popup Enhancement Patterns

## Summary
This lesson documents the patterns used to build a comprehensive page editing popup in the BigMind chat component, including AI-generated suggestions, editable fields, and seamless navigation to the admin editor.

## Key Patterns Implemented

### 1. Context-Aware AI Suggestions
Generate suggestions based on page content type detection:

```typescript
// Detect topic from title/path for context-aware suggestions
const topic = title.toLowerCase();
const isScience = topic.includes('science') || topic.includes('water') || path.includes('/science');
const isBioelectric = topic.includes('bioelectric') || topic.includes('charge') || topic.includes('voltage');

// Generate context-specific suggestions
if (isBioelectric) {
    suggestions.summary = `Explore the fascinating science of bioelectric water...`;
    suggestions.motionPreset = 'electric-pulse-flow';
} else if (isScience) {
    suggestions.summary = `Discover the scientific principles behind ${title}...`;
}
```

### 2. Dynamic Image Prompts with Add/Remove
Allow unlimited image prompts with custom labels:

```tsx
// State structure in visualConfig
imagePrompts: [
    { label: 'Hero Image', prompt: 'Description...' },
    { label: 'Section 1', prompt: 'Description...' },
]

// Add new image
const images = [...(vc.imagePrompts || [])];
images.push({ label: `Image ${images.length + 1}`, prompt: '' });

// Remove image (keep first one)
{idx > 0 && (
    <button onClick={() => {
        images.splice(idx, 1);
        setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, imagePrompts: images } } }));
    }}>✕</button>
)}
```

### 3. Queue-Based Video Generation
Store prompts with queue status for later processing:

```typescript
await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({ 
        visualConfig: { 
            ...vc, 
            videoGenerationQueued: true, 
            videoGenerationQueuedAt: new Date().toISOString() 
        } 
    }),
});
toast({ title: "🎬 Video Queued!", description: "Video generation has been queued." });
```

### 4. URL Parameter Handling for Cross-Component Navigation
Enable navigation from BigMind popup to admin editor with auto-open:

```typescript
// In admin.tsx - Handle URL params
useEffect(() => {
    if (!isAuthenticated || pageTree.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const editParam = params.get('edit');

    if (tabParam) setActiveTab(tabParam);

    if (editParam && tabParam === 'pages') {
        const findPageById = (pages: Page[], id: string): Page | null => {
            for (const page of pages) {
                if (page.id === id) return page;
                if (page.children?.length) {
                    const found = findPageById(page.children, id);
                    if (found) return found;
                }
            }
            return null;
        };

        const pageToEdit = findPageById(pageTree, editParam);
        if (pageToEdit) {
            setSelectedPage(pageToEdit);
            setIsPageEditorOpen(true);
            // Clear URL to prevent re-opening on refresh
            window.history.replaceState({}, '', '/admin?tab=pages');
        }
    }
}, [isAuthenticated, pageTree]);
```

### 5. Motion Preview with Inline Animations
Show motion effects with built-in Tailwind animations:

```tsx
<div className="grid grid-cols-4 gap-3">
    <div className="text-center">
        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded animate-pulse" />
        <span className="text-[9px] text-zinc-500">fadeIn</span>
    </div>
    <div className="text-center">
        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded animate-bounce" />
        <span className="text-[9px] text-zinc-500">fadeUp</span>
    </div>
    <div className="text-center">
        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded transition-transform hover:scale-110 hover:-translate-y-1 cursor-pointer" />
        <span className="text-[9px] text-zinc-500">hover.lift</span>
    </div>
</div>
```

### 6. Editable Fields with Suggestion Fallback
Show suggestions as placeholders, allow direct editing:

```tsx
<input
    type="text"
    value={pageEditPopup.pageData.visualConfig?.motionPreset || ''}
    onChange={(e) => {
        const vc = pageEditPopup.pageData.visualConfig || {};
        setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, motionPreset: e.target.value } } }));
    }}
    placeholder={pageEditPopup.suggestions.motionPreset || 'liquid-crystal-float'}
    className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm placeholder:text-cyan-400/50"
/>
{pageEditPopup.suggestions.motionPreset && !pageEditPopup.pageData.visualConfig?.motionPreset && (
    <button onClick={() => {
        setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, motionPreset: p.suggestions.motionPreset } } }));
    }} className="text-xs text-cyan-400">↑ Use suggestion</button>
)}
```

## Files Modified
- `client/src/components/bigmind-chat-modern.tsx` - Page edit popup with 6 tabs
- `client/src/pages/admin.tsx` - URL param handling for auto-open editor

## Tags
- page-editor
- ai-suggestions
- url-params
- bigmind
- motion-preview
- dynamic-fields
