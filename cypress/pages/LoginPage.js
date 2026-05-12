// cypress/pages/LoginPage.js
// Page Object Model - صفحة تسجيل الدخول

class LoginPage {
  // Selectors
  get emailInput()    { return cy.get('[data-test="email"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get submitBtn()     { return cy.get('[data-test="login-submit"]'); }
  get errorMsg()      { return cy.get('[data-test="login-error"]'); }

  // Actions
  visit() {
    cy.visit('/auth/login', { failOnStatusCode: false });
  }

  fillEmail(email) {
    this.emailInput.should('be.visible').clear().type(email);
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password);
  }

  submit() {
    this.submitBtn.click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  loginWithFixture() {
    cy.fixture('user').then((userData) => {
      this.login(userData.validUser.email, userData.validUser.password);
    });
  }

  loginViaApi() {
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
  }

  // Assertions
  assertOnLoginPage() {
    cy.url().should('include', 'login');
    this.emailInput.should('be.visible');
  }

  assertLoginFailed() {
    cy.url().should('include', 'login');
    cy.contains('Invalid').should('exist');
  }

  assertLoginSuccess(userName) {
    cy.url().should('not.include', 'login');
    if (userName) cy.contains(userName).should('be.visible');
  }
}

module.exports = new LoginPage();
