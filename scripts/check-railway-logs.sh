#!/bin/bash
# =============================================================================
# Railway Logs Checker
# =============================================================================
# Fetches and analyzes Railway deployment logs for errors
# =============================================================================

RAILWAY_CLI="$HOME/.local/bin/railway"
PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms/andara-ionic-cms"

cd "$PROJECT_DIR"

echo "📋 Fetching Railway logs..."
echo ""

if [ -f "$RAILWAY_CLI" ]; then
    # Get recent logs
    $RAILWAY_CLI logs --limit 100
    
    echo ""
    echo "🔍 Checking for errors..."
    
    # Check for common error patterns
    if $RAILWAY_CLI logs --limit 100 | grep -i "error\|failed\|exception" > /dev/null; then
        echo "⚠️  Errors detected in logs"
        exit 1
    else
        echo "✅ No errors found"
        exit 0
    fi
else
    echo "❌ Railway CLI not found at $RAILWAY_CLI"
    exit 1
fi
