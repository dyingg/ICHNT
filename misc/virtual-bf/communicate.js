const request = require("request");
// const dataManager = require("../.././dataManager.js");
const cheerio = require("cheerio");
// let mitsuku = new RegExp("mitsuku", "ig");

function communicate(id, message) {
  // let name = new RegExp(dataManager.config.AIName, "ig");

  //cw16b6dca304e
  // let token = dataManager.config.AITokens[id];

  // message = encodeURIComponent(message.replace(name, "Mitsuku"));

  return new Promise(function(resolve, reject) {
    request(
      "https://pandorabots.com/pandora/talk?botid=94023160ee3425e0",
      {
        method: "POST",
        headers: {
          Host: "pandorabots.com",
          "Cache-Control": "max-age=0",
          Origin: "https://pandorabots.com",
          "Upgrade-Insecure-Requests": "1",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
          Referer:
            "https://pandorabots.com/pandora/talk?botid=94023160ee3425e0",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie:
            "botcust2=dcb7d6aa3e4d4019; _ga=GA1.2.1098710452.1561258631; _gid=GA1.2.2070302521.1561258631"
        },
        // proxy: "http://127.0.0.1:8888",
        // rejectUnauthorized: false,
        form: {
          message
        },
        gzip: true
      },
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          let $ = cheerio.load(body);
          let message = $("#typing").text();

          let data = {
            responses: [message],
            sessionid: null
          };

          console.log(data);

          resolve(data);
        } else {
          console.log(err);
          reject({ err, code: 403 || null });
        }
      }
    );
  });
}

module.exports = communicate;
