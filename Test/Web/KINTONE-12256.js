let LoginFlow = require('../../WEB/Login/flow/flow.js');
let TestData_Login = require('../../WEB/Login/data/data.js').dataMap;
let TestData_Space = require('../../WEB/SpaceCreate/data/data.js').dataMap;
let SpaceCreate = require('../../WEB/SpaceCreate/flow/flow.js');

var assert = require('assert');

describe('Bug再现确认', function () {

    let testLogin = TestData_Login.get('login').info;
    let testSpaceCreate = TestData_Space.get('SpaceCreateMulti').info;

    it('KINTONE-12256', function () {
        let testFlow = new LoginFlow(testLogin)
        testFlow
            .openBrowser()
            .login()
        browser.pause(1000);
        let Portal_Noti = browser.getAttribute('//*[@id="contents-body-ocean"]/div/div[2]/div[1]/div[1]/div/div/div[1]','style')
        console.log("Portal nofitication icon is :", Portal_Noti);

        let testSpaceCreateFlow = new SpaceCreate(testSpaceCreate);
        testSpaceCreateFlow
            .Create()
        browser.pause(1000)

        let Space_Noti = browser.getAttribute('//*[@id="contents-body-ocean"]/div/div[5]/div/div[1]/div/div[1]','style')
        console.log("Space nofitication icon is :", Space_Noti);

        expect(Portal_Noti).to.has.string('information_56.png')
        console.log("Portal nofitication icon 包含 'information_56.png'")
        expect(Space_Noti).to.has.string('notifications_56.png')
        console.log("Space nofitication icon 包含 'notifications_56.png'")
        expect(Portal_Noti).to.not.equal(Space_Noti)
        console.log("再現しました：:アイコンが違っている")

    })
});

//command java -jar selenium-server , wdio wdio.conf.js