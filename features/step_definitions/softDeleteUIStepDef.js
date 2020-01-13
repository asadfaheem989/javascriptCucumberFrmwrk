const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const { driver } = require('../utilities/driver');
const Util = require('../utilities/common-util');
const { click, sendKeys, sendEnter, text, wait, clear, sleepDriver, WAIT, BY } = require('../utilities/driver-util');
const { By, Key, until } = require('selenium-webdriver');
const { sconfig } = require('../utilities/config');
const assert = require('assert');
const uiElements = require('../utilities/uiElements');
setDefaultTimeout(60 * 1000);

const folderName = "TestFolder" + Util.randomStr(4);

When("I create a folder in Document Library of the Project", async function () {
    await click(uiElements.searchInput);
    await sendKeys(uiElements.searchInput, "ONYp4");
    await sendEnter(uiElements.searchInput);

    await click(uiElements.projectName);
    await wait(uiElements.documentLibrary);
    await click(uiElements.documentLibrary);
    await wait(uiElements.newButtonDocLibrary);
    await sleepDriver(WAIT.UNIT10);
    await click(uiElements.newButtonDocLibrary);
    await sleepDriver(WAIT.UNIT2);
    await wait(uiElements.createFolderButtonDocLibrary);
    await click(uiElements.createFolderButtonDocLibrary);
    await wait(uiElements.folderNameTextArea);
    await sendKeys(uiElements.folderNameTextArea, folderName);
    await click(uiElements.createButton);
    await sleepDriver(WAIT.UNIT5);
});

Then("I am able to delete the folder successfully", async function () {
    await sendKeys(uiElements.searchDocLibrary, folderName);
    await sendEnter(uiElements.searchDocLibrary);
    await sleepDriver(WAIT.UNIT3);

    let folderNameSearched = await text(uiElements.folderName);
    assert.equal(folderName, folderNameSearched);

    await click(uiElements.checkboxDocLibrary);
    await wait(uiElements.actionsButtonDocLibrary);
    await click(uiElements.actionsButtonDocLibrary);
    await wait(uiElements.deleteButtonDocLibrary);
    await click(uiElements.deleteButtonDocLibrary);
    await wait(uiElements.popupConfirmButton);
    await click(uiElements.popupConfirmButton);
    await sleepDriver(WAIT.UNIT5);
    await click(uiElements.recycleBinDocLibrary);

    await sendKeys(uiElements.searchDocLibrary, folderName);
    await sendEnter(uiElements.searchDocLibrary);
    await sleepDriver(WAIT.UNIT3);

    let folderNameSearchedRecylebin = await text(uiElements.folderName);
    assert.equal(folderName, folderNameSearchedRecylebin);

    driver.quit();
});