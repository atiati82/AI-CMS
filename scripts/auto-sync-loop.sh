#!/bin/bash
# =============================================================================
# Auto-Sync Loop Script for Andara Ionic CMS
# =============================================================================
# Runs syncs every 30 minutes:
#   - Commits all changes to Git
#   - Pushes to GitHub (triggers Railway auto-deploy)
#   - Updates the AI Consistency Gate
# =============================================================================

set -e

# Configuration
PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms/andara-ionic-cms"
SCRIPT_DIR="$PROJECT_DIR/scripts"
SYNC_INTERVAL=1800  # 30 minutes in seconds
LOG_FILE="$SCRIPT_DIR/auto-sync.log"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "[$timestamp] $1"
    echo "[$timestamp] $1" >> "$LOG_FILE"
}

update_consistency_gate() {
    local gate_file="$PROJECT_DIR/AI_CONSISTENCY_GATE.md"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local last_commit=$(git -C "$PROJECT_DIR" log -1 --pretty=format:'%h - %s' 2>/dev/null || echo "No commits")
    
    cat > "$gate_file" << EOF
# AI Consistency Gate
> Last Updated: $timestamp

## Active Development Focus
This is a living document that both Antigravity and GitHub Copilot reference for code consistency.

### Current State
- **Last Commit**: $last_commit
- **Branch**: $(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "main")
- **Sync Interval**: Every 30 minutes

### Architectural Standards
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Andara Design System (Glassmorphism, Liquid Alchemy)
- **Backend**: Node.js + Express + Drizzle ORM + PostgreSQL
- **AI**: BigMind CMS with Gemini integration

### Key Design Tokens
- Primary Gradient: \`from-cyan-500 to-blue-600\`
- Glass Effect: \`glass-card\` class with backdrop-blur
- Motion: Framer Motion with Liquid-Crystal Float archetype

### For GitHub Copilot
When generating code for this project:
1. Use TypeScript strict mode
2. Follow functional component patterns with hooks
3. Apply Andara Design System classes for styling
4. Use the existing motion presets from \`client/src/lib/motion-presets.ts\`

### Deployment
- **Platform**: Railway.com
- **Auto-Deploy**: Triggered on GitHub push to main
EOF

    log "${GREEN}✓${NC} Updated AI Consistency Gate"
}

sync_to_github() {
    cd "$PROJECT_DIR"
    
    # Check for changes
    if [ -z "$(git status --porcelain)" ]; then
        log "${BLUE}ℹ${NC} No changes to sync"
        return 0
    fi
    
    # Stage all changes
    git add -A
    
    # Create commit
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    git commit -m "🔄 Auto-sync: $timestamp" -m "Automated sync by Andara CMS"
    
    # Push to GitHub
    if git push origin main 2>/dev/null; then
        log "${GREEN}✓${NC} Pushed to GitHub (Railway auto-deploy triggered)"
    else
        log "${YELLOW}⚠${NC} Push failed - may need manual intervention"
    fi
}

run_sync_cycle() {
    log "=========================================="
    log "Starting sync cycle..."
    log "=========================================="
    
    update_consistency_gate
    sync_to_github
    
    log "Sync complete. Next sync in 30 minutes."
    log ""
}

# Main loop
main() {
    log ""
    log "🚀 Starting Auto-Sync Loop"
    log "   Interval: Every $((SYNC_INTERVAL / 60)) minutes"
    log ""
    
    while true; do
        run_sync_cycle
        sleep $SYNC_INTERVAL
    done
}

# Allow single run mode
if [ "$1" = "--once" ]; then
    run_sync_cycle
else
    main
fi
