// cypress/pages/ProductPage.js
// Page Object Model - صفحة المنتج

class ProductPage {
  // Selectors
  get addToCartBtn()  { return cy.get('[data-test="add-to-cart"]'); }
  get productTitle()  { return cy.get('[data-test="product-name"]'); }
  get productPrice()  { return cy.get('[data-test="unit-price"]'); }
  get quantity()      { return cy.get('[data-test="quantity"]'); }

  // Actions
  addToCart() {
    this.addToCartBtn.should('be.visible').click();
  }

  increaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      cy.get('[data-test="increase-quantity"]').click();
    }
  }

  // Assertions
  assertOnProductPage() {
    cy.url().should('include', 'product');
    this.addToCartBtn.should('be.visible');
  }

  assertAddToCartVisible() {
    this.addToCartBtn.should('be.visible');
  }
}

module.exports = new ProductPage();
