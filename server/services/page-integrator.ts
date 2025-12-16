import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

interface IntegrationResult {
  success: boolean;
  pageId: string;
  fileName: string;
  routePath: string;
  componentName: string;
  error?: string;
}

function extractPageId(code: string): string | null {
  const patterns = [
    /pageId:\s*["']([^"']+)["']/,
    /id:\s*["']andara-([^"']+)["']/,
  ];
  
  for (const pattern of patterns) {
    const match = code.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

function extractCluster(code: string): string | null {
  const match = code.match(/cluster:\s*["']([^"']+)["']/);
  return match ? match[1] : null;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function determineRoutePath(pageId: string, cluster: string | null): string {
  const slug = toKebabCase(pageId);
  
  if (cluster) {
    const clusterLower = cluster.toLowerCase();
    if (clusterLower.includes('water')) {
      return `/science/water/${slug}`;
    } else if (clusterLower.includes('mineral')) {
      return `/science/minerals/${slug}`;
    } else if (clusterLower.includes('bioelectric')) {
      return `/science/bioelectricity/${slug}`;
    } else if (clusterLower.includes('science')) {
      return `/science/${slug}`;
    }
  }
  
  return `/science/${slug}`;
}

function isRawHtml(code: string): boolean {
  // Check for HTML comments <!-- --> which are not valid in JSX
  if (code.includes('<!--')) return true;
  // Check for class= instead of className
  if (/\bclass=["']/.test(code) && !code.includes('className=')) return true;
  // Check for missing React component structure
  if (!code.includes('export') && !code.includes('function')) return true;
  return false;
}

const HTML_TO_TSX_PROMPT = `You are an expert React/TypeScript developer. Convert the following raw HTML/Andara Component Language code into a valid React TypeScript component.

IMPORTANT RULES:
1. Convert ALL HTML comments <!-- --> to JSX comments {/* */}
2. Convert ALL class= attributes to className=
3. Convert ALL &amp; to &amp;amp; or use {"&"}
4. Wrap the content in a proper React component structure
5. Use motion from framer-motion for animations
6. Add animation variants (fadeUp, fadeUpContainer, fadeChild) similar to other Andara pages
7. Convert semantic HTML elements to motion.X equivalents where appropriate (motion.section, motion.div, motion.h1, etc.)
8. Keep the ANDARA VISUAL CONFIG block as a JS multi-line comment /* */ at the top
9. Add proper TypeScript types where needed
10. Make sure all JSX is valid - escape special characters, close all tags properly
11. Convert href attributes in <a> tags to use the Link component from wouter for internal links
12. Do NOT include any imports - they will be added automatically
13. The component should be named based on the pageId in PascalCase + "Page"

OUTPUT FORMAT:
Return ONLY the React component code, starting from the VISUAL CONFIG comment.
Do NOT include import statements.
Do NOT include markdown code blocks.
Start directly with /* for the visual config comment.

Example structure:
/*
ANDARA VISUAL CONFIG:
pageId: "example-page"
cluster: "Science Library"
...
*/

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpContainer = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ExamplePage() {
  return (
    <Layout>
      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" }}>
        <main id="..." className="andara-page andara-page--science">
          {/* Content here */}
        </main>
      </MotionConfig>
    </Layout>
  );
}
`;

async function convertHtmlToTsx(htmlCode: string, componentName: string): Promise<string> {
  console.log('[Page Integrator] Converting raw HTML to TSX using AI...');
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `${HTML_TO_TSX_PROMPT}\n\nComponent name should be: ${componentName}\n\nHTML to convert:\n${htmlCode}` }],
        },
      ],
      config: {
        temperature: 0.2,
        maxOutputTokens: 32000,
      },
    });

    // Access the text as a property
    let tsxCode = response.text || '';
    
    // Clean up any markdown code blocks if the AI included them
    tsxCode = tsxCode.replace(/^```(?:tsx|typescript|javascript|jsx)?\n?/gm, '');
    tsxCode = tsxCode.replace(/\n?```$/gm, '');
    tsxCode = tsxCode.trim();
    
    // Guard: throw if AI returned empty response (after cleanup)
    if (!tsxCode || tsxCode.length === 0) {
      console.error('[Page Integrator] AI returned empty content after cleanup');
      throw new Error('AI returned empty response when converting HTML to TSX');
    }
    
    console.log('[Page Integrator] AI conversion complete, output length:', tsxCode.length);
    return tsxCode;
  } catch (error) {
    console.error('[Page Integrator] AI conversion failed:', error);
    throw new Error(`Failed to convert HTML to TSX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function processComponentCode(tsxCode: string, componentName: string): string {
  let processed = tsxCode;
  
  // Fix motion/react imports
  processed = processed.replace(
    /import\s*{\s*motion\s*,\s*MotionConfig\s*}\s*from\s*["']motion\/react["']/g,
    'import { motion, MotionConfig } from "framer-motion"'
  );
  processed = processed.replace(
    /from\s*["']motion\/react["']/g,
    'from "framer-motion"'
  );
  
  const exportMatch = processed.match(/export\s+(?:const|function|default\s+function)\s+(\w+)/);
  const originalComponentName = exportMatch ? exportMatch[1] : null;
  
  const importStatements = `import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
`;

  // Remove all React imports
  processed = processed.replace(/^import\s+React\s*,?\s*(?:\{[^}]*\})?\s*from\s*["']react["'];?\s*\n?/gm, '');
  processed = processed.replace(/^import\s*\{[^}]*\}\s*from\s*["']react["'];?\s*\n?/gm, '');
  // Remove framer-motion/motion imports
  processed = processed.replace(/^import\s*\{[^}]*\}\s*from\s*["']framer-motion["'];?\s*\n?/gm, '');
  processed = processed.replace(/^import\s*\{[^}]*\}\s*from\s*["']motion\/react["'];?\s*\n?/gm, '');
  // Remove wouter Link imports
  processed = processed.replace(/^import\s*\{[^}]*Link[^}]*\}\s*from\s*["']wouter["'];?\s*\n?/gm, '');
  // Remove Layout imports
  processed = processed.replace(/^import\s+Layout\s+from\s+["']@\/components\/layout["'];?\s*\n?/gm, '');
  
  // Check if wrappers exist
  const hasLayoutWrapper = processed.includes('<Layout>') || processed.includes('<Layout ');
  const hasMotionConfig = processed.includes('<MotionConfig') || processed.includes('MotionConfig>');
  
  // Only add wrappers if they don't exist and the code has proper structure
  if (!hasLayoutWrapper && !hasMotionConfig) {
    // Check if there's a return statement with main/section content
    const hasMainElement = processed.includes('<main') || processed.includes('<motion.main');
    
    if (hasMainElement) {
      // Add Layout and MotionConfig wrapper before main
      processed = processed.replace(
        /return\s*\(\s*(<(?:main|motion\.main))/,
        'return (\n    <Layout>\n      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" }}>\n        $1'
      );
      
      // Find the last </main> and add proper closing
      const lastMainClose = processed.lastIndexOf('</main>');
      const lastMotionMainClose = processed.lastIndexOf('</motion.main>');
      const closePos = Math.max(lastMainClose, lastMotionMainClose);
      
      if (closePos !== -1) {
        const closeTag = lastMotionMainClose > lastMainClose ? '</motion.main>' : '</main>';
        const closeTagLen = closeTag.length;
        const beforeClose = processed.substring(0, closePos + closeTagLen);
        // Get remaining content after the close tag
        const afterClose = processed.substring(closePos + closeTagLen);
        // Check if there's already proper closing
        if (!afterClose.includes('</MotionConfig>') && !afterClose.includes('</Layout>')) {
          processed = beforeClose + '\n      </MotionConfig>\n    </Layout>\n  );\n}';
        }
      }
    }
  } else if (hasMotionConfig && !hasLayoutWrapper) {
    // MotionConfig exists but no Layout - wrap the MotionConfig with Layout
    processed = processed.replace(
      /return\s*\(\s*<MotionConfig/,
      'return (\n    <Layout>\n      <MotionConfig'
    );
    // Add Layout closing before the final closing paren
    const lastMotionConfigClose = processed.lastIndexOf('</MotionConfig>');
    if (lastMotionConfigClose !== -1) {
      const afterMotion = processed.substring(lastMotionConfigClose + 14);
      if (!afterMotion.includes('</Layout>')) {
        processed = processed.substring(0, lastMotionConfigClose + 14) + '\n    </Layout>' + afterMotion;
      }
    }
  }

  // Ensure proper export
  if (originalComponentName && originalComponentName !== componentName && !processed.includes(`export default function ${componentName}`)) {
    processed = processed.replace(
      new RegExp(`export\\s+(const|function|default\\s+function)\\s+${originalComponentName}`, 'g'),
      `export default function ${componentName}`
    );
  }
  
  if (!processed.includes('export default')) {
    processed = processed.replace(
      /export\s+(const|function)\s+(\w+)/,
      `export default function ${componentName}`
    );
  }
  
  // Clean up React.FC type annotations
  processed = processed.replace(/: React\.FC\s*=\s*\(\)\s*=>\s*{/, '() {');
  
  const fullCode = importStatements + '\n' + processed.trim();
  
  return fullCode;
}

function updateAppTsx(routePath: string, componentName: string, fileName: string): boolean {
  const appTsxPath = path.join(process.cwd(), 'client/src/App.tsx');
  
  if (!fs.existsSync(appTsxPath)) {
    console.error('App.tsx not found at:', appTsxPath);
    return false;
  }
  
  let appContent = fs.readFileSync(appTsxPath, 'utf-8');
  
  const importLine = `import ${componentName} from "@/pages/${fileName.replace('.tsx', '')}";`;
  
  if (appContent.includes(importLine)) {
    console.log('Import already exists');
  } else {
    const lastImportMatch = appContent.match(/^import .+ from ["']@\/pages\/[^"']+["'];?\s*$/gm);
    if (lastImportMatch && lastImportMatch.length > 0) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      appContent = appContent.replace(lastImport, `${lastImport}\n${importLine}`);
    }
  }
  
  const routeLine = `      <Route path="${routePath}" component={${componentName}} />`;
  
  if (appContent.includes(`path="${routePath}"`)) {
    console.log('Route already exists');
  } else {
    const scienceSlugRoute = appContent.match(/\s*<Route path="\/science\/:slug" component=\{ArticlePage\} \/>/);
    if (scienceSlugRoute) {
      appContent = appContent.replace(
        scienceSlugRoute[0],
        `\n${routeLine}${scienceSlugRoute[0]}`
      );
    } else {
      const switchMatch = appContent.match(/<Switch>[\s\S]*?<Route path="\/science"/);
      if (switchMatch) {
        const insertPos = appContent.indexOf('<Route path="/science/:slug"');
        if (insertPos !== -1) {
          appContent = appContent.slice(0, insertPos) + routeLine + '\n' + appContent.slice(insertPos);
        }
      }
    }
  }
  
  fs.writeFileSync(appTsxPath, appContent);
  return true;
}

export async function integrateTsxPage(inputCode: string): Promise<IntegrationResult> {
  try {
    let tsxCode = inputCode;
    
    // FIRST: Check if this is raw HTML and needs AI conversion BEFORE extracting pageId
    // Raw HTML won't have a valid pageId until after AI conversion
    if (isRawHtml(inputCode)) {
      console.log('[Page Integrator] Detected raw HTML input, converting to TSX...');
      // Try to extract pageId from raw HTML for component naming
      const rawPageId = extractPageId(inputCode);
      const tempComponentName = rawPageId ? `${toPascalCase(rawPageId)}Page` : 'GeneratedPage';
      tsxCode = await convertHtmlToTsx(inputCode, tempComponentName);
    }
    
    // Now extract pageId from the (possibly converted) code
    const pageId = extractPageId(tsxCode);
    if (!pageId) {
      return {
        success: false,
        pageId: '',
        fileName: '',
        routePath: '',
        componentName: '',
        error: 'Could not extract pageId from the code. Make sure ANDARA VISUAL CONFIG has a pageId field.'
      };
    }
    
    const cluster = extractCluster(tsxCode);
    const fileName = `${toKebabCase(pageId)}.tsx`;
    const componentName = `${toPascalCase(pageId)}Page`;
    const routePath = determineRoutePath(pageId, cluster);
    
    const processedCode = processComponentCode(tsxCode, componentName);
    
    const pagesDir = path.join(process.cwd(), 'client/src/pages');
    const filePath = path.join(pagesDir, fileName);
    
    fs.writeFileSync(filePath, processedCode);
    console.log(`Created page file: ${filePath}`);
    
    const appUpdated = updateAppTsx(routePath, componentName, fileName);
    if (!appUpdated) {
      return {
        success: false,
        pageId,
        fileName,
        routePath,
        componentName,
        error: 'Failed to update App.tsx'
      };
    }
    
    return {
      success: true,
      pageId,
      fileName,
      routePath,
      componentName
    };
    
  } catch (error) {
    console.error('Integration error:', error);
    return {
      success: false,
      pageId: '',
      fileName: '',
      routePath: '',
      componentName: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
