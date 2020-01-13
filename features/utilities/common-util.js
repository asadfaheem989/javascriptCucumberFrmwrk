var fs = require('fs');
//var fsExtra = require('fs-extra');

const UTIL = {};
UTIL.FILE_TYPE = {
    CSV: "CSV",
    PDF: "PDF",
    XLS: "XLS",
    IMG: "IMG",
    MP3: "MP3",
    MPG: "MPG"
};

UTIL.FILE_TPL = {
    Example_Xls: "Example_Xls.xlsx",
    Example_Image: "Example_Image.png",
    Example_PDF: "Example_PDF.pdf",
    Example_Audio: "Example_Audio.mp3"
};

UTIL.ele = function (cssSelector) {
    const ele = document.querySelector(cssSelector);
    console.log('cssSelector', cssSelector, ele)
    return ele;
};

UTIL.getFileName = function (_filename) {
    var path = require('path');
    var scriptName = path.basename(_filename);
    return scriptName;
};

UTIL.randomStr = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

UTIL.uploadPath = function (filename) {
    return `${process.cwd()}/stests/uploads/${filename}`
};

UTIL.dynamicUploadPath = function (filename) {
    return `${process.cwd()}/stests/uploads_dynamic/${filename}`
};

UTIL.reportPath = function (filename) {
    return `${process.cwd()}/mochawesome-report/${filename}`
};

UTIL.createTestFile = async function (param = { fileType: UTIL.FILE_TYPE.CSV, dataToWrite: "", srcFileName: "" }) {
    let destFileName = "";
    switch (param.fileType) {
        case "CSV":
            param.dataToWrite = `id,	Animal,	State,	Visits
                1,	Mountain goat	,California	, Weekly
                2,	Deer black-tailed	,New Jersey, Daily	
              `;
            destFileName = "sampleFile" + UTIL.randomStr(4) + ".csv";
            return await UTIL.createFile(param.dataToWrite, destFileName);
        case "PDF":
            destFileName = "samplePDF" + UTIL.randomStr(4) + ".pdf";
            return await UTIL.copyFile(param.srcFileName, destFileName);
        case "XLS":
            destFileName = "sampleXLS" + UTIL.randomStr(4) + ".xlsx";
            return await UTIL.copyFile(param.srcFileName, destFileName);
        case "IMG":
            destFileName = "sampleIMG" + UTIL.randomStr(4) + ".png";
            return await UTIL.copyFile(param.srcFileName, destFileName);
        case "MP3":
            destFileName = "sampleMP3" + UTIL.randomStr(4) + ".mp3";
            return await UTIL.copyFile(param.srcFileName, destFileName);
        case "MPG":
            destFileName = "sampleMPG" + UTIL.randomStr(4) + ".mpg";
            return await UTIL.copyFile(param.srcFileName, destFileName);
        case "TXT":
            param.dataToWrite = `test data`;
            destFileName = "sampleTXT" + UTIL.randomStr(4) + ".txt";
            return await UTIL.createFile(param.dataToWrite, destFileName);
    }

};

UTIL.createTestWorkPaper = async function (param = { fileType: UTIL.FILE_TYPE.CSV, dataToWrite: "", srcFileName: "" }) {
    let destFileName = "";
    param.dataToWrite = `Birth date,President,President Number,Terms,Description,Height,Is Tall
    February 12 1809,Abraham Lincoln,16,2,Lincoln led the nation through the American Civil War its bloodiest war and its greatest moral constitutional and political crisis,76,TRUE
    November 19 1831,James A. Garfield,20,1,He was the first Adminstrator of Congress to be elected to the presidency and remains the only sitting House member to gain the White House,72,TRUE
    October 30 1735,John Adams,,1,John Adams was an American statesman Executive diplomat writer and Founding Father who served as the second president of the United States from 1797 to 1801,67,FALSE
    April 04 1995,Harry S. Truman,33,2,The 33rd president of the United States from 1945 to 1953 succeeding upon the death of Franklin D. Roosevelt after serving as vice president. He implemented the Marshall Plan to rebuild the economy of Western Europe and established the Truman Doctrine and NATO,69,FALSE`;
    destFileName = "sampleFile" + UTIL.randomStr(4) + ".csv";
    return await UTIL.createFile(param.dataToWrite, destFileName);
};

UTIL.updateTestFile = async function (fileName) {
    const dataToWrite = `id,	Animal,	State,	Visits
    1,	Mountain goat	,California	, Weekly
    2,	Deer black-tailed	,New Jersey, Daily	
    3,	Kangaroo brush-tailed rat	,Tennessee, Once
  `;
    return await UTIL.createFile(dataToWrite, fileName);
};

UTIL.createFile = function (dataToWrite, fileName) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(UTIL.dynamicUploadPath(fileName), dataToWrite, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
                reject({ "message": `File write failed! ${JSON.stringify(err)}` })
            } else {
                console.log('It\'s saved!');
                resolve(fileName);
            }
        });
    });
};

UTIL.clearFolders = function () {
    UTIL.clearDynamicUploadsFolder();
    UTIL.clearReportsFolder();
};

UTIL.clearDynamicUploadsFolder = function () {
    UTIL.deleteAllFiles(`${process.cwd()}/stests/uploads_dynamic/`);
};

UTIL.clearReportsFolder = function () {
    UTIL.deleteAllFiles(`${process.cwd()}/mochawesome-report/`);
};

UTIL.copyFile = function (srcFileName, destFileName) {
    return new Promise(function (resolve, reject) {
        const src = UTIL.uploadPath(srcFileName);
        const dest = UTIL.dynamicUploadPath(destFileName);
        fs.copyFile(src, dest, (err) => {
            if (err) throw err;
            console.log(`${src} was copied to ${dest}`);
            resolve(destFileName);

        });
    });
};

UTIL.deleteFile = function (filePath) {
    fs.unlinkSync(filePath);
};

// UTIL.deleteAllFiles = function (fileDir) {
//     fsExtra.emptyDirSync(fileDir)
// };

module.exports = UTIL;

