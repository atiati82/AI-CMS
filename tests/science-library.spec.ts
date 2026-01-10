import { test, expect } from '@playwright/test';

test.describe('Science Library Tests', () => {
    test('Science Library Gate loads', async ({ page }) => {
        await page.goto('/science-library');
        await expect(page.getByText(/science library/i).first()).toBeVisible();
    });

    test('Water Science deep dive pages', async ({ page }) => {
        await page.goto('/science/water-science');
        await expect(page.getByText(/water science/i).first()).toBeVisible();

        // Check for "EZ Water" link or content
        await page.goto('/science/ez-water-overview');
        await expect(page.getByText(/ez/i).first()).toBeVisible();
    });

    test('Mineral Science deep dive pages', async ({ page }) => {
        await page.goto('/science/sulfate-chemistry');
        await expect(page.getByText(/sulfate/i).first()).toBeVisible();
    });
});
