const dataManager = require("./../../dataManager.js");

module.exports = function(params, client) {
  let activityMessage = params.join(" ");
  client.user;
  client.user
    .setActivity(activityMessage, {
      type: "STREAMING",
      url: "https://www.twitch.tv/" + dataManager.twitch
    })
    .then(() => {
      console.log("[SUCCESS] User activity has been set " + activityMessage);
    })
    .catch(console.log);
};
