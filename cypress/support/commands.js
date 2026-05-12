// cypress/support/commands.js
// Custom Commands - المشروع الثاني

// ============================================================
// Navigation Commands
// ============================================================

Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/', { failOnStatusCode: false });
});

Cypress.Commands.add('goToLoginPage', () => {
  cy.get('[data-test="nav-sign-in"]', { timeout: 10000 })
    .should('be.visible')
    .click();
});

// ============================================================
// Authentication Commands
// ============================================================

Cypress.Commands.add('performLogin', (email, password) => {
  if (!email || !password) throw new Error('Email or password is undefined!');
  cy.get('[data-test="email"]').should('be.visible').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add('loginWithFixture', () => {
  cy.fixture('user').then((userData) => {
    cy.goToLoginPage();
    cy.performLogin(userData.validUser.email, userData.validUser.password);
  });
});

Cypress.Commands.add('loginViaApi', () => {
  cy.fixture('user').then((userData) => {
    cy.request('POST', 'https://api.practicesoftwaretesting.com/users/login', {
      email: userData.validUser.email,
      password: userData.validUser.password
    }).then((res) => {
      const token = res.body.access_token;
      cy.intercept('**', (req) => {
        req.headers['Authorization'] = `Bearer ${token}`;
      });
      cy.visit('/', { failOnStatusCode: false });
    });
  });
});

Cypress.Commands.add('logout', () => {
  cy.contains('Jane Doe').click();
  cy.contains('Sign out').click();
});

// ============================================================
// Product Commands
// ============================================================

Cypress.Commands.add('searchProduct', (query) => {
  if (!query) throw new Error('Search query is undefined!');
  cy.intercept('GET', '**/products/search*').as('searchApi');
  cy.get('[data-test="search-query"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(query + '{enter}');
  cy.wait('@searchApi');
});

Cypress.Commands.add('openFirstProductCard', () => {
  cy.get('.card', { timeout: 10000 }).should('have.length.greaterThan', 0);
  cy.get('.card').first().click();
});

Cypress.Commands.add('addItemToCart', () => {
  cy.get('[data-test="add-to-cart"]', { timeout: 10000 }).should('be.visible').click();
});

Cypress.Commands.add('viewCart', () => {
  cy.get('[data-test="nav-cart"]', { timeout: 10000 }).should('be.visible').click();
});

// ============================================================
// Flow Commands (combined steps)
// ============================================================

Cypress.Commands.add('addItemToCartFlow', () => {
  cy.loginViaApi();
  cy.searchProduct('hammer');
  cy.openFirstProductCard();
  cy.addItemToCart();
});

// ============================================================
// Custom Assertions
// ============================================================

Cypress.Commands.add('assertPageTitle', (title) => {
  cy.title().should('include', title);
});

Cypress.Commands.add('assertUrlContains', (segment) => {
  cy.url().should('include', segment);
});

Cypress.Commands.add('assertElementVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

Cypress.Commands.add('assertTextVisible', (text) => {
  cy.contains(text).should('be.visible');
});
