import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    children: ReactNode;
    tabName?: string;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class AdminTabErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        // In production, log to analytics service
        console.error("AdminTab Error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center p-8 h-full min-h-[400px]">
                    <Card className="w-full max-w-lg border-destructive/20 bg-destructive/5 animate-in fade-in zoom-in-95 duration-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-6 w-6" />
                                {this.props.tabName ? `${this.props.tabName} Error` : "Tab Crash"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Something went wrong while rendering this tab. You can try refreshing the tab or the entire page.
                            </p>
                            <div className="p-4 rounded-md bg-destructive/10 border border-destructive/10 text-xs font-mono overflow-auto max-h-48 text-destructive-foreground">
                                {this.state.error?.message || "Unknown error occurred"}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.reload()}
                                className="hover:bg-background"
                            >
                                Reload Page
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={this.handleReset}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry Tab
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
