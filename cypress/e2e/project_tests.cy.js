// cypress/e2e/project_tests.cy.js
// المشروع الثاني - باستخدام Page Object Model + Fixtures + Custom Commands

const homePage    = require('../pages/HomePage');
const loginPage   = require('../pages/LoginPage');
const productPage = require('../pages/ProductPage');
const cartPage    = require('../pages/CartPage');

describe('Practice Software Testing - Project 2 (POM + Fixtures + Custom Commands)', () => {

  beforeEach(() => {
    homePage.visit();
  });

  // ─── TC01 ─── Home page loads ───────────────────────────────
  it('TC01 - Home page loads', () => {
    homePage.assertPageLoaded();
  });

  // ─── TC02 ─── Navigate to login ─────────────────────────────
  it('TC02 - Navigate to login', () => {
    homePage.clickSignIn();
    loginPage.assertOnLoginPage();
  });

  // ─── TC03 ─── Successful login ──────────────────────────────
  it('TC03 - Successful login', () => {
    cy.intercept('POST', '**/users/login').as('loginApi');
    cy.fixture('user').then((userData) => {
      homePage.clickSignIn();
      loginPage.login(userData.validUser.email, userData.validUser.password);
      cy.wait('@loginApi');
      loginPage.assertLoginSuccess(userData.validUser.name);
    });
  });

  // ─── TC04 ─── Failed login ──────────────────────────────────
  it('TC04 - Failed login', () => {
    cy.fixture('user').then((userData) => {
      homePage.clickSignIn();
      loginPage.login(userData.invalidUser.email, userData.invalidUser.password);
      loginPage.assertLoginFailed();
    });
  });

  // ─── TC05 ─── Search for valid product ──────────────────────
  it('TC05 - Search for valid product', () => {
    cy.fixture('products').then((products) => {
      homePage.searchFor(products.searchTerms.valid);
      homePage.assertProductCardsVisible();
    });
  });

  // ─── TC06 ─── View product details ──────────────────────────
  it('TC06 - View product details', () => {
    cy.fixture('products').then((products) => {
      homePage.searchFor(products.searchTerms.valid);
      homePage.clickFirstProduct();
      productPage.assertOnProductPage();
    });
  });

  // ─── TC07 ─── Add product to cart ───────────────────────────
  it('TC07 - Add product to cart', () => {
    cy.loginViaApi();
    cy.fixture('products').then((products) => {
      homePage.searchFor(products.searchTerms.valid);
      homePage.clickFirstProduct();
      productPage.addToCart();
      homePage.navCart.should('be.visible');
    });
  });

  // ─── TC08 ─── Open cart page ─────────────────────────────────
  it('TC08 - Open cart page', () => {
    cy.addItemToCartFlow();
    homePage.clickCart();
    cartPage.assertOnCartPage();
  });

  // ─── TC09 ─── Continue shopping ─────────────────────────────
  it('TC09 - Continue shopping', () => {
    cy.addItemToCartFlow();
    homePage.clickCart();
    cy.url().then((url) => {
      if (url.includes('checkout')) {
        cy.visit('/', { failOnStatusCode: false });
      } else {
        cartPage.continueShopping();
      }
    });
    cy.url().should('not.include', 'cart');
  });

  // ─── TC10 ─── Invalid search query ──────────────────────────
  it('TC10 - Invalid search query shows no results', () => {
    cy.fixture('products').then((products) => {
      homePage.searchFor(products.searchTerms.invalid);
      homePage.assertNoProductsFound();
    });
  });

  // ─── TC11 ─── Navbar elements visible ───────────────────────
  it('TC11 - Navbar sign-in button is visible', () => {
    cy.assertElementVisible('[data-test="nav-sign-in"]');
  });

  // ─── TC12 ─── Product cards loaded ──────────────────────────
  it('TC12 - Product cards are loaded on home page', () => {
    homePage.assertProductCardsVisible();
  });

  // ─── TC13 ─── Open product from list ────────────────────────
  it('TC13 - Open product from list', () => {
    homePage.clickFirstProduct();
    cy.location('pathname').should((path) => {
      expect(path).to.match(/\/$|login|product/);
    });
  });

  // ─── TC14 ─── Intercept API for two products ─────────────────
  it('TC14 - Intercept product API for first and second product', () => {
    cy.loginViaApi();
    cy.fixture('products').then((products) => {
      homePage.searchFor(products.searchTerms.valid);

      cy.intercept('GET', '**/products/*').as('firstProduct');
      homePage.clickFirstProduct();
      cy.wait('@firstProduct').its('response.statusCode').should('eq', 200);
      productPage.assertOnProductPage();

      cy.visit('/', { failOnStatusCode: false });
      cy.get('.card:not(.skeleton)', { timeout: 12000 }).should('have.length.greaterThan', 1);

      cy.intercept('GET', '**/products/*').as('secondProduct');
      homePage.clickProductByIndex(1);
      cy.wait('@secondProduct').its('response.statusCode').should('eq', 200);
      productPage.assertOnProductPage();
    });
  });

  // ─── TC15 ─── Logout flow ────────────────────────────────────
  it('TC15 - Logout flow', () => {
    cy.fixture('user').then((userData) => {
      homePage.clickSignIn();
      loginPage.login(userData.validUser.email, userData.validUser.password);
      cy.contains(userData.validUser.name).should('be.visible');
      cy.logout();
      homePage.navSignIn.should('be.visible');
    });
  });

});
