import {test, expect} from '@playwright/test';

test('Add item to cart and verify price', async({page})=> {
    await page.goto("https://www.saucedemo.com/")
    
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('[data-test="inventory-item-name"]').click();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
});