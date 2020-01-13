Feature: API: Tag Group

  @13685 @API-Test
  Scenario: Create Tag Group using API
    Given I initiated Tag Group API
    When I send a request to create Tag Group API
    Then I validate that new Tag Group is Created