import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByRole('link', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Progress Bar' }).click();
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByRole('progressbar')).toContainText('100%', { timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
});