// cypress/e2e/step_definitions/common.steps.js
// الخطوات المشتركة بين كل الـ features

const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const homePage    = require('../../pages/HomePage');
const loginPage   = require('../../pages/LoginPage');
const productPage = require('../../pages/ProductPage');
const cartPage    = require('../../pages/CartPage');

// ─── Given ───────────────────────────────────────────────────

Given('I am on the home page', () => {
  homePage.visit();
});

Given('I have valid user credentials', () => {
  cy.fixture('user').as('userData');
});

Given('I am logged in with valid credentials', () => {
  homePage.clickSignIn();
  cy.fixture('user').then((userData) => {
    loginPage.login(userData.validUser.email, userData.validUser.password);
    cy.contains(userData.validUser.name).should('be.visible');
  });
});

Given('I am logged in via API', () => {
  cy.loginViaApi();
});

Given('I have added an item to the cart', () => {
  cy.addItemToCartFlow();
});

// ─── When ────────────────────────────────────────────────────

When('I click on the sign in button', () => {
  homePage.clickSignIn();
});

When('I enter valid login credentials', () => {
  cy.fixture('user').then((userData) => {
    loginPage.fillEmail(userData.validUser.email);
    loginPage.fillPassword(userData.validUser.password);
  });
});

When('I enter invalid email {string}', (email) => {
  loginPage.fillEmail(email);
});

When('I enter invalid password {string}', (password) => {
  loginPage.fillPassword(password);
});

When('I submit the login form', () => {
  loginPage.submit();
});

When('I search for {string}', (term) => {
  homePage.searchFor(term);
});

When('I click on the first product card', () => {
  homePage.clickFirstProduct();
});

When('I click add to cart', () => {
  productPage.addToCart();
});

When('I click on the cart icon', () => {
  homePage.clickCart();
});

When('I click on my account name', () => {
  cy.fixture('user').then((userData) => {
    cy.contains(userData.validUser.name).click();
  });
});

When('I click on sign out', () => {
  cy.contains('Sign out').click();
});

When('I continue shopping', () => {
  cy.url().then((url) => {
    if (url.includes('checkout')) {
      cy.visit('/', { failOnStatusCode: false });
    } else {
      cartPage.continueShopping();
    }
  });
});

// ─── Then ─────────────────────────────────────────────────────

Then('I should be on the login page', () => {
  loginPage.assertOnLoginPage();
});

Then('the email field should be visible', () => {
  loginPage.emailInput.should('be.visible');
});

Then('I should be logged in successfully', () => {
  cy.url().should('not.include', 'login');
});

Then('I should see {string} on the page', (text) => {
  cy.contains(text).should('be.visible');
});

Then('I should remain on the login page', () => {
  cy.url().should('include', 'login');
});

Then('I should see an error message containing {string}', (msg) => {
  cy.contains(msg).should('exist');
});

Then('I should see the sign in button', () => {
  homePage.navSignIn.should('be.visible');
});

Then('the page URL should include {string}', (segment) => {
  cy.url().should('include', segment);
});

Then('the sign in button should exist', () => {
  homePage.navSignIn.should('exist');
});

Then('I should see product cards on the page', () => {
  homePage.assertProductCardsVisible();
});

Then('I should be on a product detail page', () => {
  productPage.assertOnProductPage();
});

Then('the add to cart button should be visible', () => {
  productPage.assertAddToCartVisible();
});

Then('I should see {string} message', (msg) => {
  cy.get('body').should('contain.text', msg);
});

Then('the sign in button should be visible in the navbar', () => {
  homePage.navSignIn.should('be.visible');
});

Then('the URL should match product or home path', () => {
  cy.location('pathname').should((path) => {
    expect(path).to.match(/\/$|login|product/);
  });
});

Then('the cart icon should be visible in the navbar', () => {
  homePage.navCart.should('be.visible');
});

Then('I should be on the cart page', () => {
  cartPage.assertOnCartPage();
});

Then('I should not be on the cart page', () => {
  cy.url().should('not.include', 'cart');
});
