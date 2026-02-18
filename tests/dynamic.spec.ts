import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByRole('link', { name: 'Elements' }).click();
    await page.getByRole('link', { name: 'Dynamic Properties' }).click();
    await expect(page.getByRole('button', { name: 'Visible After 5 Seconds' })).toBeVisible({ timeout: 6000 });
    await expect(page.getByRole('button', { name: 'Will enable 5 seconds' })).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Color Change' })).toHaveClass(/.*text-danger.*/);
});