#!/bin/bash

# Test Design System Integration
# Tests all 8 tree themes with AI page generation

echo "🎨 Testing Andara Design System Integration"
echo "==========================================="
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Server not running. Please start with: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Get auth token
echo "🔐 Getting auth token..."
TOKEN=$(curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo "❌ Failed to get auth token"
    exit 1
fi

echo "✅ Authenticated"
echo ""

# Test each tree theme
declare -a themes=(
    "water:Create a page about water science and EZ domains"
    "mineral:Create a page about ionic minerals and sulfate chemistry"
    "matrix:Create a page about sacred geometry and crystalline structures"
    "bioelectric:Create a page about cell voltage and bioelectricity"
    "sulfur:Create a page about sulfate pathways and transmutation"
    "liquid:Create a page about liquid crystal biology and fascia"
    "dna:Create a page about DNA mineral codes and cosmic information"
    "earth:Create a page about microbiome and earth minerals"
)

echo "🧪 Testing 8 Tree Themes..."
echo ""

for theme_test in "${themes[@]}"; do
    IFS=':' read -r theme brief <<< "$theme_test"
    
    echo "Testing: $theme"
    echo "Brief: $brief"
    
    # Generate page
    response=$(curl -s -X POST http://localhost:3000/api/admin/ai/startup \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "{\"brief\":\"$brief\",\"pageSlug\":\"test-$theme\"}")
    
    # Check if successful
    if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
        echo "✅ Generated successfully"
        
        # Check if tree theme is in output
        if echo "$response" | jq -r '.aiStartupHtml' | grep -q "data-tree=\"$theme\""; then
            echo "✅ Tree theme '$theme' detected in output"
        else
            echo "⚠️  Tree theme '$theme' not found in output"
        fi
    else
        echo "❌ Generation failed"
        echo "$response" | jq -r '.error // .message // "Unknown error"'
    fi
    
    echo ""
done

echo "==========================================="
echo "✅ Design System Test Complete"
echo ""
echo "📊 Check generated pages in Admin > AI Page Builder"
echo "🎨 Verify tree theme colors are applied correctly"
