---
description: Invoke Visual Interpreter to describe a UI context in design language
---

# Design Interpret Workflow

Generates visual interpretations using the Andara design language.

## Usage

Invoke with: `/design-interpret [context]`

## Steps

1. **Prepare Context**
   - Identify the page or component you want to interpret
   - Gather relevant keywords: topic, mood, page type

2. **Execute Visual Interpreter**
   The agent will detect the appropriate Color World and generate:
   - Hero description
   - Color field emotional tone
   - Motion recommendations
   - Typography guidance
   - Component styling

// turbo
3. **API Example**
   ```bash
   curl -X POST http://localhost:3000/api/ai/agents/execute \
     -H "Content-Type: application/json" \
     -d '{
       "agentName": "visual-interpreter",
       "task": {
         "type": "interpret_page",
         "input": { "context": "EZ Water science page", "topic": "structured water" }
       }
     }'
   ```

4. **Available Task Types**
   - `interpret_page` — Full page visual interpretation
   - `describe_component` — Single component description
   - `suggest_atmosphere` — Mood and color recommendations
   - `map_color_world` — Detect which color world applies

## Color Worlds Reference

| Domain | Color | Use For |
|--------|-------|---------|
| Water Science | Cyan | Water, hydration content |
| Bioelectricity | Emerald | Cell voltage, energy |
| Crystalline Matrix | Gold | Premium, sacred geometry |
| Sulphate Pathways | Yellow-Gold | Mineral, ionic |
| DNA Codes | Violet | Genetic, cosmic info |
| Earth Sources | Brown | Primordial, ancient |

## Example Output

```json
{
  "hero": {
    "description": "Water Science-infused hero space opening like a crystalline gateway...",
    "atmosphere": "Flowing, purifying, life-giving depths"
  },
  "colorField": {
    "world": "Water Science",
    "primaryColor": "#06b6d4"
  }
}
```
