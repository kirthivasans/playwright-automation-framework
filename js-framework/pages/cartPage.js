class CartPage {
    constructor(page) {
        this.page = page;
        this.cartBadgeLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartItems = page.locator('[data-test="inventory-item-name"]');
        this.cartTitle = page.getByText('Your Cart', {exact: true});
    }

    async getItemCount() {
        return await this.cartItems.count();
    }
}
module.exports = CartPage;