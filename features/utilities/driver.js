const { sconfig } = require('./config');
const { By, Key, until } = require('selenium-webdriver');
const path = require('path');
const fs = require('fs');

const encodeExt = file => {
    const stream = fs.readFileSync(path.resolve(file));
    return Buffer.from(stream).toString('base64');
};

const chrome = () => {
    const webdriver = require('selenium-webdriver');
    require('chromedriver');
    const chrome = require('selenium-webdriver/chrome');

    const screen = {
        width: 2040,
        height: 1080
    };

    let option = new chrome.Options();
    //option.addExtensions(encodeExt('./browserplugins/chrome-ext.crx'));
    // Ignore SSL error
    //option.addArguments('--ignore-certificate-errors');

    // if (sconfig.shouldUseProxy) {
    //     option.windowSize({width: 2000, height: 1000}).addArguments(`--proxy-server=http://${sconfig.proxyAddress}`)
    // }
    if (sconfig.goHeadLess) {
        option.headless().windowSize(screen);
        //.addArguments('--headless');
    }

    let driver = null;
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .setChromeOptions(option)
        .forBrowser('chrome')
        .build();

    return driver;
};

module.exports.driver = chrome();