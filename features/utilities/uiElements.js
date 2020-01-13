const { By } = require('selenium-webdriver');

const uiElements = {};

uiElements.myProjects = By.xpath("//span[contains(text(), 'My Projects')]");
uiElements.contentLibrary = By.xpath("//a[contains(text(),\'Content Library\')]");
uiElements.searchInput = By.xpath("//input[@placeholder='Search']");
uiElements.projectName = By.xpath("//div[@class='CEProjectName-text CleanroomCustomEngagementLine-name']");
uiElements.documentLibrary = By.xpath("//*[@id=\"app\"]/div[1]/section/section/aside/div/div/ul/li[4]/a");
uiElements.newButtonDocLibrary = By.xpath("//button[@class='ant-btn ant-dropdown-trigger ant-btn-primary']");
uiElements.createFolderButtonDocLibrary = By.xpath("//li[contains(text(),'Create folder')]");
uiElements.folderNameTextArea = By.xpath("//div[@class='CreateFolderModal']//input[@class='ant-input']");
uiElements.createButton = By.xpath("//button[@class='ant-btn ant-btn-primary']");
uiElements.searchDocLibrary = By.xpath("//div[@class='DlSearch']//input[@class='ant-input']");
uiElements.folderName = By.xpath("//div[@class='DlDoclibSchemaProvider-filename']");
uiElements.checkboxDocLibrary = By.xpath("//input[@class='ant-checkbox-input']");
uiElements.actionsButtonDocLibrary = By.xpath("//button[@class='ant-btn DlSelectedNodesActions ant-dropdown-trigger']");
uiElements.deleteButtonDocLibrary = By.xpath("//li[contains(text(),'Delete')]");
uiElements.popupConfirmButton = By.xpath("//div[@class='ant-modal-confirm-btns']//button[@class='ant-btn ant-btn-primary']");
uiElements.recycleBinDocLibrary = By.xpath("//div[contains(text(),'Recycle bin')]");

module.exports = uiElements;