
import { Tool } from './types';
import { db } from '../../db';
import { pages } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

/**
 * Tool to create a new page in the CMS
 */
export const createPageTool: Tool = {
    name: 'create_page',
    description: 'Create a new content page in the CMS. Use this when the user asks to create a page about a topic.',
    parameters: {
        type: 'OBJECT',
        properties: {
            title: {
                type: 'STRING',
                description: 'The title of the page.'
            },
            slug: {
                type: 'STRING',
                description: 'The URL slug for the page (e.g., /science/structured-water).'
            },
            content: {
                type: 'STRING',
                description: 'The full markdown content of the page.'
            },
            summary: {
                type: 'STRING',
                description: 'A brief summary of the page content.'
            },
            cluster_key: {
                type: 'STRING',
                description: 'The knowledge cluster key (e.g., mineral_science, product_guide).'
            },
            page_type: {
                type: 'STRING',
                description: 'The type of page (e.g., article, product, guide). Default: article.'
            }
        },
        required: ['title', 'slug', 'content']
    },
    execute: async (args: { title: string; slug: string; content: string; summary?: string; cluster_key?: string; page_type?: string }) => {
        try {
            const pageId = uuidv4();
            const [inserted] = await db.insert(pages).values({
                id: pageId,
                title: args.title,
                path: args.slug.startsWith('/') ? args.slug : `/${args.slug}`,
                content: args.content,
                summary: args.summary || '',
                clusterKey: args.cluster_key || 'uncategorized',
                pageType: args.page_type || 'article',
                status: 'draft', // Safety: Always draft
                template: 'default',
                updatedAt: new Date(),
                key: args.slug.startsWith('/') ? args.slug.substring(1) : args.slug // Key is required and unique
            }).returning({ id: pages.id });

            return `Page created successfully! ID: ${inserted.id}, Path: ${args.slug}. Status: Draft.`;
        } catch (error) {
            console.error('Create Page Tool Failed:', error);
            return `Error creating page: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }
};

/**
 * Tool to update an existing page
 */
export const updatePageTool: Tool = {
    name: 'update_page',
    description: 'Update the content of an existing page. Find the page by its path/slug.',
    parameters: {
        type: 'OBJECT',
        properties: {
            slug: {
                type: 'STRING',
                description: 'The URL slug of the page to update.'
            },
            content: {
                type: 'STRING',
                description: 'The new markdown content (replaces existing).'
            },
            title: {
                type: 'STRING',
                description: 'New title (optional).'
            }
        },
        required: ['slug', 'content']
    },
    execute: async (args: { slug: string; content: string; title?: string }) => {
        try {
            const path = args.slug.startsWith('/') ? args.slug : `/${args.slug}`;
            const existing = await db.query.pages.findFirst({
                where: eq(pages.path, path)
            });

            if (!existing) {
                return `Error: Page with path "${path}" not found.`;
            }

            await db.update(pages)
                .set({
                    content: args.content,
                    title: args.title || existing.title,
                    updatedAt: new Date()
                })
                .where(eq(pages.id, existing.id));

            return `Page updated successfully! Path: ${path}.`;
        } catch (error) {
            console.error('Update Page Tool Failed:', error);
            return `Error updating page: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }
};

export const cmsTools = [createPageTool, updatePageTool];
