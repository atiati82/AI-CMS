# 🎓 Chat Learning System - Complete Guide

## What's Been Built

A complete AI-powered learning system that ingests chat conversations, extracts teaching moments, and provides a "wayback machine" to query all past conversations.

---

## ✅ Completed Components

### 1. **Chat Ingestion Script** (`scripts/ingest-chat-export.ts`)
- Parses JSON, text, and markdown chat formats
- Uses AI to extract teaching moments automatically
- Stores lessons in `rag_memory_objects` table
- Stores full conversations in `knowledge_base` table

### 2. **Wayback Query Script** (`scripts/query-chat-history.ts`)
- Search ALL past conversations with natural language questions
- AI-powered answers with sources and related lessons
- Interactive mode for continuous querying
- CLI mode for single questions

### 3. **API Endpoints** (`server/routes/ai/learning.ts`)
- `POST /api/ai/learning/upload-chat` - Upload chat files
- `GET /api/ai/learning/lessons` - Get all learned lessons
- `GET /api/ai/learning/stats` - Get learning statistics
- `POST /api/ai/learning/query` - Wayback query via API

### 4. **Sample Files**
- `sample-chat.json` - JSON format example
- `sample-chat.txt` - Text format example

---

## 🚀 How to Use

### **Option 1: CLI Ingestion (Recommended)**

Ingest a chat file:
```bash
# JSON format (auto-detected)
npx tsx scripts/ingest-chat-export.ts sample-chat.json

# Text format (explicit)
npx tsx scripts/ingest-chat-export.ts sample-chat.txt --format text

# Markdown format
npx tsx scripts/ingest-chat-export.ts my-chat.md --format markdown
```

### **Option 2: Wayback Query (Ask Questions)**

Single question:
```bash
npx tsx scripts/query-chat-history.ts "How did we fix the login error?"
```

Interactive mode:
```bash
npx tsx scripts/query-chat-history.ts --interactive
```

Example queries:
- "What are the user's UI preferences?"
- "Show me all database optimization lessons"
- "How did we handle authentication errors?"
- "What patterns led to successful outcomes?"

### **Option 3: API Upload**

```bash
curl -X POST http://localhost:3000/api/ai/learning/upload-chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@sample-chat.json" \
  -F "format=json"
```

### **Option 4: API Query**

```bash
curl -X POST http://localhost:3000/api/ai/learning/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"question": "How did we fix the login error?"}'
```

---

## 📊 What Gets Extracted

The AI automatically identifies and stores:

1. **Success Patterns**: Actions that led to no complaints (silence = success)
2. **Error/Fix Pairs**: Mistakes and how they were corrected
3. **User Preferences**: Communication styles, workflow preferences
4. **Communication Patterns**: How you like to interact and give feedback

Each lesson includes:
- Title and description
- Context where it applies
- Examples from the conversation
- Severity level (info/warning/error/critical)
- Tags for categorization

---

## 📁 Chat Export Formats

### JSON Format
```json
[
  {
    "role": "user",
    "content": "Fix the login error",
    "timestamp": "2025-12-17T10:00:00Z"
  },
  {
    "role": "assistant",
    "content": "I'll check the auth middleware...",
    "timestamp": "2025-12-17T10:00:05Z"
  }
]
```

### Text Format
```
[USER]: Fix the login error
[ASSISTANT]: I'll check the auth middleware...
[USER]: Great, that works now!
```

### Markdown Format
```markdown
**User**: Fix the login error

**Assistant**: I'll check the auth middleware...

**User**: Great, that works now!
```

---

## 🗄️ Database Tables Used

### `knowledge_base`
Stores full conversation text for RAG search
- Chunked for efficient retrieval
- Searchable by keywords
- Source tracking

### `rag_memory_objects`
Stores extracted lessons
- `lesson_id`: Unique identifier
- `title`: Lesson title
- `do_not_repeat_policy`: What NOT to do
- `tags`: Categorization
- `severity`: Importance level
- `trigger_count`: How many times referenced
- `examples`: Specific examples

---

## 🎯 Next Steps

### TODO: Admin UI Integration

The admin UI is **not yet built**. When you're ready, I can add:

1. **Learning Center Section** in AI Agents tab
   - File upload dropzone
   - Wayback query interface
   - Lessons table with filters
   - Statistics charts

2. **Features**:
   - Drag-and-drop chat file upload
   - Real-time query interface
   - Lesson management (view, delete, filter)
   - Learning statistics dashboard
   - Schedule automated learning

Would you like me to build the admin UI now?

---

## 🧪 Testing

Test the ingestion:
```bash
# Ingest sample file
npx tsx scripts/ingest-chat-export.ts sample-chat.json

# Query it
npx tsx scripts/query-chat-history.ts "What did we learn about login errors?"
```

Check the database:
```bash
# View lessons
psql $DATABASE_URL -c "SELECT title, severity, trigger_count FROM rag_memory_objects WHERE tags @> ARRAY['chat-learning'] LIMIT 10"

# View conversations
psql $DATABASE_URL -c "SELECT id, source FROM knowledge_base WHERE data_type = 'conversation' LIMIT 10"
```

---

## 💡 Tips

1. **Export your chats regularly** - The more data, the smarter the AI becomes
2. **Use descriptive filenames** - They become part of the conversation ID
3. **Query often** - The wayback system learns from usage
4. **Review lessons** - Check what the AI extracted to ensure quality
5. **Tag conversations** - Add metadata for better organization

---

## 🔧 Troubleshooting

**"No messages found"**: Check your file format matches the expected structure

**"AI extraction failed"**: The system falls back to simple pattern detection

**"Cannot find module"**: Make sure you're in the project root directory

**Database errors**: Ensure PostgreSQL is running and `DATABASE_URL` is set

---

## 📚 Architecture

```
Chat File → Parser → AI Analysis → Storage
                ↓
        Teaching Moments
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
knowledge_base      rag_memory_objects
(full text)         (lessons)
    ↓                       ↓
    └───────────┬───────────┘
                ↓
        Wayback Query
                ↓
        AI-Powered Answer
```

---

**Status**: Backend complete ✅ | Admin UI pending ⏳

Let me know if you want me to build the admin UI now!
