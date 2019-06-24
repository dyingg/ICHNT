const dataManager = require("./../../dataManager.js");
module.exports = function(params, client) {
  if (dataManager.statusInterval) clearInterval(dataManager.statusInterval);

  let current = 0;
  let cycling = setInterval(function() {
    let status = ["dnd", "idle", "online"];

    if (current == 3) {
      current = 0;
    }

    client.user
      .setStatus(status[current])
      .then()
      .catch(console.log);

    current++;
  }, 3000);

  dataManager.statusInterval = cycling;
  console.log("Status cycler started....");
};
