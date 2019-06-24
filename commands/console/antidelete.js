const dataManager = require("../../dataManager.js");

const request = require("request-promise");
const antiDeleteHander = require("./../../handlers/antidelete.js");

module.exports = async function(params, client) {
  if (dataManager.config.antiDeleteEnabled) {
    console.log("Disabled antidelete logging");

    dataManager.config.antiDeleteEnabled = false;
    dataManager.saveConfig();
    return;
  }

  try {
    if (params[0] !== "dm") {
      let webhookData = await request(params[0], {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          "Content-Length": "0"
        },
        gzip: true
      });
      webhookData = JSON.parse(webhookData);
      dataManager.setupAntiDeleteWebHook(false, webhookData);
    } else {
      dataManager.setupAntiDeleteWebHook(true, null);
    }
    antiDeleteHander(client, dataManager);
  } catch (e) {
    console.log(e);
  }

  //embed generator
};

module.exports.handler = antiDeleteHander;
