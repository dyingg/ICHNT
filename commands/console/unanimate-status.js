const dataManager = require("./../../dataManager.js");
module.exports = function(params, client) {
  if (dataManager.statusInterval) {
    clearInterval(dataManager.statusInterval);
    console.log("Stopping the status change cycle...");
  } else {
    console.log("[ERR] No status animate cycle running to stop!");
  }
};
