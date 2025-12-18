// Shared TypeScript types for admin tabs
// This file is used by all tab components to ensure type consistency

export type Page = {
    id: string;
    key: string;
    title: string;
    path: string;
    pageType: string;
    template: string;
    clusterKey: string | null;
    parentKey: string | null;
    priority: number;
    status: string;
    summary: string | null;
    content: string | null;
    seoFocus: string | null;
    visualConfig?: any;
    children?: Page[];
    createdAt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
};

export type Product = {
    id: string;
    name: string;
    slug: string;
    sizeMl: number;
    descriptionShort: string;
    descriptionLong: string;
    highlights: string[];
    price: number;
    pricePerLiter: number;
    images: string[];
    tags: string[];
    bundles: any[];
    seoTitle?: string;
    seoDescription?: string;
    createdAt?: string;
    pageKey?: string;
    templateId?: string;
};

export type CmsSetting = {
    key: string;
    value: any;
    description: string | null;
    category: string;
};

export type SettingDefinition = {
    key: string;
    label: string;
    description: string;
    category: string;
    defaultValue: any;
    type?: 'text' | 'select' | 'number' | 'boolean';
    options?: Array<{ value: any; label: string; description?: string }>;
};

// Add more shared types as needed when extracting other tabs
export type WorkflowStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'paused' | 'skipped';

export type WorkflowExecution = {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'paused' | 'cancelled';
    currentStep: number;
    totalSteps: number;
    steps: Array<{
        id: string;
        name: string;
        agent: string;
        status: WorkflowStepStatus;
        result?: any;
        error?: string;
        startedAt?: string;
        completedAt?: string;
    }>;
    createdAt: string;
    updatedAt: string;
};

export type WorkflowTemplate = {
    id: string;
    name: string;
    description: string;
    steps: Array<{
        id: string;
        name: string;
        description: string;
        agent: string;
    }>;
    requiredParams: string[];
};

export type ContentStats = {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalProducts: number;
    totalArticles: number;
    totalClusters: number;
};
