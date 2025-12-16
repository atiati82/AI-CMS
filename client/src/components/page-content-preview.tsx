import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, EyeOff, Maximize2, Minimize2, Monitor, Tablet, Smartphone,
  Edit, Save, Send, ExternalLink, ChevronDown, ChevronUp, FileText
} from "lucide-react";

interface PageContentPreviewProps {
  content: string;
  title?: string;
  path?: string;
  cluster?: string;
  pageId?: string;
  status?: "draft" | "published";
  onSaveAsDraft?: () => void;
  onPublish?: () => void;
  onEditInCms?: () => void;
  showActions?: boolean;
  showDetails?: boolean;
  defaultExpanded?: boolean;
  maxHeight?: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<ViewMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function PageContentPreview({
  content,
  title,
  path,
  cluster,
  pageId,
  status,
  onSaveAsDraft,
  onPublish,
  onEditInCms,
  showActions = true,
  showDetails = true,
  defaultExpanded = true,
  maxHeight = "500px",
}: PageContentPreviewProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generatePreviewHtml = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/styles/andara-components.css">
  <style>
    :root {
      --andara-bg-primary: #020617;
      --andara-bg-secondary: #0f172a;
      --andara-bg-tertiary: #1e293b;
      --andara-bg-card: rgba(15, 23, 42, 0.7);
      --andara-text-primary: #f8fafc;
      --andara-text-secondary: #cbd5e1;
      --andara-text-muted: #94a3b8;
      --andara-accent-emerald: #10b981;
      --andara-accent-cyan: #06b6d4;
      --andara-accent-indigo: #6366f1;
      --andara-gold-deep: #c0963b;
      --andara-gold-amber: #f2c76c;
      --andara-gradient-gold: linear-gradient(135deg, #c0963b 0%, #ce9e26 23%, #f2c76c 41%, #e0b655 59%, #fdf8d0 77%, #e9c882 100%);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%);
      color: #f8fafc;
      min-height: 100vh;
      line-height: 1.6;
    }
    
    .andara-page, .andara-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .andara-hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%);
      border-radius: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .andara-hero h1 {
      font-size: 2.5rem;
      font-weight: 600;
      background: linear-gradient(135deg, #f8fafc 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .andara-hero p {
      font-size: 1.125rem;
      color: #94a3b8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .andara-section {
      padding: 2rem 0;
    }
    
    .andara-section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 1rem;
    }
    
    .andara-section p {
      color: #cbd5e1;
    }
    
    .andara-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .andara-card:hover {
      border-color: rgba(16, 185, 129, 0.4);
    }
    
    .andara-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .andara-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .andara-btn-primary {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
    }
    
    .andara-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 0.75rem;
    }
    
    a {
      color: #10b981;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    ul, ol {
      padding-left: 1.5rem;
      color: #cbd5e1;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="andara-page-wrapper">
    ${content}
  </div>
</body>
</html>
    `;
  };

  if (!content) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 rounded-xl border border-border bg-card overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}
    >
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Page Preview</span>
          {title && (
            <Badge variant="outline" className="ml-2">{title}</Badge>
          )}
          {status && (
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 p-1 bg-background rounded-lg mr-2">
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("desktop")}
              data-testid="preview-desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("tablet")}
              data-testid="preview-tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("mobile")}
              data-testid="preview-mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsFullscreen(!isFullscreen)}
            data-testid="preview-fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded(!expanded)}
            data-testid="preview-toggle"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="bg-slate-900 flex justify-center p-4"
              style={{ maxHeight: isFullscreen ? "calc(100vh - 200px)" : maxHeight, overflow: "auto" }}
            >
              <div 
                className="bg-slate-950 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
                style={{ width: viewportWidths[viewMode], maxWidth: "100%" }}
              >
                <iframe
                  ref={iframeRef}
                  srcDoc={generatePreviewHtml()}
                  className="w-full border-0"
                  style={{ 
                    height: isFullscreen ? "calc(100vh - 250px)" : "400px",
                    background: "#020617"
                  }}
                  title="Page Preview"
                  sandbox="allow-same-origin"
                  data-testid="preview-iframe"
                />
              </div>
            </div>

            {showDetails && (path || cluster || pageId) && (
              <div className="p-3 border-t border-border bg-muted/30">
                <button
                  onClick={() => setShowDetailsPanel(!showDetailsPanel)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="toggle-page-details"
                >
                  <FileText className="w-4 h-4" />
                  Page Details
                  {showDetailsPanel ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                
                <AnimatePresence>
                  {showDetailsPanel && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3"
                    >
                      {title && (
                        <div>
                          <div className="text-xs text-muted-foreground">Title</div>
                          <div className="text-sm font-medium truncate">{title}</div>
                        </div>
                      )}
                      {path && (
                        <div>
                          <div className="text-xs text-muted-foreground">Path</div>
                          <div className="text-sm font-mono truncate">{path}</div>
                        </div>
                      )}
                      {cluster && (
                        <div>
                          <div className="text-xs text-muted-foreground">Cluster</div>
                          <div className="text-sm truncate">{cluster}</div>
                        </div>
                      )}
                      {pageId && (
                        <div>
                          <div className="text-xs text-muted-foreground">Page ID</div>
                          <div className="text-sm font-mono truncate text-xs">{pageId}</div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {showActions && (onSaveAsDraft || onPublish || onEditInCms) && (
              <div className="flex items-center gap-2 p-3 border-t border-border bg-muted/50">
                {onEditInCms && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onEditInCms}
                    data-testid="preview-edit-cms"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit in CMS
                  </Button>
                )}
                {onSaveAsDraft && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onSaveAsDraft}
                    data-testid="preview-save-draft"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                )}
                {onPublish && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={onPublish}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    data-testid="preview-publish"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                )}
                {pageId && onEditInCms && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onEditInCms}
                    className="ml-auto"
                    data-testid="preview-open-page"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Page
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PageContentPreview;
