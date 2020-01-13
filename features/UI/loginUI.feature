Feature: Login cleanroom

  @ui
  Scenario: Login to Cleanroom Dev Application
    Given I login to CleanRoom Dev
    When I check projects on home page
    Then I am able to access them