# cypress/e2e/features/products.feature
# BDD Cucumber - سيناريوهات المنتجات والبحث

Feature: Product Search and Navigation
  As a visitor
  I want to search for products and view details
  So that I can find what I need

  Background:
    Given I am on the home page

  Scenario: TC01 - Home page loads correctly
    Then the page URL should include "practicesoftwaretesting"
    And the sign in button should exist

  Scenario: TC05 - Search for a valid product
    When I search for "hammer"
    Then I should see product cards on the page

  Scenario: TC06 - View product details
    When I search for "hammer"
    And I click on the first product card
    Then I should be on a product detail page
    And the add to cart button should be visible

  Scenario: TC10 - Search with invalid term shows no results
    When I search for "xyz123"
    Then I should see "no products found" message

  Scenario: TC11 - Navbar elements are visible
    Then the sign in button should be visible in the navbar

  Scenario: TC12 - Product cards are loaded on home page
    Then I should see product cards on the page

  Scenario: TC13 - Open product from product list
    When I click on the first product card
    Then the URL should match product or home path
