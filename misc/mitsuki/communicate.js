const request = require("request");
const dataManager = require("../.././dataManager.js");

let mitsuku = new RegExp("mitsuku", "ig");

function communicate(id, message) {
  let name = new RegExp(dataManager.config.AIName, "ig");

  //cw16b6dca304e
  let token = dataManager.config.AITokens[id];

  message = encodeURIComponent(message.replace(name, "Mitsuku"));

  return new Promise(function(resolve, reject) {
    request(
      "https://miapi.pandorabots.com/talk?botkey=n0M6dW2XZacnOgCWTp0FRYUuMjSfCkJGgobNpgPv9060_72eKnu3Yl-o1v2nFGtSXqfwJBG2Ros~&input=" +
        message +
        "&client_name=" +
        token.token +
        "&sessionid=" +
        token.session +
        "&channel=6",
      {
        method: "POST",
        headers: {
          Host: "miapi.pandorabots.com",
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Origin: "https://www.pandorabots.com",
          Connection: "keep-alive",
          Referer: "https://www.pandorabots.com/mitsuku/",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          "Content-Length": "0"
        },
        gzip: true
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let botResponse = JSON.parse(body);
          // console.log(botResponse);

          if (botResponse.responses.length > 0) {
            //Refresh a dead client
            if (botResponse.responses[0] == "") {
              dataManager.config.AITokens[id] = {
                token: "cw".concat(Date.now().toString(16)),
                session: "null"
              };
              dataManager.saveConfig();
              botResponse.responses[0] = "...";
            } else {
              botResponse.responses[0] = botResponse.responses[0].replace(
                mitsuku,
                dataManager.config.AIName
              );
            }
          } else {
            botResponse.responses.push("...");
          }

          resolve(botResponse);
        } else {
          reject({ err, code: resp.statusCode || null });
        }
      }
    );
  });
}

module.exports = communicate;
