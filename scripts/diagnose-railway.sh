#!/bin/bash
# =============================================================================
# Railway Deployment Health Check & Fix
# =============================================================================
# Comprehensive diagnostic and fix script for Railway deployment issues
# =============================================================================

set -e

PROJECT_DIR="/Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms/andara-ionic-cms"
cd "$PROJECT_DIR"

echo "🔍 Railway Deployment Diagnostic"
echo "=================================="
echo ""

# 1. Check build configuration
echo "1️⃣  Checking build configuration..."
if grep -q "format=esm" package.json; then
    echo "   ✅ Using ESM format (correct)"
else
    echo "   ❌ Not using ESM format"
fi

if grep -q "dist/index.js" package.json; then
    echo "   ✅ Start script points to dist/index.js"
else
    echo "   ❌ Start script issue detected"
fi

# 2. Check Node.js version requirement
echo ""
echo "2️⃣  Checking Node.js version..."
NODE_VERSION=$(grep -A1 "engines" package.json | grep "node" | cut -d'"' -f4)
echo "   Required: $NODE_VERSION"
echo "   .nvmrc: $(cat .nvmrc)"

# 3. Test local build
echo ""
echo "3️⃣  Testing local build..."
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Build succeeds locally"
    
    # Check if dist/index.js exists
    if [ -f "dist/index.js" ]; then
        echo "   ✅ dist/index.js created"
        
        # Check file size
        SIZE=$(du -h dist/index.js | cut -f1)
        echo "   📦 Bundle size: $SIZE"
    else
        echo "   ❌ dist/index.js not found"
    fi
else
    echo "   ❌ Build fails locally"
fi

# 4. Check for common crash causes
echo ""
echo "4️⃣  Checking for common issues..."

# Check if DATABASE_URL is in .env
if grep -q "DATABASE_URL" .env; then
    echo "   ✅ DATABASE_URL configured locally"
else
    echo "   ⚠️  DATABASE_URL not in .env (Railway should have it)"
fi

# Check for import.meta usage
if grep -r "import\.meta" server/ | grep -v "node_modules" > /dev/null; then
    echo "   ℹ️  import.meta used in server code (ESM required)"
fi

# 5. Recommendations
echo ""
echo "📋 Recommendations:"
echo "=================================="
echo ""
echo "✅ Ensure Railway environment variables are set:"
echo "   - DATABASE_URL (Neon connection string)"
echo "   - NODE_ENV=production"
echo ""
echo "✅ Verify Railway build settings:"
echo "   - Build Command: npm run build"
echo "   - Start Command: npm run start"
echo "   - Node Version: 22.12+"
echo ""
echo "✅ Check Railway logs for specific errors:"
echo "   - Visit: https://railway.app/project/bafe8f50-d530-4951-a1b8-fac23a482d03"
echo ""

# 6. Auto-fix option
echo "🔧 Auto-fix available actions:"
echo "=================================="
echo ""
echo "Would you like to:"
echo "  1. Force rebuild and redeploy"
echo "  2. Check git status"
echo "  3. Exit"
echo ""
