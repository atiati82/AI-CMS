export interface LoaderResult {
    success: boolean;
    data?: any;
    error?: string;
    metadata?: Record<string, any>;
}

export interface ILoader {
    load(source: string): Promise<LoaderResult>;
}
