#!/bin/bash
# =============================================================================
# Cron Setup Helper for GitHub Sync Script
# =============================================================================
# Usage:
#   ./setup-cron.sh install   - Install hourly cron job
#   ./setup-cron.sh uninstall - Remove cron job
#   ./setup-cron.sh status    - Show current cron status
# =============================================================================

PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms"
SCRIPT_PATH="$PROJECT_DIR/scripts/github-sync.sh"
CRON_COMMENT="# AI CMS GitHub Sync"
CRON_JOB="0 * * * * $SCRIPT_PATH >> $PROJECT_DIR/scripts/sync.log 2>&1 $CRON_COMMENT"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

show_help() {
    echo ""
    echo "GitHub Sync Cron Setup"
    echo "======================"
    echo ""
    echo "Usage: $0 <command>"
    echo ""
    echo "Commands:"
    echo "  install    Install hourly cron job (runs at minute 0 of every hour)"
    echo "  uninstall  Remove the cron job"
    echo "  status     Show current cron configuration"
    echo "  help       Show this help message"
    echo ""
}

install_cron() {
    echo -e "${BLUE}Installing hourly cron job...${NC}"
    
    # Check if script exists and is executable
    if [ ! -x "$SCRIPT_PATH" ]; then
        echo -e "${YELLOW}Making script executable...${NC}"
        chmod +x "$SCRIPT_PATH"
    fi
    
    # Remove existing entry if present
    crontab -l 2>/dev/null | grep -v "github-sync.sh" | crontab -
    
    # Add new cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    
    echo -e "${GREEN}✅ Cron job installed!${NC}"
    echo ""
    echo "The sync will run at minute 0 of every hour."
    echo "Schedule: Every hour at :00"
    echo ""
    echo "View logs: tail -f $PROJECT_DIR/scripts/sync.log"
    echo ""
}

uninstall_cron() {
    echo -e "${BLUE}Removing cron job...${NC}"
    
    crontab -l 2>/dev/null | grep -v "github-sync.sh" | crontab -
    
    echo -e "${GREEN}✅ Cron job removed!${NC}"
}

show_status() {
    echo ""
    echo "Current Cron Status"
    echo "==================="
    echo ""
    
    if crontab -l 2>/dev/null | grep -q "github-sync.sh"; then
        echo -e "${GREEN}✅ GitHub sync cron job is ACTIVE${NC}"
        echo ""
        echo "Current entry:"
        crontab -l 2>/dev/null | grep "github-sync.sh"
    else
        echo -e "${YELLOW}⚠️  GitHub sync cron job is NOT installed${NC}"
        echo ""
        echo "Run '$0 install' to set up hourly sync."
    fi
    
    echo ""
    echo "Last 5 sync log entries:"
    echo "------------------------"
    if [ -f "$PROJECT_DIR/scripts/sync.log" ]; then
        tail -5 "$PROJECT_DIR/scripts/sync.log"
    else
        echo "(No log file yet)"
    fi
    echo ""
}

# Main
case "$1" in
    install)
        install_cron
        ;;
    uninstall)
        uninstall_cron
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        exit 1
        ;;
esac
