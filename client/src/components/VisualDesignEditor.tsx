import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Brain, X, Send, Pencil, Sparkles, Palette, Zap, Layout, Move } from 'lucide-react';
import { getAuthHeaders } from '@/lib/queryClient';
import '@/styles/visual-design-editor.css';

interface SelectionBox {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

interface SelectedElement {
    tagName: string;
    className: string;
    id: string;
    textContent: string;
    outerHTML: string;
    computedStyles: Record<string, string>;
}

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    suggestions?: DesignSuggestion[];
}

interface DesignSuggestion {
    type: 'color' | 'typography' | 'spacing' | 'motion' | 'layout';
    title: string;
    description: string;
    cssChanges?: Record<string, string>;
}

interface VisualDesignEditorProps {
    enabled?: boolean;
}

export function VisualDesignEditor({ enabled = true }: VisualDesignEditorProps) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
    const [selectedElements, setSelectedElements] = useState<SelectedElement[]>([]);
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);

    // Quick action prompts
    const quickActions = [
        { label: 'Make it premium', icon: Sparkles },
        { label: 'Improve contrast', icon: Palette },
        { label: 'Add motion', icon: Zap },
        { label: 'Better spacing', icon: Layout },
    ];

    // Handle mouse down for selection start
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!isEditMode) return;

        const rect = overlayRef.current?.getBoundingClientRect();
        if (!rect) return;

        setIsSelecting(true);
        setSelectionBox({
            startX: e.clientX,
            startY: e.clientY,
            endX: e.clientX,
            endY: e.clientY,
        });
        setSelectedElements([]);
    }, [isEditMode]);

    // Handle mouse move for selection resize
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isSelecting || !selectionBox) return;

        setSelectionBox(prev => prev ? {
            ...prev,
            endX: e.clientX,
            endY: e.clientY,
        } : null);
    }, [isSelecting, selectionBox]);

    // Handle mouse up for selection complete
    const handleMouseUp = useCallback(() => {
        if (!isSelecting || !selectionBox) return;

        setIsSelecting(false);

        // Calculate the selection bounds
        const minX = Math.min(selectionBox.startX, selectionBox.endX);
        const maxX = Math.max(selectionBox.startX, selectionBox.endX);
        const minY = Math.min(selectionBox.startY, selectionBox.endY);
        const maxY = Math.max(selectionBox.startY, selectionBox.endY);

        // Skip if selection is too small (probably a click)
        if (maxX - minX < 10 || maxY - minY < 10) {
            setSelectionBox(null);
            return;
        }

        // Find elements within the selection
        const elements = document.elementsFromPoint(
            (minX + maxX) / 2,
            (minY + maxY) / 2
        );

        const capturedElements: SelectedElement[] = [];

        for (const el of elements) {
            // Skip the overlay and editor elements
            if (el.closest('.visual-design-editor') || el.closest('.vde-chat-panel')) continue;

            const computed = window.getComputedStyle(el);

            capturedElements.push({
                tagName: el.tagName.toLowerCase(),
                className: el.className || '',
                id: el.id || '',
                textContent: el.textContent?.slice(0, 200) || '',
                outerHTML: el.outerHTML.slice(0, 500),
                computedStyles: {
                    color: computed.color,
                    backgroundColor: computed.backgroundColor,
                    fontSize: computed.fontSize,
                    fontFamily: computed.fontFamily,
                    padding: computed.padding,
                    margin: computed.margin,
                    borderRadius: computed.borderRadius,
                },
            });

            // Limit to first 5 elements
            if (capturedElements.length >= 5) break;
        }

        setSelectedElements(capturedElements);

        if (capturedElements.length > 0) {
            setShowChatPanel(true);
            // Add initial context message
            setMessages([{
                role: 'assistant',
                content: `I see you've selected a ${capturedElements[0].tagName} element. How would you like me to improve its design?`,
            }]);
        }
    }, [isSelecting, selectionBox]);

    // Send message to AI
    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/design-ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    selectionContext: {
                        elements: selectedElements,
                        selectionBounds: selectionBox,
                    },
                }),
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || data.message || 'Here are my design suggestions.',
                suggestions: data.suggestions,
            }]);
        } catch (error) {
            console.error('Design AI chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error processing your request. Please try again.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
        }
    };

    // Calculate selection box style
    const getSelectionStyle = (): React.CSSProperties | undefined => {
        if (!selectionBox) return undefined;

        const minX = Math.min(selectionBox.startX, selectionBox.endX);
        const maxX = Math.max(selectionBox.startX, selectionBox.endX);
        const minY = Math.min(selectionBox.startY, selectionBox.endY);
        const maxY = Math.max(selectionBox.startY, selectionBox.endY);

        return {
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    };

    // Close chat panel
    const closeChat = () => {
        setShowChatPanel(false);
        setSelectionBox(null);
        setSelectedElements([]);
        setMessages([]);
    };

    // Exit edit mode
    const exitEditMode = () => {
        setIsEditMode(false);
        closeChat();
    };

    if (!enabled) return null;

    return createPortal(
        <>
            {/* Edit Mode Toggle Button */}
            <button
                className={`vde-toggle-btn ${isEditMode ? 'active' : ''}`}
                onClick={() => isEditMode ? exitEditMode() : setIsEditMode(true)}
                data-testid="visual-editor-toggle"
            >
                {isEditMode ? (
                    <>
                        <X className="icon" />
                        <span>Exit Edit</span>
                    </>
                ) : (
                    <>
                        <Pencil className="icon" />
                        <span>AI Design Edit</span>
                    </>
                )}
            </button>

            {/* Selection Overlay */}
            {isEditMode && (
                <div
                    ref={overlayRef}
                    className={`visual-design-editor ${isEditMode ? 'active' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => isSelecting && handleMouseUp()}
                >
                    <div className={`vde-overlay ${isSelecting ? 'selecting' : ''}`} />

                    {/* Selection Box */}
                    {selectionBox && (
                        <div className="vde-selection-box" style={getSelectionStyle()} />
                    )}
                </div>
            )}

            {/* AI Chat Panel */}
            {showChatPanel && (
                <div className="vde-chat-panel" data-testid="visual-editor-chat">
                    {/* Header */}
                    <div className="vde-chat-header">
                        <h3>
                            <Brain className="brain-icon" />
                            AI Design Assistant
                        </h3>
                        <button className="vde-chat-close" onClick={closeChat}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Selection Context */}
                    {selectedElements.length > 0 && (
                        <div className="vde-selection-context">
                            <div className="label">Selected Elements</div>
                            <div className="element-tags">
                                {selectedElements.slice(0, 3).map((el, i) => (
                                    <span key={i} className="tag">
                                        {el.tagName}
                                        {el.className && typeof el.className === 'string' && el.className.split(' ')[0]
                                            ? `.${el.className.split(' ')[0]}`
                                            : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="vde-chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`vde-message ${msg.role}`}>
                                {msg.content}
                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="suggestions">
                                        {msg.suggestions.map((s, j) => (
                                            <div key={j} className="suggestion">
                                                <strong>{s.title}</strong>
                                                <p>{s.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="vde-loading">
                                <div className="spinner" />
                                <span>Analyzing design...</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="vde-quick-actions">
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                className="vde-quick-action"
                                onClick={() => sendMessage(action.label)}
                                disabled={isLoading}
                            >
                                <action.icon size={12} />
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="vde-chat-input">
                        <textarea
                            ref={chatInputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Describe how to improve this design..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => sendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
}

export default VisualDesignEditor;
