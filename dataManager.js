console.log("Loading Configuration...");

const discord = require("discord.js");

const antiDeleteHandler = require("./handlers/antidelete.js");
const antiEditHandler = require("./handlers/antiedit.js");

const fs = require("fs");
class DataManager {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(__dirname + "/misc/store.json"));

    //Init snapshots
    if (!this.config.snapShots) {
      this.config.snapShots = {};
    }

    if (!this.config.AITokens) {
      this.config.AITantiDeleteHandlerokens = {};
    }
    //Intialize Setup from the above config.

    this.antiDeleteWebhook = undefined;
    this.twitch = "helloword";

    this.animatedUsername = {};

    this.mountedAI = false;

    this.statusInterval = undefined;
    this.antiDeleteWebhook = undefined;
    this.antiEditWebhook = undefined;
  }

  initOnReady(client) {
    if (this.config.antiDeleteEnabled) {
      console.log("[ANTI-DELETE] Enabled -> Setting Up.");
      if (this.config.antiDeleteType == "dm") {
        this.setupAntiDeleteWebHook(true);
        antiDeleteHandler(client, this);
      } else {
        let discordCred = this.config.antiDeleteWebHook;

        if (discordCred) {
          this.setupAntiDeleteWebHook(false, discordCred);
          antiDeleteHandler(client, this);
        } else {
          console.log("Error Anti delete webhook setup failed.");
        }
      }
    }

    if (this.config.antiEditEnabled) {
      console.log("[ANTI-EDIT] Enabled -> Setting Up.");
      if (this.config.antiEditType == "dm") {
        this.setupAntiEditWebHook(true);
        antiEditHandler(client, this);
      } else {
        let discordCred = this.config.antiEditWebHook;

        if (discordCred) {
          this.setupAntiEditWebHook(false, discordCred);
          antiEditHandler(client, this);
        } else {
          console.log("Error Anti edit webhook setup failed.");
        }
      }
    }
  }

  saveConfig() {
    fs.writeFile(
      __dirname + "/misc/store.json",
      JSON.stringify(this.config),
      () => {}
    );
  }

  setAIName(name) {
    this.config.AIName = name;
    this.saveConfig();
    console.log("Set the AI's name to " + name);
  }

  setAIToken(id, token) {
    if (this.config.AITokens[id] && this.config.AITokens[id] == token) return;
    this.config.AITokens[id] = token;
    this.saveConfig();
  }

  setAutoRespond(status, message) {
    this.config.autoRespond = status;
    if (message) {
      this.config.autoRespondMsg = message;
    }
    this.saveConfig();
  }

  snapShot(callName, snapShot) {
    this.config.snapShots[callName] = snapShot;
    //Write
    this.saveConfig();
  }

  setUsernames(unparsedString) {
    this.config.usernames = unparsedString.split(",");
    console.log(this.config.usernames);
    this.saveConfig();
  }

  setupAntiDeleteWebHook(dm, discordCred) {
    this.config.antiDeleteEnabled = true;
    if (!dm) {
      console.log("Setting up the anti webhook...");
      this.config.antiDeleteWebHook = discordCred;
      this.config.antiDeleteType = "webhook";
      this.antiDeleteWebhook = new discord.WebhookClient(
        discordCred.id,
        discordCred.token
      );

      this.antiDeleteWebhook.send("Deletions will be logged!");
      console.log("Webhook Initialized..");
    } else {
      console.log("Anti delete running on dms...");
      this.config.antiDeleteWebhook = undefined;
      this.config.antiDeleteType = "dm";
    }
    // this.saveConfig();
  }

  setupAntiEditWebHook(dm, discordCred) {
    this.config.antiEditEnabled = true;
    if (!dm) {
      console.log("Setting up the anti webhook...");
      this.config.antiEditWebHook = discordCred;
      this.config.antiEditType = "webhook";
      this.antiEditWebhook = new discord.WebhookClient(
        discordCred.id,
        discordCred.token
      );

      this.antiEditWebhook.send("Editions will be logged!");
      console.log("Webhook Initialized..");
    } else {
      console.log("Anti Edit running on dms...[NOT RECOMMENDED]");
      this.config.antiEditWebhook = undefined;
      this.config.antiEditType = "dm";
    }

    this.saveConfig();
  }

  setTwitch(value) {
    this.twitch = value;
    console.log(
      "[] Changed the value of the twitch stream URL. " + this.twitch
    );
  }
}

module.exports = new DataManager();
