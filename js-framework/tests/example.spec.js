import {test, expect} from '@playwright/test';

test('Add item to cart and verify price', async({page})=> {
    await page.goto("https://www.saucedemo.com/")
    
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    const cart = [
        {name: 'Sauce Labs Backpack', addToCartId: 'add-to-cart-sauce-labs-backpack', price: '$29.99'},
        {name: 'Sauce Labs Bike Light', addToCartId: 'add-to-cart-sauce-labs-bike-light', price: '$9.99'}
    ]

    for (const carts of cart) {
        await page.locator(`[data-test="${carts.addToCartId}"]`).click();
    }



    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
});