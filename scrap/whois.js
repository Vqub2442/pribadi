/** @format */

const request = require("request");

async function whois(domain) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: "https://www.hostinger.co.id/whois",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      form: {
        domain: domain,
        submit: "search",
      },
    };

    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      resolve({
        result: result["domain"],
      });
    });
  });
}

module.exports = whois;
