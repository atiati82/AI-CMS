#!/bin/bash
# =============================================================================
# Railway MCP Test Script
# =============================================================================
# Tests the Railway MCP server connection and displays available capabilities
# =============================================================================

echo "🚂 Testing Railway MCP Server..."
echo ""

# Check if Railway token is set
if [ -z "$RAILWAY_TOKEN" ]; then
    echo "❌ RAILWAY_TOKEN not set"
    echo "   Please add it to your .env file or export it:"
    echo "   export RAILWAY_TOKEN=your_token_here"
    exit 1
fi

echo "✅ Railway token found"
echo ""

# Test MCP server
echo "Testing MCP server connection..."
npx -y @railway/mcp-server --help

echo ""
echo "📋 Next steps:"
echo "1. Get your Railway API token from https://railway.app/account/tokens"
echo "2. Add it to .env: RAILWAY_TOKEN=your_token"
echo "3. Configure your MCP client with the config in .mcp/railway-mcp-config.json"
echo ""
echo "See .mcp/RAILWAY_MCP_SETUP.md for full documentation"
