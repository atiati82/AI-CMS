// client/src/templates/core/index.ts
// Barrel export for core layout templates

export { LandingLayout, default as LandingLayoutDefault } from './LandingLayout';
export { ProductLayout, default as ProductLayoutDefault } from './ProductLayout';
export { ArticleLayout, default as ArticleLayoutDefault } from './ArticleLayout';
export { UtilityLayout, default as UtilityLayoutDefault } from './UtilityLayout';

// Template type for dynamic selection
export type CoreTemplateType = 'landing' | 'product' | 'article' | 'utility';

// Template map for dynamic rendering
export const CORE_TEMPLATES = {
    landing: 'LandingLayout',
    product: 'ProductLayout',
    article: 'ArticleLayout',
    utility: 'UtilityLayout',
} as const;
