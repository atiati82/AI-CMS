#!/bin/bash
echo "=== Step 1: Login ===" 
LOGIN_RESP=$(curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')
echo "$LOGIN_RESP" | head -c 200

TOKEN=$(echo "$LOGIN_RESP" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "Token: ${TOKEN:0:30}..."

echo ""
echo "=== Step 2: BigMind Chat ===" 
CHAT_RESP=$(curl -s -X POST "http://localhost:3000/api/admin/bigmind/chat" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello, recommend me a page"}]}')

echo "$CHAT_RESP" | head -c 1000

echo ""
echo ""
if echo "$CHAT_RESP" | grep -q "local knowledge base\|knowledge base"; then
  echo "⚠️ STILL USING FALLBACK"
  echo ""
  echo "=== Step 3: Check logs ===" 
  grep -E "(BigMind|Failed|error)" /tmp/server.log 2>/dev/null | tail -10
else
  echo "✅ Using external AI"
fi
