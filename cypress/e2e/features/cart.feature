# cypress/e2e/features/cart.feature
# BDD Cucumber - سيناريوهات السلة

Feature: Shopping Cart
  As a logged-in user
  I want to manage my shopping cart
  So that I can purchase products

  Background:
    Given I am on the home page

  Scenario: TC07 - Add product to cart
    Given I am logged in via API
    When I search for "hammer"
    And I click on the first product card
    And I click add to cart
    Then the cart icon should be visible in the navbar

  Scenario: TC08 - Open cart page
    Given I have added an item to the cart
    When I click on the cart icon
    Then I should be on the cart page
    And I should see "Cart" on the page

  Scenario: TC09 - Continue shopping from cart
    Given I have added an item to the cart
    When I click on the cart icon
    And I continue shopping
    Then I should not be on the cart page
