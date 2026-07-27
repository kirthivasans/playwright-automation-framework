import {test, expect} from '@playwright/test';
const testData = require('../data/testData.js');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');

test('Login validation - POM', async({page}) => {
    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.login('testData.validUser.username', 'testData.validUser.password');
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.addToCart('add-to-cart-sauce-labs-bike-light');
    
    const count = await inventoryPage.getCartCount();
    expect(count).toBe('2');

    await inventoryPage.cartLink.click();

    const cartPage = new CartPage(page);
    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
});