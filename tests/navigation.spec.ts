import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Main header navigation links work', async ({ page }) => {
        // Check Shop link
        const shopLink = page.getByRole('link', { name: /shop/i }).first();
        await shopLink.click();
        await expect(page).toHaveURL(/\/shop/);

        // Check Science link
        await page.goto('/');
        const scienceLink = page.getByRole('link', { name: /science/i }).first();
        await scienceLink.click();
        await expect(page).toHaveURL(/\/science/);

        // Check ION link
        await page.goto('/');
        const ionLink = page.getByRole('link', { name: /ion/i }).first();
        await ionLink.click();
        await expect(page).toHaveURL(/\/ion/);
    });

    test('Footer links work', async ({ page }) => {
        // Scroll to footer first
        await page.locator('footer').scrollIntoViewIfNeeded();

        // About link in footer
        const aboutLink = page.locator('footer').getByRole('link', { name: /story|about/i }).first();
        await aboutLink.click();
        await expect(page).toHaveURL(/\/about\/andara-story/);

        // Intention link in footer
        await page.goto('/');
        await page.locator('footer').scrollIntoViewIfNeeded();
        const intentionLink = page.locator('footer').getByRole('link', { name: /intention/i }).first();
        await intentionLink.click();
        await expect(page).toHaveURL(/\/about\/intention/);
    });

    test('Sitemap link works from footer', async ({ page }) => {
        await page.locator('footer').scrollIntoViewIfNeeded();
        const sitemapLink = page.locator('footer').getByRole('link', { name: /sitemap/i }).first();
        await sitemapLink.click();
        await expect(page).toHaveURL(/\/sitemap/);
    });
});
