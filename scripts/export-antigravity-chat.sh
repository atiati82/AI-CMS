#!/bin/bash

# Export AntiGravity Conversation to RAG
# This script helps you export the current conversation and ingest it into RAG

echo "🔮 AntiGravity Conversation Export Helper"
echo "=========================================="
echo ""

# Check if conversation file is provided
if [ -z "$1" ]; then
    echo "📝 How to export this conversation:"
    echo ""
    echo "1. In AntiGravity, use the conversation export feature"
    echo "   (or copy the conversation history)"
    echo ""
    echo "2. Save it as a JSON file with this format:"
    echo ""
    cat << 'EOF'
[
  {
    "role": "user",
    "content": "your message",
    "timestamp": "2025-12-17T10:00:00Z"
  },
  {
    "role": "assistant",
    "content": "my response",
    "timestamp": "2025-12-17T10:00:05Z"
  }
]
EOF
    echo ""
    echo "3. Then run this script with the file:"
    echo "   ./scripts/export-antigravity-chat.sh conversation.json"
    echo ""
    echo "Or use the ingestion script directly:"
    echo "   npx tsx scripts/ingest-chat-export.ts conversation.json"
    echo ""
    exit 0
fi

CHAT_FILE="$1"

if [ ! -f "$CHAT_FILE" ]; then
    echo "❌ File not found: $CHAT_FILE"
    exit 1
fi

echo "📥 Ingesting conversation from: $CHAT_FILE"
echo ""

# Run the ingestion script
npx tsx scripts/ingest-chat-export.ts "$CHAT_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Conversation successfully ingested into RAG!"
    echo ""
    echo "🔍 Try querying it:"
    echo "   npx tsx scripts/query-chat-history.ts \"What did we discuss?\""
    echo ""
    echo "Or use interactive mode:"
    echo "   npx tsx scripts/query-chat-history.ts --interactive"
else
    echo ""
    echo "❌ Ingestion failed. Check the error above."
    exit 1
fi
