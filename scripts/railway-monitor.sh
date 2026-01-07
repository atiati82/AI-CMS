#!/bin/bash
# =============================================================================
# Railway Deployment Monitor & Auto-Healer
# =============================================================================
# Monitors Railway deployment status and automatically fixes common issues
# =============================================================================

set -e

PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms/andara-ionic-cms"
RAILWAY_CLI="$HOME/.local/bin/railway"
LOG_FILE="$PROJECT_DIR/scripts/railway-monitor.log"
CHECK_INTERVAL=300  # 5 minutes

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "[$timestamp] $1"
    echo "[$timestamp] $1" >> "$LOG_FILE"
}

check_railway_status() {
    cd "$PROJECT_DIR"
    
    # Check if Railway CLI is available
    if [ ! -f "$RAILWAY_CLI" ]; then
        log "${RED}✗${NC} Railway CLI not found"
        return 1
    fi
    
    # Get deployment status (using Railway API via CLI)
    local status=$($RAILWAY_CLI status 2>&1 || echo "error")
    
    if [[ "$status" == *"error"* ]] || [[ "$status" == *"failed"* ]]; then
        log "${RED}✗${NC} Deployment issue detected"
        return 1
    elif [[ "$status" == *"success"* ]] || [[ "$status" == *"running"* ]]; then
        log "${GREEN}✓${NC} Deployment healthy"
        return 0
    else
        log "${YELLOW}⚠${NC} Deployment status unclear"
        return 2
    fi
}

auto_heal() {
    log "${BLUE}🔧${NC} Attempting auto-heal..."
    
    cd "$PROJECT_DIR"
    
    # Check for common issues
    
    # 1. Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        log "${YELLOW}→${NC} Uncommitted changes detected, syncing..."
        ./scripts/auto-sync-loop.sh --once
    fi
    
    # 2. Verify build locally
    log "${YELLOW}→${NC} Running local build verification..."
    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log "${GREEN}✓${NC} Local build successful"
    else
        log "${RED}✗${NC} Local build failed - manual intervention needed"
        return 1
    fi
    
    # 3. Force redeploy if needed
    log "${YELLOW}→${NC} Triggering Railway redeploy..."
    git commit --allow-empty -m "🔄 Auto-heal: Force redeploy" 2>&1 | tee -a "$LOG_FILE"
    git push origin main 2>&1 | tee -a "$LOG_FILE"
    
    log "${GREEN}✓${NC} Auto-heal complete"
}

monitor_loop() {
    log ""
    log "🚀 Starting Railway Monitor"
    log "   Check Interval: Every $((CHECK_INTERVAL / 60)) minutes"
    log ""
    
    while true; do
        log "=========================================="
        log "Checking Railway deployment status..."
        log "=========================================="
        
        if check_railway_status; then
            log "Status: ${GREEN}Healthy${NC}"
        else
            log "Status: ${RED}Unhealthy${NC} - Initiating auto-heal"
            auto_heal
        fi
        
        log "Next check in $((CHECK_INTERVAL / 60)) minutes"
        log ""
        sleep $CHECK_INTERVAL
    done
}

# Allow single run mode
if [ "$1" = "--once" ]; then
    check_railway_status
    if [ $? -ne 0 ]; then
        auto_heal
    fi
else
    monitor_loop
fi
