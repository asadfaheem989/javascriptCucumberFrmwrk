Feature: 11021 - Soft Delete

  @11021 @UI-Test
  Scenario: Soft Delete
    Given I login to CleanRoom Dev
    When I create a folder in Document Library of the Project
    Then I am able to delete the folder successfully