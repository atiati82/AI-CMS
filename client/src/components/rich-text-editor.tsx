import { useState, useCallback, useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Code2,
  Eye,
  Minus,
  Save,
} from 'lucide-react';

function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  if (markdown.startsWith('<') && (markdown.includes('<p>') || markdown.includes('<h1>') || markdown.includes('<h2>') || markdown.includes('<div>'))) {
    return markdown;
  }
  
  let html = markdown;
  
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  html = html.replace(/~~(.+?)~~/g, '<s>$1</s>');
  
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^\*\*\*$/gm, '<hr />');
  
  const lines = html.split('\n');
  let result: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const bulletMatch = line.match(/^[-*+] (.+)$/);
    const numberMatch = line.match(/^\d+\. (.+)$/);
    
    if (bulletMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      result.push(`<li>${bulletMatch[1]}</li>`);
    } else if (numberMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li>${numberMatch[1]}</li>`);
    } else {
      if (inList) {
        result.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = null;
      }
      
      if (line.trim() === '') {
        result.push('');
      } else if (!line.startsWith('<h') && !line.startsWith('<blockquote') && !line.startsWith('<hr')) {
        result.push(`<p>${line}</p>`);
      } else {
        result.push(line);
      }
    }
  }
  
  if (inList) {
    result.push(listType === 'ol' ? '</ol>' : '</ul>');
  }
  
  return result.join('\n');
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => Promise<void> | void;
  placeholder?: string;
  className?: string;
  id?: string;
  required?: boolean;
  'data-testid'?: string;
}

type EditorMode = 'visual' | 'code';

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'p-1.5 rounded hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        isActive && 'bg-accent/30 text-accent'
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-border mx-1" />;
}

export default function RichTextEditor({
  value,
  onChange,
  onSave,
  placeholder = 'Start writing...',
  className,
  id,
  required,
  'data-testid': dataTestId,
}: RichTextEditorProps) {
  const [mode, setMode] = useState<EditorMode>('visual');
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [codeValue, setCodeValue] = useState(() => markdownToHtml(value));
  const [isInitialized, setIsInitialized] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setCodeValue(html);
    },
  });

  useEffect(() => {
    if (editor && value) {
      const convertedValue = markdownToHtml(value);
      const currentHtml = editor.getHTML();
      if (convertedValue !== currentHtml && convertedValue.trim() !== '' && currentHtml === '<p></p>') {
        editor.commands.setContent(convertedValue);
        setCodeValue(convertedValue);
        setIsInitialized(true);
      } else if (!isInitialized && convertedValue.trim() !== '') {
        editor.commands.setContent(convertedValue);
        setCodeValue(convertedValue);
        setIsInitialized(true);
      }
    }
  }, [value, editor, isInitialized]);

  const handleModeSwitch = useCallback((newMode: EditorMode) => {
    if (newMode === 'visual' && mode === 'code') {
      editor?.commands.setContent(codeValue);
      onChange(codeValue);
    }
    setMode(newMode);
  }, [mode, codeValue, editor, onChange]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCodeValue(newCode);
    onChange(newCode);
  }, [onChange]);

  const addLink = useCallback(() => {
    if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
    }
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  }, [editor, imageUrl]);

  if (!editor) {
    return null;
  }

  const isEmpty = !value || value === '<p></p>' || value.replace(/<[^>]*>/g, '').trim() === '';

  return (
    <div 
      id={id}
      className={cn('border rounded-lg overflow-hidden bg-background', className)}
      data-testid={dataTestId}
    >
      {required && (
        <input
          type="text"
          value={isEmpty ? '' : 'content'}
          required
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={() => {}}
        />
      )}
      <div className="border-b bg-muted/30 p-2 flex flex-wrap items-center gap-0.5">
        <div className="flex items-center gap-1 mr-2">
          <Button
            type="button"
            variant={mode === 'visual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeSwitch('visual')}
            className="h-7 px-2 text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            Visual
          </Button>
          <Button
            type="button"
            variant={mode === 'code' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeSwitch('code')}
            className="h-7 px-2 text-xs"
          >
            <Code2 className="w-3 h-3 mr-1" />
            HTML
          </Button>
        </div>

        {mode === 'code' && (
          <>
            <ToolbarDivider />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={async () => {
                editor?.commands.setContent(codeValue);
                onChange(codeValue);
                
                if (onSave) {
                  setIsSaving(true);
                  try {
                    await onSave();
                    toast({
                      title: "HTML saved",
                      description: "Your changes have been saved successfully.",
                    });
                  } catch (error) {
                    toast({
                      title: "Error saving",
                      description: error instanceof Error ? error.message : "Failed to save changes",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                } else {
                  toast({
                    title: "HTML applied",
                    description: "The HTML code has been applied to the editor.",
                  });
                }
              }}
              className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white border-green-600 disabled:opacity-50"
              data-testid="button-save-html"
            >
              <Save className="w-3 h-3 mr-1" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        )}

        {mode === 'visual' && (
          <>
            <ToolbarDivider />
            
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive('code')}
              title="Inline Code"
            >
              <Code className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <Minus className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              isActive={editor.isActive({ textAlign: 'justify' })}
              title="Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'p-1.5 rounded hover:bg-accent/20 transition-colors',
                    editor.isActive('link') && 'bg-accent/30 text-accent'
                  )}
                  title="Add Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-3">
                  <Label htmlFor="link-url" className="text-sm font-medium">Link URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={addLink}>
                      Add Link
                    </Button>
                    {editor.isActive('link') && (
                      <Button type="button" size="sm" variant="outline" onClick={removeLink}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent/20 transition-colors"
                  title="Add Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-3">
                  <Label htmlFor="image-url" className="text-sm font-medium">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button type="button" size="sm" onClick={addImage}>
                    Add Image
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent/20 transition-colors"
                  title="Highlight"
                >
                  <Highlighter className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="flex gap-1">
                  {['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff', '#fed7aa'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                    />
                  ))}
                  <button
                    type="button"
                    className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform flex items-center justify-center text-xs"
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    title="Remove Highlight"
                  >
                    ✕
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent/20 transition-colors"
                  title="Text Color"
                >
                  <Palette className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="flex gap-1">
                  {['#1f2937', '#dc2626', '#ea580c', '#16a34a', '#2563eb', '#7c3aed', '#db2777'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().setColor(color).run()}
                    />
                  ))}
                  <button
                    type="button"
                    className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform flex items-center justify-center text-xs"
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    title="Remove Color"
                  >
                    ✕
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>

      {mode === 'visual' ? (
        <EditorContent
          editor={editor}
          className="min-h-[100px] max-h-[inherit] overflow-y-auto [&_.ProseMirror]:min-h-[100px] [&_.ProseMirror]:focus:outline-none"
        />
      ) : (
        <Textarea
          value={codeValue}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder={placeholder}
          className="border-0 rounded-none min-h-[100px] max-h-[inherit] font-mono text-sm resize-y focus-visible:ring-0 focus-visible:ring-offset-0"
          data-testid="editor-code-view"
        />
      )}
    </div>
  );
}
