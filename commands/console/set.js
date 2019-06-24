const dataManager = require("./../../dataManager.js");
module.exports = function(params) {
  switch (params[0]) {
    case "twitch":
      params.shift();
      dataManager.setTwitch(params.join("-"));
      break;
    case "usernames":
      params.shift();
      dataManager.setUsernames(params.join(" "));
      console.log("Username animation will now use the given values.");
      break;
    case "ainame":
      params.shift();
      dataManager.setAIName(params[0]);
      break;
    default:
      console.log(
        "[ERROR]No matching variabled to set with. Please consult the documentation." +
          params[0]
      );
  }
};
