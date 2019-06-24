const dataManager = require("./../../dataManager.js");
module.exports = params => {
  if (params.length > 0) {
    dataManager.setAutoRespond(true, params.join(" "));
    console.log("[DM] Auto Respond has be enabled!");
  } else {
    dataManager.setAutoRespond(false);
    console.log("[DM] Auto Respond has been disabled!");
  }
};
