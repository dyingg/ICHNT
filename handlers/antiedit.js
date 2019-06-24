const discord = require("discord.js");

function handleAntiEdit(client, dataManager) {
  if (client.listenerCount("messageUpdate") !== 0) return;

  client.on("messageUpdate", (messgae, editedMessage) => {
    if (!dataManager.config.antiEditEnabled) return;
    let type = dataManager.config.antiEditType;
    if (messgae.channel.type !== "dm") return;
    if (messgae.author.id == client.user.id) return;

    let embed = new discord.RichEmbed()
      .setAuthor(messgae.author.tag, messgae.author.avatarURL)
      .setTitle("Previously")
      .setColor("#4DD6E3")
      .setDescription("\n" + (messgae.content || "No content"));

    if (messgae.attachments.first()) {
      embed.addField("Attachment ", messgae.attachments.first().proxyURL);
    }

    if (
      messgae.attachments.first() &&
      !isNaN(messgae.attachments.first().height)
    ) {
      embed.setImage(messgae.attachments.first().proxyURL);
    }
    embed.addField("Now", editedMessage.url);
    embed.setTimestamp(messgae.editedTimestamp);

    type == "dm"
      ? messgae.channel.send(embed)
      : dataManager.antiEditWebhook.send(embed);
  });
}

module.exports = handleAntiEdit;
