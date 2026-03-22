import { Page, Locator, expect } from '@playwright/test';

export class SwagLabs {

    readonly page: Page;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly productLink: String;
    readonly backToProductsLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly subTotalLabel: Locator;
    readonly taxLabel: Locator
    readonly priceTotalLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.productPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
        this.removeButton = this.page.locator('[data-test="remove"]');
        this.productLink = "//div[text()='Sauce Labs %s']";
        this.backToProductsLink = this.page.locator('[data-test="back-to-products"]');
        this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]')
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.subTotalLabel = this.page.locator('[data-test="subtotal-label"]');
        this.taxLabel = this.page.locator('[data-test="tax-label"]');
        this.priceTotalLabel = this.page.locator('[data-test="total-label"]');
    }

    private prices: number[] = [];
    private productsAddedToCart: string[] = [];
    async addProductToCart(productName: string) {
        let productLink = await this.page.locator(this.productLink.replace('%s', productName));
        await productLink.click();

        this.productsAddedToCart.push(productName);

        let priceText = await this.productPrice.allTextContents();
        this.prices.push(Number(priceText[0].replace(/[^0-9.]/g, '')));
        console.log(this.prices);

        await this.addToCartButton.click();
        await expect(this.removeButton).toBeVisible();
        await expect(this.removeButton).toHaveText('Remove');
    }

    async clickOnBackToProducts() {
        await this.backToProductsLink.click();
    }

    async verifyShoppingCartBadgeCount(){
        await expect(this.shoppingCartBadge).toHaveText(String(this.prices.length));
    }

    async clickOnShoppingCart(){
        await this.shoppingCartLink.click();
    }

    async verifyProductVisibilityInShoppingCart(){
        for(let product of this.productsAddedToCart){
            let productLink = await this.page.locator(this.productLink.replace('%s', product));
            await expect.soft(productLink).toBeVisible();
        }
    }

    async checkOut(firstName:string, lastName:string, postalCode:string){
        await this.checkoutButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async verifyTotalPrice(){
    let expectedTotal = 0;
        for (const price of this.prices) {
        expectedTotal += price;
        }
        await expect(this.subTotalLabel).toContainText(expectedTotal.toFixed(2)); //For decimal formatting till 2 places
        let taxText = await this.taxLabel.allTextContents();
        let taxAmount = Number(taxText[0].replace('Tax: $', ''));
        let expectedPriceTotal = expectedTotal + taxAmount;
        await expect(this.priceTotalLabel).toContainText(expectedPriceTotal.toFixed(2));
    }
}