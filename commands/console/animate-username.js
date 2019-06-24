const dataManager = require("./../../dataManager.js");
module.exports = (params, client) => {
  if (dataManager.config.usernames.length > 1) {
    if (dataManager.animatedUsername[params[0]]) {
      console.log("Stopping Rotation");
      client.clearInterval(dataManager.animatedUsername[params[0]]);
      return;
    }
    let index = 0;
    dataManager.animatedUsername[params[0]] = client.setInterval(() => {
      if (index == dataManager.config.usernames.length) {
        index = 0;
      }

      client.guilds
        .get(params[0])
        .me.setNickname(dataManager.config.usernames[index]);

      index++;
    }, 3000);
  } else {
    console.log(
      "Invalid usernames set for roation please use set usernames username,sperated,with,comma"
    );
  }
};
