import { test } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SwagLabs } from '@pages/SwagLabs';

test.describe('Test Scenarios for Swag Labs @SwagLabsTestSuite', () => {

    test('[@AddItemsAndCheckout]TC001 - Add Items to Cart and Checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const swagLabs = new SwagLabs(page);

        await loginPage.loginWithPersona("stduser");
        console.log('Logged in successfully');

        await swagLabs.addProductToCart("Backpack");
        console.log('Added Sauce Labs Backpack to cart');

        await swagLabs.clickOnBackToProducts();
        console.log('Clicked back to products');
        
        await swagLabs.addProductToCart("Bike Light");
        console.log('Added Sauce Labs Bike Light to cart');

        await swagLabs.clickOnBackToProducts();
        console.log('Clicked back to products');

        await swagLabs.verifyShoppingCartBadgeCount();
        console.log('Verified shopping cart badge count is equal to number of Products Added to Cart');

        await swagLabs.clickOnShoppingCart();
        console.log('Clicked on shopping cart');

        await swagLabs.verifyProductVisibilityInShoppingCart();
        console.log('Verified Products added to cart are visible in shopping cart');

        await swagLabs.checkOut('Ashay', 'Zemse', '400042');
        console.log('User has checked out successfully');

        await swagLabs.verifyTotalPrice();
        console.log('Verified total price is correct');
    });
});