import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.evaluate(() => {
        document.body.style.zoom = '0.8';
    });
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByRole('textbox', { name: 'First name:' }).click();
    await page.getByRole('textbox', { name: 'First name:' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last name:' }).click();
    await page.getByRole('textbox', { name: 'Last name:' }).fill('Test');
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill(`test${Date.now()}@example.com`);
    await page.getByRole('textbox', { name: 'Password:', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password:', exact: true }).fill('Test123');
    await page.getByRole('textbox', { name: 'Confirm password:' }).click();
    await page.getByRole('textbox', { name: 'Confirm password:' }).fill('Test123');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.result')).toContainText('Your registration completed');

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('link', { name: 'Computers' }).nth(1).click();
    await page.getByRole('link', { name: 'Desktops' }).first().click();

    const products = page.locator('.product-item');
    const productCount = await products.count();
    let targetProductFound = false;

    for (let i = 0; i < productCount; i++) {
        const priceText = await products.nth(i).locator('.actual-price').innerText();
        const price = parseFloat(priceText);
        if (price > 1400) {
            const title = await products.nth(i).locator('.product-title').innerText();
            if (title.includes("Build your own expensive computer")) {
                await products.nth(i).locator('a').first().click();
                targetProductFound = true;
                break;
            }
        }
    }
    expect(targetProductFound).toBe(true);

    await page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
    await page.getByRole('radio', { name: '8GB [+60.00]' }).check();
    await page.locator('#add-to-cart-button-74').click();
    await page.getByRole('link', { name: 'Apparel & Shoes' }).nth(1).click();

    await expect(page).toHaveURL(/.*apparel-shoes/);

    await page.getByRole('link', { name: 'Picture of Blue and green' }).click();
    await page.locator('#add-to-cart-button-28').click();
    await page.getByRole('link', { name: 'Shopping cart (2)' }).click();

    const computerRow = page.locator('tr.cart-item-row', { hasText: 'Build your own expensive computer' });
    const qtyInput = computerRow.locator('input.qty-input');

    await qtyInput.fill('2');
    await page.getByRole('button', { name: 'Update shopping cart' }).click();

    const unitPrice = await computerRow.locator('.product-unit-price').innerText();
    const subtotal = await computerRow.locator('.product-subtotal').innerText();

    expect(parseFloat(subtotal)).toBe(parseFloat(unitPrice) * 2);

    await page.getByRole('row', { name: 'Picture of Blue and green' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Update shopping cart' }).click();

    await expect(page.locator('tr.cart-item-row', { hasText: 'Blue and green' })).not.toBeVisible();
});