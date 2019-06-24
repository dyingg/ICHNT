const dataManager = require("./../../dataManager.js");
module.exports = params => {
  if (dataManager.mountedAI) {
    dataManager.mountedAI = false;
    console.log("Unmounted AI ----- ");
  } else {
    dataManager.mountedAI = true;

    console.log("Mounted AI ---- with name " + dataManager.config.AIName);
  }
};
