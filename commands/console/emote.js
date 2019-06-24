const fs = require("fs");
const request = require("request");
const path = require("path");

let emoteFolder = path.resolve(__dirname, "../../emotes");

module.exports = function(params, client) {
  let guild = client.guilds.get(params[0]);

  let dumpFolder = emoteFolder + "/" + guild.nameAcronym;
  fs.mkdirSync(dumpFolder);

  guild.emojis.array().forEach(emoji => {
    request(emoji.url).pipe(fs.createWriteStream(dumpFolder + "/" + emoji.id));
  });
  console.log("Saving emotes to the emote folder.");
};
