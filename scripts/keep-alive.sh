#!/bin/bash
# Keep-Alive Script for AI CMS Dev Server
# This script monitors the server and restarts it if it goes down

SERVER_URL="http://localhost:3000"
PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms"
LOG_FILE="$PROJECT_DIR/server.log"
CHECK_INTERVAL=30  # seconds

echo "🚀 AI CMS Keep-Alive Monitor Started"
echo "   Checking $SERVER_URL every $CHECK_INTERVAL seconds"
echo "   Log file: $LOG_FILE"
echo ""

restart_server() {
    echo "[$(date)] 🔄 Restarting server..."
    
    # Kill any existing process on port 3000
    lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null
    sleep 2
    
    # Start the server in background
    cd "$PROJECT_DIR"
    nohup npm run dev > "$LOG_FILE" 2>&1 &
    
    echo "[$(date)] ✅ Server restart initiated"
    sleep 5
}

check_server() {
    response=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/api/pages" --max-time 10)
    if [ "$response" = "200" ] || [ "$response" = "304" ]; then
        return 0  # Server is OK
    else
        return 1  # Server is down
    fi
}

# Main loop
while true; do
    if check_server; then
        echo "[$(date)] ✅ Server healthy"
    else
        echo "[$(date)] ❌ Server down! Response code: $response"
        restart_server
    fi
    sleep $CHECK_INTERVAL
done
