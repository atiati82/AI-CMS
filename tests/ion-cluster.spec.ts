import { test, expect } from '@playwright/test';

test.describe('ION Cluster Tests', () => {
    test('ION Pillar page loads', async ({ page }) => {
        await page.goto('/ion');
        await expect(page.getByText(/ions/i).first()).toBeVisible();
        await expect(page.getByText(/technology/i).first()).toBeVisible();
    });

    test('ION Subpages load and show cluster context', async ({ page }) => {
        const subpages = [
            '/ion/volcanic-minerals',
            '/ion/bioelectric',
            '/ion/conductivity-ec-tds'
        ];

        for (const route of subpages) {
            await page.goto(route);
            await expect(page.locator('body')).toBeVisible();
            // Verify cluster theme or related keyword
            await expect(page.getByText(/ionic|andara|mineral/i).first()).toBeVisible();
        }
    });
});
