# Project 2 - Cypress Advanced Testing

## 🚀 المشروع الثاني - Cypress مع POM + BDD + CI/CD

### 📁 هيكل المشروع

```
project2/
├── .github/
│   └── workflows/
│       └── cypress-ci.yml          ← CI/CD Pipeline
├── cypress/
│   ├── e2e/
│   │   ├── project_tests.cy.js     ← 15 Test Cases (POM)
│   │   ├── features/
│   │   │   ├── authentication.feature
│   │   │   ├── products.feature
│   │   │   └── cart.feature
│   │   └── step_definitions/
│   │       └── common.steps.js
│   ├── fixtures/
│   │   ├── user.json               ← بيانات المستخدمين
│   │   └── products.json           ← بيانات المنتجات
│   ├── pages/                      ← Page Object Models
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── ProductPage.js
│   │   └── CartPage.js
│   └── support/
│       ├── commands.js             ← Custom Commands
│       └── e2e.js
├── cypress.config.js
└── package.json
```

### ▶️ تشغيل المشروع

```bash
# تثبيت الـ packages
npm install

# تشغيل كل الـ tests
npm test

# تشغيل الـ E2E tests فقط
npm run test:e2e

# تشغيل الـ BDD Cucumber tests فقط
npm run test:cucumber

# فتح Cypress UI
npm run test:headed
```

### 🔧 المتطلبات

- Node.js v18+
- npm

### ✅ الـ 15 Test Cases

| TC  | الوصف | النوع |
|-----|-------|-------|
| TC01 | Home page loads | POM + BDD |
| TC02 | Navigate to login | POM + BDD |
| TC03 | Successful login | POM + BDD + Fixture |
| TC04 | Failed login | POM + BDD + Fixture |
| TC05 | Search valid product | POM + BDD + Fixture |
| TC06 | View product details | POM + BDD |
| TC07 | Add product to cart | POM + BDD + API |
| TC08 | Open cart page | POM + BDD |
| TC09 | Continue shopping | POM + BDD |
| TC10 | Invalid search | POM + BDD + Fixture |
| TC11 | Navbar visible | POM + BDD |
| TC12 | Product cards loaded | POM + BDD |
| TC13 | Open product from list | POM + BDD |
| TC14 | API intercept | POM + Intercept |
| TC15 | Logout flow | POM + BDD + Custom Command |
