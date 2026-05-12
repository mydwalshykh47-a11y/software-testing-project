// cypress/support/e2e.js
import './commands';

// Global before each - تنظيف الـ cookies قبل كل test
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
