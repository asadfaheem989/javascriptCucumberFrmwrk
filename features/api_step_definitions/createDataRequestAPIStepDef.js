const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const got = require('got');
const assert = require('assert');
const { sconfig } = require('../utilities/config');
const Util = require('../utilities/common-util');

let url = "";
let createReqTracking = "proxy/bundle-service/taggroups";
let reqTrackName = "reqTrackName" + Util.randomStr(4);
let reqTrackDesc = "reqTrackDesc" + Util.randomStr(4);

Given("I initiated Request Tracking API", async function () {
    url = sconfig.cleanRoomDevURI + createReqTracking;
});

When("I run the create Request Tracking API", async function () {
    var data = {
        headers: { 'Content-Type': 'application/json', 'Authorization': sconfig.authToken },
        body: JSON.stringify(createReqTrackingBody())
    };

    console.log("Body of Data: "+data.body);
    jsonResponse = await got.post(url, data);
    await assert(jsonResponse.statusCode === 200);
});

Then("I verify that new Request Tracking is Created", async function () {
    let jsonRespBody = JSON.parse(jsonResponse.body);

    let requestTrackingNameSearched = jsonRespBody.name;
    let requestTrackingDescSearched = jsonRespBody.description;
    let requestTrackingStatusSearched = jsonRespBody.status;
    let requestTrackingTypeSearched = jsonRespBody.type;
    console.log("Request Tracking Name Searched: "+requestTrackingNameSearched);
    console.log("Request Tracking Description Searched: "+requestTrackingDescSearched);
    console.log("Request Tracking Status Searched: "+requestTrackingStatusSearched);
    console.log("Request Tracking Type Searched: "+requestTrackingTypeSearched);

    await assert(requestTrackingNameSearched);
    await assert(requestTrackingDescSearched);
    await assert(requestTrackingStatusSearched);
    await assert(requestTrackingTypeSearched);
    await assert.strictEqual(reqTrackName, requestTrackingNameSearched);
    await assert.strictEqual(reqTrackDesc, requestTrackingDescSearched);
    await assert.strictEqual("draft", requestTrackingStatusSearched);
    await assert.strictEqual("datarequest", requestTrackingTypeSearched);
});

var createReqTrackingBody = function () {
    var jsonReq = {};
    var endDateReq = {};
    jsonReq['name'] = reqTrackName;
    jsonReq['requestId'] = 1;
    endDateReq['start'] = 1577858400000;
    endDateReq['end'] =1579759200000;
    jsonReq['endDate'] = endDateReq;
    jsonReq['description'] = reqTrackDesc;
    jsonReq['status'] = "draft";
    jsonReq['type'] = "datarequest";
    jsonReq['engagementId'] = "8f408a4a-cb7c-42f9-ad25-538dae2c5b64";
    jsonReq['createdAt'] = 1578259990259;
    jsonReq['updatedAt'] = 1578259990259;
    jsonReq['_id'] = "1d924e96-8b44-4fc9-bc9f-feugh454f249";
    console.log("Json Request Body: "+jsonReq);

    return jsonReq;
};