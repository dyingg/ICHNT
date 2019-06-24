const dataManager = require("./../../dataManager.js");

const request = require("request-promise");
const handleAntiEdit = require("./../../handlers/antiedit.js");

module.exports = async function(params, client) {
  if (dataManager.config.antiEditEnabled) {
    console.log("Disabled antiedit logging");
    dataManager.config.antiEditEnabled = false;
    dataManager.saveConfig();
    return;
  }

  try {
    if (params[0] !== "dm") {
      let webhookData = await request(params[0]);
      webhookData = JSON.parse(webhookData);
      dataManager.setupAntiEditWebHook(false, webhookData);
    } else {
      dataManager.setupAntiEditWebHook(true, null);
    }

    handleAntiEdit(client, dataManager);
  } catch (e) {
    console.log(e);
  }

  //embed generator
};
