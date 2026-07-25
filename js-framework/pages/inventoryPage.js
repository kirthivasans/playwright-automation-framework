class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }
    
    async addToCart(addToCartId) {
        await this.page.locator(`[data-test="${addToCartId}"]`).click();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }
}

module.exports = InventoryPage;