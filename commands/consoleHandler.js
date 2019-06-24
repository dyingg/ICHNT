const fs = require("fs");

const commands = {};
const consoleCommands = fs.readdirSync(__dirname + "/console");

consoleCommands.forEach(commandHandler => {
  commands[commandHandler.split(".")[0]] = require(__dirname +
    "/console/" +
    commandHandler);
});

console.log("Setting up commands interface...");

function handleConsoleCommand(command, params, client) {
  if (!commands[command]) {
    console.log("Invalid command usage. Command was not found!");
  } else {
    commands[command](params, client);
  }
}

module.exports = () => {
  return handleConsoleCommand;
};
