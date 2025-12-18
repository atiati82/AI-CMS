#!/bin/bash

# ==============================================================================
# MASTER INGEST: INDEX EVERYTHING
# ==============================================================================

# Exit on error
set -e

echo "🚀 STARTING MASTER INGEST: Indexing Everything..."
echo "Timestamp: $(date)"

# 1. Baseline Report
# ------------------------------------------------------------------------------
echo -e "\n📊 Generating Baseline Report..."
# Reports are in server/scripts usually, checking both
if [ -f "server/scripts/knowledge-report.ts" ]; then
    npx tsx -r dotenv/config server/scripts/knowledge-report.ts
else
    npx tsx -r dotenv/config scripts/knowledge-report.ts
fi

# 2. System Knowledge (Docs, Architecture)
# ------------------------------------------------------------------------------
echo -e "\n🧠 Ingesting System Knowledge..."
npx tsx -r dotenv/config scripts/ingest-system-knowledge.ts

# 3. Design Knowledge (Tokens, Colors)
# ------------------------------------------------------------------------------
echo -e "\n🎨 Ingesting Design Knowledge..."
npx tsx -r dotenv/config scripts/ingest-design-knowledge.ts

# 4. API Docs (Routes, Endpoints)
# ------------------------------------------------------------------------------
echo -e "\n🔌 Ingesting API Documentation..."
npx tsx -r dotenv/config scripts/ingest-api-docs.ts

# 5. AI Knowledge (Agents, Tools)
# ------------------------------------------------------------------------------
echo -e "\n🤖 Ingesting AI Knowledge..."
npx tsx -r dotenv/config scripts/ingest-ai-knowledge.ts

# 6. CMS Content (Pages/Hubs)
# ------------------------------------------------------------------------------
echo -e "\n📄 Ingesting CMS Content (Hub Pages)..."
npx tsx -r dotenv/config scripts/ingest-hub-pages-rag.ts

# 7. Learning Reports (System Summaries & Lessons)
# ------------------------------------------------------------------------------
echo -e "\n📚 Ingesting Learning Reports..."
npx tsx -r dotenv/config scripts/ingest-learning-reports.ts

# 8. Chat History (Actual Dialogue Exports)
# ------------------------------------------------------------------------------
echo -e "\n💬 Ingesting Chat History..."

CHAT_FILES=(
    "chat_history_export.txt"
    "sample-chat.json"
)

for file in "${CHAT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Determine format based on extension
        if [[ "$file" == *.json ]]; then
            npx tsx -r dotenv/config scripts/ingest-chat-export.ts "$file" --format json
        elif [[ "$file" == *.md ]]; then
            npx tsx -r dotenv/config scripts/ingest-chat-export.ts "$file" --format markdown
        else
            npx tsx -r dotenv/config scripts/ingest-chat-export.ts "$file" --format text
        fi
    else
        echo "⚠️  File not found: $file (Skipping)"
    fi
done

# 9. Final Report
# ------------------------------------------------------------------------------
echo -e "\n📊 Generating Final Report..."
if [ -f "server/scripts/knowledge-report.ts" ]; then
    npx tsx -r dotenv/config server/scripts/knowledge-report.ts
else
    npx tsx -r dotenv/config scripts/knowledge-report.ts
fi

echo -e "\n✅ MASTER INGEST COMPLETE!"
echo "Report available at: KNOWLEDGE_BASE_REPORT.md"
