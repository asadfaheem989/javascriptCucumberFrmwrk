const { Before, Given, When, Then } = require('cucumber');
const got = require('got');
const assert = require('assert');
const { sconfig } = require('../utilities/config');
const Util = require('../utilities/common-util');

let url = "";
let createTagGroup = "proxy/bundle-service/taggroups";
let tagGroupName = "testTagGroup" + Util.randomStr(4);
let tagGroupDesc = "testTagGroupDesc" + Util.randomStr(4);
let jsonResponse = null;

Given("I initiated Tag Group API", async function () {
    url = sconfig.cleanRoomDevURI + createTagGroup;
});

When("I send a request to create Tag Group API", async function () {
    var data = {
        headers: { 'Content-Type': 'application/json', 'Authorization': sconfig.authToken },
        body: JSON.stringify(createTagGroupRequest())
    };

    console.log("Body of Data: "+data.body);
    jsonResponse = await got.patch(url, data);
    await assert(jsonResponse.statusCode === 200);
});

Then("I validate that new Tag Group is Created", async function () {
    let jsonRespBody = JSON.parse(jsonResponse.body);
    console.log("Body of JSON Response: "+jsonRespBody);
    let tagGroupNameSearched = jsonRespBody.name;
    let tagGroupDescSearched = jsonRespBody.description;
    console.log("Tag Group Name Searched: "+tagGroupNameSearched);
    console.log("Tag Group Description Searched: "+tagGroupDescSearched);

    await assert(tagGroupNameSearched);
    await assert(tagGroupDescSearched);
    await assert.strictEqual(tagGroupName, tagGroupNameSearched);
    await assert.strictEqual(tagGroupDesc, tagGroupDescSearched);
});

var createTagGroupRequest = function () {
    var jsonReq = {};
    jsonReq['name'] = tagGroupName;
    jsonReq['description'] = tagGroupDesc;
    console.log("Json Request Body: "+jsonReq);

    return jsonReq;
};