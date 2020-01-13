const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const { driver } = require('../utilities/driver');
const { click, sendKeys, sendEnter, text, wait, clear, sleepDriver, WAIT, BY } = require('../utilities/driver-util');
const { By, Key, until } = require('selenium-webdriver');
const { sconfig } = require('../utilities/config');
const assert = require('assert');
const uiElements = require('../utilities/uiElements');
setDefaultTimeout(60 * 1000);

Given("I login to CleanRoom Dev", async function () {
    await driver.get(sconfig.projectUrlDev);
    await wait(uiElements.myProjects);
});

When("I check projects on home page", async function () {
    await click(uiElements.searchInput);
    await sendKeys(uiElements.searchInput, "ONYp4");
    await sleepDriver(WAIT.UNIT1);
    await sendEnter(uiElements.searchInput);
    await sleepDriver(WAIT.UNIT1);
});

Then("I am able to access them", async function () {
    let projectName = await text(uiElements.projectName);
    console.log("project name: "+ projectName);
    await assert(projectName);
    await assert.notStrictEqual(projectName, 'ONYp4');
    await sleepDriver(WAIT.UNIT2);

    driver.quit();
});