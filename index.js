const discord = require("discord.js");
const client = new discord.Client();
const readline = require("readline");
const dataManager = require("./dataManager.js");
const communicate = require("./misc/virtual-bf/communicate.js");
const fs = require("fs");
const token = JSON.parse(fs.readFileSync(__dirname + "/token.json"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const ConsoleCommandHandler = require("./commands/consoleHandler.js")();

client.on("ready", () => {
  console.log("Connected sucessfully to discord. Ready for action!");

  dataManager.initOnReady(client);

  rl.on("line", function(line) {
    let parseCommand = line.split(" ");
    let command = parseCommand.shift();
    let params = parseCommand;
    ConsoleCommandHandler(command, params, client);
  });
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.author.id == client.user.id) {
    if (message.content.indexOf("&") == 0) {
      let line = message.content;
      let parseCommand = line.split(" ");
      let command = parseCommand.shift().substr(1);
      let params = parseCommand;
      ConsoleCommandHandler(command, params, client);
      return;
    }

    if (dataManager.config.snapShots[message.content]) {
      message.channel.send(dataManager.config.snapShots[message.content]);
      message.delete();
      return;
    }
  }
  if (message.channel.type == "dm") {
    if (message.author.id !== client.user.id) {
      if (dataManager.config.autoRespond) {
        message.channel.send(
          dataManager.config.autoRespondMsg || "(auto response)"
        );

        return;
      }

      if (dataManager.mountedAI) {
        if (message.content.indexOf("!") == 0) {
          return;
        }

        if (!dataManager.config.AITokens[message.author.id]) {
          dataManager.config.AITokens[message.author.id] = {
            token: "cw".concat(Date.now().toString(16)),
            session: "null"
          };
          dataManager.saveConfig();
        }

        communicate(message.author.id, message.content || ".").then(cd => {
          if (cd.responses[0] !== "")
            message.channel.send(cd.responses[0]).catch(console.log);

          dataManager.config.AITokens[message.author.id].session = cd.sessionid;
          dataManager.saveConfig();
        });
      }
    }
  }
});

client.login(token.token);
