# cypress/e2e/features/authentication.feature
# BDD Cucumber - سيناريوهات تسجيل الدخول

Feature: User Authentication
  As a user of Practice Software Testing
  I want to be able to login and logout
  So that I can access my account

  Background:
    Given I am on the home page

  Scenario: TC02 - Navigate to login page
    When I click on the sign in button
    Then I should be on the login page
    And the email field should be visible

  Scenario: TC03 - Successful login with valid credentials
    Given I have valid user credentials
    When I click on the sign in button
    And I enter valid login credentials
    And I submit the login form
    Then I should be logged in successfully
    And I should see "Jane Doe" on the page

  Scenario: TC04 - Failed login with invalid credentials
    When I click on the sign in button
    And I enter invalid email "wrong@test.com"
    And I enter invalid password "123456"
    And I submit the login form
    Then I should remain on the login page
    And I should see an error message containing "Invalid"

  Scenario: TC15 - Logout flow
    Given I am logged in with valid credentials
    When I click on my account name
    And I click on sign out
    Then I should see the sign in button
