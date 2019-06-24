const discord = require("discord.js");

function antiDeleteHander(client, dataManager) {
  if (client.listenerCount("messageDelete") !== 0) return;

  client.on("messageDelete", messgae => {
    if (!dataManager.config.antiDeleteEnabled) return;
    let type = dataManager.config.antiDeleteType;
    if (messgae.channel.type !== "dm") return;
    if (messgae.author.id == client.user.id) return;

    console.log("Deleted.");
    let embed = new discord.RichEmbed()
      .setAuthor(messgae.author.tag, messgae.author.avatarURL)
      .setTitle("Anti-Delete")
      .setColor("#E3644D")
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

    embed.setTimestamp(messgae.createdTimestamp);

    type == "dm"
      ? messgae.channel.send(embed)
      : dataManager.antiDeleteWebhook.send(embed);
  });
}

module.exports = antiDeleteHander;
