import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.evaluate(() => {
        document.body.style.zoom = '0.8';
    });
    await page.getByRole('link', { name: 'Elements' }).click();
    await page.getByRole('link', { name: 'Web Tables' }).click();
    for (let i = 0; i < 8; i++) {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByPlaceholder('First Name').fill('smth');
        await page.getByPlaceholder('Last Name').fill('smth');
        await page.getByPlaceholder('name@example.com').fill('smth@example.com');
        await page.getByPlaceholder('Age').fill('20');
        await page.getByPlaceholder('Salary').fill('100000');
        await page.getByPlaceholder('Department').fill('Software');
        await page.getByRole('button', { name: 'Submit' }).click();
    }
    await expect(page.getByRole('strong')).toContainText('1 of 2');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('[id^="delete-record"]').first().click({ force: true });
    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
    await expect(page.getByRole('strong')).toContainText('1 of 1');
});