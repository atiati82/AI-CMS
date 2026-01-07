import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface AuditIssue {
    severity: "critical" | "warning" | "info";
    code: string;
    message: string;
    recommendation?: string;
    location?: string;
}

export interface AuditResult {
    score: number;
    issues: AuditIssue[];
    metrics: {
        wordCount: number;
        titleLength: number;
        descriptionLength: number;
        keywordDensity: number;
    };
    zoneCompliance: {
        score: number;
        isCompliant: boolean;
        issues: string[];
    };
    lastAuditedAt: Date;
}

interface SeoGateDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    auditResult: AuditResult | null;
    isAuditing: boolean;
    onPublishAnyway: () => void;
    onCancel: () => void;
    threshold?: number;
}

export function SeoGateDialog({
    isOpen,
    onOpenChange,
    auditResult,
    isAuditing,
    onPublishAnyway,
    onCancel,
    threshold = 85
}: SeoGateDialogProps) {
    if (!auditResult) return null;

    const score = auditResult.score;
    const isPassing = score >= threshold;
    const criticalIssues = auditResult.issues.filter(i => i.severity === 'critical');
    const warningIssues = auditResult.issues.filter(i => i.severity === 'warning');

    const getScoreColor = (s: number) => {
        if (s >= 90) return "text-emerald-500";
        if (s >= 80) return "text-emerald-400";
        if (s >= 60) return "text-amber-500";
        return "text-red-500";
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-zinc-950 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border-2 ${getScoreColor(score).replace('text-', 'border-')} ${getScoreColor(score)} font-bold text-lg`}>
                            {score}
                        </div>
                        <div>
                            <DialogTitle className="text-xl">
                                {isPassing ? "SEO Quality Check Passed" : "SEO Quality Check Failed"}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                {isPassing
                                    ? "This page meets the quality standards."
                                    : `This page score is below the required ${threshold}.`}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 my-2">
                    {/* Zone Compliance Check */}
                    {!auditResult.zoneCompliance.isCompliant && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                            <div className="flex items-center gap-2 font-semibold mb-1">
                                <AlertCircle className="w-4 h-4" /> Zone Violation
                            </div>
                            <ul className="list-disc list-inside space-y-1 opacity-90 text-xs">
                                {auditResult.zoneCompliance.issues.map((issue, i) => (
                                    <li key={i}>{issue}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Critical Issues */}
                    {criticalIssues.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
                                <XCircle className="w-4 h-4" /> Critical Issues
                            </h4>
                            <ScrollArea className="h-24 rounded-md border border-zinc-800 bg-zinc-900/50 p-2">
                                <ul className="space-y-2">
                                    {criticalIssues.map((issue, i) => (
                                        <li key={i} className="text-xs text-zinc-300">
                                            <span className="font-semibold text-zinc-100 block">{issue.message}</span>
                                            {issue.recommendation && <span className="opacity-70">{issue.recommendation}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                    )}

                    {/* Warnings (only if failing and no critical?) or always */}
                    {criticalIssues.length === 0 && warningIssues.length > 0 && !isPassing && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Warnings
                            </h4>
                            <ScrollArea className="h-24 rounded-md border border-zinc-800 bg-zinc-900/50 p-2">
                                <ul className="space-y-2">
                                    {warningIssues.map((issue, i) => (
                                        <li key={i} className="text-xs text-zinc-300">
                                            <span className="font-semibold text-zinc-100 block">{issue.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                    )}

                    {isPassing && criticalIssues.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-6 text-emerald-500/80">
                            <CheckCircle className="w-12 h-12 mb-2" />
                            <p className="text-sm font-medium">Ready to Publish</p>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel & Fix
                    </Button>
                    <Button
                        variant={isPassing ? "default" : "destructive"}
                        className={isPassing ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        onClick={onPublishAnyway}
                    >
                        {isPassing ? "Publish Now" : "Publish Anyway"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
