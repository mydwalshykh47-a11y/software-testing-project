

class CartPage {
  // Selectors
  get cartItems()         { return cy.get('[data-test="cart-item"]'); }
  get continueShoppingBtn() { return cy.contains('Continue shopping'); }
  get proceedCheckoutBtn()  { return cy.contains('Proceed to checkout'); }
  get cartTotal()         { return cy.get('[data-test="cart-total"]'); }

  // Actions
  continueShopping() {
    this.continueShoppingBtn.should('be.visible').click();
  }

  proceedToCheckout() {
    this.proceedCheckoutBtn.should('be.visible').click();
  }

  // Assertions
  assertOnCartPage() {
    cy.url().should('match', /cart|checkout/);
    cy.contains('Cart').should('be.visible');
  }

  assertCartNotEmpty() {
    this.cartItems.should('have.length.greaterThan', 0);
  }
}

module.exports = new CartPage();
