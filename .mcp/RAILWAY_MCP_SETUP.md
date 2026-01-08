# Railway MCP Server Setup

## What is Railway MCP?

The Railway MCP (Model Context Protocol) server allows AI assistants to directly interact with your Railway deployments through a standardized interface.

## Installation

The Railway MCP server has been installed globally:
```bash
npm install -g @railway/mcp-server
```

## Configuration

### 1. Get Your Railway API Token

1. Go to https://railway.app/account/tokens
2. Create a new token
3. Copy the token value

### 2. Add Token to Environment

Add to your `.env` file:
```bash
RAILWAY_TOKEN=your_railway_token_here
```

### 3. Configure MCP in Your IDE

For Claude Desktop or compatible MCP clients, add this to your MCP settings:

```json
{
  "mcpServers": {
    "railway": {
      "command": "npx",
      "args": ["-y", "@railway/mcp-server"],
      "env": {
        "RAILWAY_TOKEN": "your_railway_token_here"
      }
    }
  }
}
```

## Available Capabilities

Once configured, the AI can:

- **View Deployments**: Check deployment status, logs, and metrics
- **Manage Services**: Start, stop, restart services
- **View Variables**: List environment variables
- **Check Logs**: Fetch recent deployment logs
- **Monitor Health**: Get real-time deployment health status

## Usage Example

After setup, you can ask:
- "What's the status of my Railway deployment?"
- "Show me the latest Railway logs"
- "Restart my Railway service"
- "What environment variables are set?"

## Project Configuration

Your Railway project details:
- **Project ID**: `bafe8f50-d530-4951-a1b8-fac23a482d03`
- **Region**: Auto-detected
- **Linked**: Via GitHub auto-deploy

## Troubleshooting

If MCP connection fails:
1. Verify `RAILWAY_TOKEN` is set correctly
2. Check that `@railway/mcp-server` is installed
3. Restart your MCP client
4. Check Railway API status at https://status.railway.app
