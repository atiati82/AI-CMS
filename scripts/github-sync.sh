#!/bin/bash
# =============================================================================
# GitHub Hourly Sync & Backup Script for AI CMS
# =============================================================================
# Features:
#   - Pull latest changes from GitHub
#   - Run TypeScript validation
#   - Auto-commit all changes with timestamp
#   - Push to main branch
#   - Create hourly backup branches
#   - Auto-clean old backup branches (>7 days)
# =============================================================================

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms"
SCRIPT_DIR="$PROJECT_DIR/scripts"
LOG_FILE="$SCRIPT_DIR/sync.log"
REMOTE="origin"
MAIN_BRANCH="main"
BACKUP_PREFIX="backup"
KEEP_DAYS=7

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local message="[$timestamp] $1"
    echo -e "$message"
    echo "$message" >> "$LOG_FILE"
}

log_success() { log "${GREEN}✅ $1${NC}"; }
log_error() { log "${RED}❌ $1${NC}"; }
log_warning() { log "${YELLOW}⚠️  $1${NC}"; }
log_info() { log "${BLUE}ℹ️  $1${NC}"; }

# Initialize log file if it doesn't exist
init_log() {
    mkdir -p "$SCRIPT_DIR"
    if [ ! -f "$LOG_FILE" ]; then
        touch "$LOG_FILE"
        log_info "Created log file: $LOG_FILE"
    fi
}

# Check if we're in a git repository
check_git() {
    if [ ! -d "$PROJECT_DIR/.git" ]; then
        log_error "Not a git repository: $PROJECT_DIR"
        exit 1
    fi
}

# Pull latest changes from remote
pull_changes() {
    log_info "Pulling latest changes from $REMOTE/$MAIN_BRANCH..."
    
    cd "$PROJECT_DIR"
    
    # Stash any uncommitted changes first
    if [ -n "$(git status --porcelain)" ]; then
        log_warning "Stashing uncommitted changes..."
        git stash push -m "Auto-stash before sync $(date '+%Y-%m-%d %H:%M')"
        STASHED=true
    else
        STASHED=false
    fi
    
    # Pull with rebase to keep history clean
    if git pull --rebase $REMOTE $MAIN_BRANCH 2>/dev/null; then
        log_success "Pulled latest changes"
    else
        log_warning "Pull failed or no changes to pull"
    fi
    
    # Pop stash if we stashed
    if [ "$STASHED" = true ]; then
        log_info "Restoring stashed changes..."
        git stash pop || log_warning "Could not restore stash (may have conflicts)"
    fi
}

# Run TypeScript check
run_type_check() {
    log_info "Running TypeScript validation..."
    
    cd "$PROJECT_DIR"
    
    if npm run check 2>/dev/null; then
        log_success "TypeScript check passed"
        return 0
    else
        log_warning "TypeScript check had issues (continuing anyway)"
        return 0  # Don't block on TS errors
    fi
}

# Stage and commit all changes
commit_changes() {
    cd "$PROJECT_DIR"
    
    # Check for changes
    if [ -z "$(git status --porcelain)" ]; then
        log_info "No changes to commit"
        return 1
    fi
    
    # Stage all changes
    git add -A
    
    # Create commit message with timestamp
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local commit_msg="🔄 Auto-sync: $timestamp"
    
    # Count changes
    local added=$(git diff --cached --numstat | wc -l | xargs)
    local files_changed=$(git diff --cached --stat | tail -1)
    
    git commit -m "$commit_msg" -m "Changes: $files_changed"
    
    log_success "Committed changes: $added files"
    return 0
}

# Push to main branch
push_main() {
    log_info "Pushing to $REMOTE/$MAIN_BRANCH..."
    
    cd "$PROJECT_DIR"
    
    if git push $REMOTE $MAIN_BRANCH 2>/dev/null; then
        log_success "Pushed to $MAIN_BRANCH"
    else
        log_error "Failed to push to $MAIN_BRANCH"
        return 1
    fi
}

# Create backup branch
create_backup() {
    local backup_name="$BACKUP_PREFIX/$(date '+%Y-%m-%d-%H')"
    
    log_info "Creating backup branch: $backup_name"
    
    cd "$PROJECT_DIR"
    
    # Delete local backup branch if it exists (from previous run in same hour)
    git branch -D "$backup_name" 2>/dev/null || true
    
    # Create and push backup branch
    git branch "$backup_name"
    
    if git push $REMOTE "$backup_name" --force 2>/dev/null; then
        log_success "Created backup: $backup_name"
    else
        log_warning "Could not push backup branch (may already exist)"
    fi
}

# Clean old backup branches
clean_old_backups() {
    log_info "Cleaning backup branches older than $KEEP_DAYS days..."
    
    cd "$PROJECT_DIR"
    
    # Get cutoff date
    local cutoff=$(date -v-${KEEP_DAYS}d '+%Y-%m-%d' 2>/dev/null || date -d "$KEEP_DAYS days ago" '+%Y-%m-%d')
    
    # Fetch all remote branches
    git fetch --prune $REMOTE 2>/dev/null || true
    
    # Find and delete old backup branches
    local deleted_count=0
    
    for branch in $(git branch -r | grep "$REMOTE/$BACKUP_PREFIX/" | sed "s|$REMOTE/||"); do
        # Extract date from branch name (backup/YYYY-MM-DD-HH)
        local branch_date=$(echo "$branch" | sed "s|$BACKUP_PREFIX/||" | cut -d'-' -f1-3)
        
        if [[ "$branch_date" < "$cutoff" ]]; then
            log_info "Deleting old backup: $branch"
            git push $REMOTE --delete "$branch" 2>/dev/null || true
            git branch -D "$branch" 2>/dev/null || true
            ((deleted_count++))
        fi
    done
    
    if [ $deleted_count -gt 0 ]; then
        log_success "Deleted $deleted_count old backup branches"
    else
        log_info "No old backups to clean"
    fi
}

# Show sync summary
show_summary() {
    echo ""
    echo "========================================"
    log_success "SYNC COMPLETE"
    echo "========================================"
    echo "  Repository: $(git remote get-url $REMOTE)"
    echo "  Branch: $MAIN_BRANCH"
    echo "  Latest commit: $(git log -1 --pretty=format:'%h - %s')"
    echo "  Backup branches: $(git branch -r | grep "$REMOTE/$BACKUP_PREFIX/" | wc -l | xargs)"
    echo "========================================"
    echo ""
}

# Main execution
main() {
    echo ""
    echo "🚀 Starting GitHub Sync..."
    echo "   $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    
    init_log
    check_git
    pull_changes
    run_type_check
    
    if commit_changes; then
        push_main
    fi
    
    create_backup
    clean_old_backups
    show_summary
}

# Run main function
main "$@"
