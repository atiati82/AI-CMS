import { test, expect } from '@playwright/test';

test.describe('E-commerce Flow', () => {
    test('Add to cart and proceed to checkout', async ({ page }) => {
        // 1. Visit product page
        await page.goto('/shop/andara-ionic-100ml');

        // 2. Add to cart
        const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first();
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        // 3. Verify cart notification or side panel
        // Note: Assuming a toast or sidebar appears
        // await expect(page.getByText(/added to cart/i)).toBeVisible();

        // 4. Open cart/checkout
        await page.goto('/checkout');

        // 5. Verify checkout page content
        await expect(page.getByText(/checkout/i)).toBeVisible();
        await expect(page.getByText(/order summary/i)).toBeVisible();

        // 6. Test form inputs (smoke)
        await page.fill('input[placeholder*="Name"]', 'Test User');
        await page.fill('input[placeholder*="Email"]', 'test@example.com');
        await page.fill('input[placeholder*="Address"]', '123 Test St');

        // 7. Verify shipping options
        // await expect(page.getByText(/standard/i)).toBeVisible();
    });

    test('Order tracking page loads', async ({ page }) => {
        await page.goto('/order-tracking');
        await expect(page.getByText(/track/i)).toBeVisible();
        await expect(page.locator('input[placeholder*="order id"]')).toBeVisible();
    });
});
