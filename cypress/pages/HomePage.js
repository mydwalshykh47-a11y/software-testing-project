// cypress/pages/HomePage.js
// Page Object Model - الصفحة الرئيسية

class HomePage {
  // Selectors
  get navSignIn()      { return cy.get('[data-test="nav-sign-in"]'); }
  get navCart()        { return cy.get('[data-test="nav-cart"]'); }
  get searchInput()    { return cy.get('[data-test="search-query"]'); }
  get productCards()   { return cy.get('.card'); }
  get logo()           { return cy.get('.navbar-brand'); }

  // Actions
  visit() {
    cy.visit('/', { failOnStatusCode: false });
  }

  clickSignIn() {
    this.navSignIn.should('be.visible').click();
  }

  clickCart() {
    this.navCart.should('be.visible').click();
  }

  searchFor(term) {
    cy.intercept('GET', '**/products/search*').as('searchApi');
    this.searchInput
      .should('be.visible')
      .clear()
      .type(term + '{enter}');
    cy.wait('@searchApi');
  }

  clickFirstProduct() {
    this.productCards.should('have.length.greaterThan', 0);
    this.productCards.first().click();
  }

  clickProductByIndex(index) {
    this.productCards.eq(index).click();
  }

  // Assertions
  assertPageLoaded() {
    cy.url().should('include', 'practicesoftwaretesting');
    this.navSignIn.should('exist');
  }

  assertProductCardsVisible() {
    this.productCards.should('have.length.greaterThan', 0);
  }

  assertNoProductsFound() {
    cy.get('body').should('contain.text', 'no products found');
  }
}

module.exports = new HomePage();
