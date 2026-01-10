import { test, expect } from '@playwright/test';

test.describe('Homepage Interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Hero section is visible with branding', async ({ page }) => {
        await expect(page.getByText(/andara ionic/i).first()).toBeVisible();
        await expect(page.getByText(/primordial/i).first()).toBeVisible();
    });

    test('Pillar cards are interactive', async ({ page }) => {
        const pillars = page.locator('.panel, .facet, [class*="card"]').filter({ hasText: /water|mineral|crystalline/i });
        const count = await pillars.count();
        // Use flexible expectation as UI might have varying card counts
        expect(count).toBeGreaterThan(0);

        if (count > 0) {
            await expect(pillars.first()).toBeVisible();
        }
    });

    test('Deep gateways are accessible', async ({ page }) => {
        await expect(page.getByRole('link', { name: /start here/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /science library/i })).toBeVisible();
    });
});
