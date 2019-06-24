const dataManager = require("./../../dataManager.js");
module.exports = async function(params, client) {
  if (params.length !== 2) {
    console.log(
      "Invalid usage please paste the message link as the first param, and invoke message in the second one"
    );
    return;
  }

  //https://discordapp.com/channels/@me/590244293990678533/590508584568094720

  let builder = params[0].split("/");
  let channelId = builder[builder.length - 2];
  let messageId = builder[builder.length - 1];

  // console.log(channelId);
  // console.log(messageId);
  if (!channelId || !messageId) {
    console.log("Invalid URL given!");
    return;
  }

  try {
    let message = await client.channels.get(channelId).fetchMessage(messageId);

    let messageContent = message.content;
    dataManager.snapShot(params[1], messageContent);
    console.log(
      "Saved message snap chat you may invoke it at any time with " + params[1]
    );
  } catch (e) {
    console.log(e);
  }
};
