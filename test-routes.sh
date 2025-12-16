#!/bin/bash
# Comprehensive Route Test Suite for AI CMS v1.2
# Tests all plugin routes and verifies functionality

BASE_URL="http://localhost:3000"
ADMIN_TOKEN="" # Will need actual admin session

echo "🧪 AI CMS v1.2 - Route Consistency Check"
echo "========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Test function
test_route() {
    local method=$1
    local route=$2
    local expected_status=$3
    local description=$4
    
    echo -n "Testing: $description... "
    
    response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$route" 2>/dev/null)
    status=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$status" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} ($status)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (expected: $expected_status, got: $status)"
        echo "   Response: $body"
        ((FAILED++))
        return 1
    fi
}

echo "📦 PUBLIC ROUTES (Core - Should work)"
echo "-----------------------------------"
test_route GET "/api/products" 200 "Public products list"
test_route GET "/api/clusters" 200 "Public clusters list"
test_route GET "/api/pages" 200 "Public pages list"
test_route GET "/api/science-articles" 200 "Public articles list"
test_route GET "/api/navigation" 200 "Public navigation"
test_route GET "/api/design-settings" 200 "Public design settings"
echo ""

echo "🛒 E-COMMERCE ROUTES"
echo "-----------------------------------"
test_route GET "/api/shop/products" 200 "Shop products list"
test_route GET "/api/shop/orders" 401 "Shop orders (requires admin)"
test_route GET "/api/shop/cart" 400 "Shop cart (requires session header)"
echo ""

echo "🧠 KNOWLEDGE BASE ROUTES"
echo "-----------------------------------"
test_route GET "/api/ai/knowledge" 401 "Knowledge list (requires admin)"
test_route POST "/api/ai/knowledge/search" 401 "Knowledge search (requires admin)"
echo ""

echo "🤖 AI AGENTS ROUTES"
echo "-----------------------------------"
test_route GET "/api/ai/agents" 401 "Agents list (requires admin)"
test_route POST "/api/ai/agents/execute" 401 "Agent execute (requires admin)"
echo ""

echo "💬 BIGMIND CHAT ROUTES"
echo "-----------------------------------"
test_route GET "/api/ai/chat/conversations" 401 "Chat conversations (requires admin)"
test_route POST "/api/ai/chat" 401 "Send chat message (requires admin)"
echo ""

echo "🎓 LEARNING SYSTEM ROUTES"
echo "-----------------------------------"
test_route POST "/api/ai/learning/ingest-current" 401 "Ingest current session (requires admin)"
test_route GET "/api/ai/learning/recommendations" 401 "Get recommendations (requires admin)"
echo ""

echo "📊 ADMIN ROUTES (Core)"
echo "-----------------------------------"
test_route POST "/api/admin/login" 400 "Admin login (missing credentials)"
test_route GET "/api/admin/me" 401 "Admin me (requires auth)"
echo ""

echo ""
echo "========================================="
echo "📊 TEST RESULTS"
echo "========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed. Review above.${NC}"
    exit 1
fi
