module.exports = (params, client) => {
  if (params.length !== 2) {
    console.log("Infinite type invalid usage");
    return;
  }
  if (params[0] == "start") {
    console.log("Starting infinite typing");
    client.channels.get(params[1]).startTyping();
  } else {
    console.log("Stopping infinite typing");
    client.channels.get(params[1]).stopTyping();
  }
};
