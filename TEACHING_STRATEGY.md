# AI Teaching Strategy: Knowledge & Evolution

## 1. Core Concept
The AI system in specific "Agentic Mode" is not just a tool but a **learning partner**. It evolves by ingesting:
1.  **Explicit Knowledge**: Documentation, specifications, and reports.
2.  **Implicit Knowledge**: Chat history, debugging sessions, and successful patterns.
3.  **Structural Knowledge**: Codebase architecture, database schema, and design systems.

## 2. Learning Structure

### A. The "Memory Bank"
We organize knowledge into **Zones** to prevent hallucination and ensure context relevance:
- **Science Zone (Internal)**: System architecture, dev logs, debugging reports (`AI_LEARNING_SESSION_*.md`).
- **Product Zone (Public)**: Design system, page specs, content (`ANDARA_DESIGN_SYSTEM.md`, Hub Pages).
- **Brand Zone (Voice)**: Copywriting guidelines, tone of voice.

### B. The Lesson Unit (`rag_memory_object`)
Every major debugging session or architectural decision should be crystallized into a "Lesson":
- **Trigger**: "When I see Error X..."
- **Action**: "Checks Y and Z..."
- **Prevention**: "Always ensure A is configured."

## 3. The Teaching Workflow

### Step 1: Just-in-Time Teaching
Develop normally. When you hit a complex problem and solve it, **don't just close the chat**.
- Tell the AI: "This was a key learning. Let's document it."
- The AI (or you) creates a summary markdown file (e.g., `AI_LEARNING_SESSION_YYYY-MM-DD.md`).

### Step 2: The "Save" Command
run the ingestion script (or use an Agent command):
```bash
npx tsx scripts/ingest-learning-reports.ts
```
This indexes the new knowledge immediately.

### Step 3: Retrieval Verification
Ask the AI: "How do we handle [problem]?" to ensure it retrieves the new lesson.

## 4. Automation & Maintenance

### Daily/Weekly Ingestion
The `master-ingest.sh` script is the heartbeat.
- **Run it**: After major feature merges.
- **Effect**: Re-indexes changed docs, adds new pages, and absorbs new learning reports.

### Chat Exports
Periodically export valuable chat sessions (where architectural decisions were discussed) to `chat-exports/` and run the ingestion.

## 5. Next Steps
- **Active Learning**: In the next session, we will try to "teach" the AI a new pattern and verify it can recall it.
- **Refinement**: We will refine the `rag_memory_object` schema to capture more structured data from chats.
