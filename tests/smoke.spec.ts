```javascript
import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/primordial',
  '/how-andara-works',
  '/science-library',
  '/science',
  '/science/crystalline-matrix',
  '/science/bioelectricity',
  '/science/water-science',
  '/science/mineral-science-blueprint',
  '/ion',
  '/ion/volcanic-minerals',
  '/ion/bioelectric',
  '/about/andara-story',
  '/about/intention',
  '/shop/andara-ionic-100ml',
  '/shop/andara-ionic-1l',
  '/checkout',
  '/admin',
];

test.describe('Smoke Tests - All Routes', () => {
    for (const route of ROUTES) {
        test(`Route "${route}" should load successfully`, async ({ page }) => {
            // Monitor console errors
            const errors: string[] = [];
            page.on('pageerror', (err) => errors.push(err.message));

            const response = await page.goto(route);

            // Check status
            expect(response?.status()).toBe(200);

            // Wait for network idle to ensure everything loaded
            await page.waitForLoadState('networkidle');

            // Verify no critical JS errors
            expect(errors, `Found JS errors on ${ route }: ${ errors.join(', ') } `).toHaveLength(0);

            // Basic accessibility/rendering check: ensure body is visible
            await expect(page.locator('body')).toBeVisible();

            // Ensure it's not a "black page" (rendered content exists)
            const content = await page.textContent('body');
            expect(content?.length).toBeGreaterThan(100);
        });
    }
});
