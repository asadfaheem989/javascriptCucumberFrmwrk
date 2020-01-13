Feature: Request Tracking

  @API-Test
  Scenario: Create Request Tracking
    Given I initiated Request Tracking API
    When I run the create Request Tracking API
    Then I verify that new Request Tracking is Created