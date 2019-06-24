module.exports = function(params, client) {
  let activityMessage = params.join(" ");
  client.user
    .setActivity(activityMessage, { type: "WATCHING" })
    .then(() => {
      console.log("[SUCCESS] User activity has been set " + activityMessage);
    })
    .catch(console.log);
};
