__path = process.cwd()
var fs = require("fs");
var express = require("express");
var axios = require("axios");
var request = require("request");
var router = express.Router();

var aiovideo = require("../scrap/aiovideo.js");
var whois = require("../scrap/whois.js");
var utama = require("../scrap/utama.js");
var y2mate = require("../scrap/y2mate.js");
var musicaldown = require("../scrap/musicaldown.js");
var mediafireDl = require("../scrap/mediafire.js");

var creator = "RndyTech";
router.use(async (req, res, next) => {
  const startTime = new Date();
  console.log("=>", new Date().toString(), req.ip, req.method, req.path);
  res.on("finish", async () => {
    console.log(
      "<=",
      new Date().toString(),
      req.ip,
      req.method,
      req.path,
      res.statusCode,
      `${new Date() - startTime}ms`
    );
  });
  next();
});

log = {
  error: {
    status: false,
    code: 503,
    message: "there is a problem on the server, come another time",
    author: `${creator}`,
  },
  invalidId: {
    status: false,
    code: 404,
    message: "Invalid UserId",
    author: `${creator}`,
  },
  invalidUrl: {
    status: false,
    code: 403,
    message: "invalid url",
    author: `${creator}`,
  },
  invalidRandKey: {
    status: false,
    code: 403,
    message: "invalid apikey,contact owner for apikey",
    author: `${creator}`,
  },
  emptyurl: {
    status: false,
    code: 404,
    message: "no url parameters,please enter the url",
    author: `${creator}`,
  },
  emptyparameter: {
    status: false,
    code: 404,
    message: "there are empty parameters, please read the docs",
    author: `${creator}`,
  },
};
// APIKEY
const listkey = ["RndyXD"];

router.get("/", (req, res) => res.sendFile(__path + "/views/index.html"));
router.all("/status", async (req, res) => {
  const startTime = new Date();
  let { sizeFormatter } = require("human-readable");
  let format = sizeFormatter({
    std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  });
  const ram = `${format(
    require("os").totalmem() - require("os").freemem()
  )} / ${format(require("os").totalmem())}`;

  config = {
    author: "rndytech",
    status: {
      status: 200,
      memory: ram,
      port: process.env.PORT || 8080,
      ip: req.ip,
      host: req.hostname,
      ping: `${new Date() - startTime}ms`,
    },
  };
  res.json(config);
});
router.get("/sosmed", async (req, res, next) => {
  if (!req.query.url) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(
        req.query.url
      )
    ) {
      return res.send(log.invalidUrl);
    }
    try {
      let hasil = await aiovideo(req.query.url);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/ghstalk", async (req, res, next) => {
   username = req.query.username
  if (!req.query.username) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.ghstalk(username);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});

router.get("/twitter", async (req, res, next) => {
   url = req.query.url
  if (!req.query.username) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
  	if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(
        req.query.url
      )
    ) {
      return res.send(log.invalidUrl);
    }
    try {
      let hasil = await utama.twitter(url);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});


router.get("/covid", async (req, res, next) => {
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.covid();
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});


router.get("/kodepos", async (req, res, next) => {
   kota = req.query.kota
  if (!req.query.kota) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.kodepos(kota);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/gempa", async (req, res, next) => {
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.gempa();
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/happymod", async (req, res, next) => {
   q = req.query.q
  if (!req.query.q) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.happymod(q);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/sfilesearch", async (req, res, next) => {
   q = req.query.q
  if (!req.query.q) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.sfilesearch(q);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/zippy", async (req, res, next) => {
   url = req.query.url
  if (!req.query.url) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
  	if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(
        req.query.url
      )
    ) {
      return res.send(log.invalidUrl);
    }
    try {
      let hasil = await utama.zippy(url);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/halal", async (req, res, next) => {
   q = req.query.q
   page = req.query.page
  if (!req.query.url) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      let hasil = await utama.halal(q, page);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get("/cekid/domino", async (req, res, next) => {
  id = req.query.id;
  if (!id) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    request.post(
      `https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store?productId=61&itemId=416&catalogId=442&paymentId=1611&gameId=${id}&product_ref=REG`,
      function (error, response, body) {
        try {
          var data = JSON.parse(body);
          nick = data.data.userNameGame;
          if (!nick) return res.json(log.invalidId);
          hasil = {
            UserId: id,
            Nickname: nick,
          };
          config = {
            author: "rndytech",
            result: {
              data: hasil,
            },
          };
          res.json(config);
        } catch (e) {
          res.json(log.error);
        }
      }
    );
  }
});
router.get("/cekid/ff", async (req, res, next) => {
  id = req.query.id;
  if (!id) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    request.post(
      `https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store?productId=3&itemId=10&catalogId=65&paymentId=749&gameId=${id}&product_ref=REG`,
      function (error, response, body) {
        try {
          var data = JSON.parse(body);
          nick = data.data.userNameGame;
          if (!nick) return res.json(log.invalidId);
          hasil = {
            UserId: id,
            Nickname: nick,
          };
          config = {
            author: "rndytech",
            result: {
              data: hasil,
            },
          };
          res.json(config);
        } catch (e) {
          res.json(log.error);
        }
      }
    );
  }
});
router.get("/cekid/ml", async (req, res, next) => {
  id = req.query.id;
  zone = req.query.zone;
  if (!id) return res.json(log.emptyparameter);
  if (!zone) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    request.post(
      `https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store?productId=1&itemId=3&catalogId=58&paymentId=742&gameId=${id}&product_ref=REG&zoneId=${zone}`,
      function (error, response, body) {
        try {
          var data = JSON.parse(body);
          nick = data.data.userNameGame;
          if (!nick) return res.json(log.invalidId);
          hasil = {
            UserId: id,
            Nickname: nick,
          };
          config = {
            author: "rndytech",
            result: {
              data: hasil,
            },
          };
          res.json(config);
        } catch (e) {
          res.json(log.error);
        }
      }
    );
  }
});
router.get("/short", async (req, res, next) => {
  url = req.query.url;
  if (!url) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
      try {
        config = {
          author: "rndytech",
          result: {
            data: body,
          },
        };
        res.json(config);
      } catch (e) {
          console.log('Error :', color(e,'red'))
          res.json(loghandler.invalidlink)
      }
  })
  }
});

// router.get('/qrcode', async (req, res) => {
//   var text = req.query.text
// if (_.isEmpty(text)) return res.status(400).json({ By: 'MFarelS - mfarelsz.xyz', status: 400, message: 'Error. Parameter Salah, Silahkan Masukkan Parameter Text', contoh: 'https://mfarelsz.xyz/api/qrcode?text=FZ' })
//   let response = await fetch(`https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(text)}&chs=512x512`)
//   response.body.pipe(res)
// })

// router.get('/qrcodeV2', async (req, res) => {
//   var text = req.query.text
// if (_.isEmpty(text)) return res.status(400).json({ By: 'MFarelS - mfarelsz.xyz', status: 400, message: 'Error. Parameter Salah, Silahkan Masukkan Parameter Text', contoh: 'https://mfarelsz.xyz/api/qrcodeV2?text=FZ' })
//   res.status(200).json({ By: 'MFarelS - mfarelsz.xyz', status: 200, result: `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(text)}&chs=512x512` })
// })

router.get("/whois", async (req, res, next) => {
  if (!req.query.domain) return res.json(log.emptyparameter);
  if (!req.query.RandKey) return res.json(log.invalidRandKey);
  if (listkey.includes(req.query.RandKey)) {
    try {
      var hasil = await whois(req.query.domain);
      config = {
        author: "rndytech",
        result: {
          data: hasil,
        },
      };
      res.json(config);
    } catch (e) {
      console.log(e);
      res.json(log.error);
    }
  }
});
router.get('/tiktokdl', async (req, res, next) => {
	if (!req.query.url) return res.json(log.emptyparameter)
	if (!req.query.RandKey) return res.json(log.invalidRandKey)
	if (listkey.includes(req.query.RandKey)) {
	if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(req.query.url)) {
		return res.send(log.invalidUrl)
	}
	try {
		var hasil = await musicaldown(req.query.url)
		config = {
			author: 'rndytech',
			result: {
				data: hasil,
			}
		}
		res.json(config)
	} catch (e) {
		console.log(e)
		res.json(log.error)
	}
	}
})
router.get('/mediafiredl', async (req, res, next) => {
	if (!req.query.url) return res.json(log.emptyparameter)
	if (!req.query.RandKey) return res.json(log.invalidRandKey)
	if (listkey.includes(req.query.RandKey)) {
	if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(req.query.url)) {
		return res.send(log.invalidUrl)
	}
	try {
		var hasil = await mediafireDl(req.query.url)
		config = {
			author: 'rndytech',
			result: {
				data: hasil,
			}
		}
		res.json(config)
	} catch (e) {
		console.log(e)
		res.json(log.error)
	}
	}
})
router.get('/ytvdl', async (req, res, next) => {
	if (!req.query.url) return res.json(log.emptyparameter)
	if (!req.query.RandKey) return res.json(log.invalidRandKey)
	if (listkey.includes(req.query.RandKey)) {
	if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(req.query.url)) {
		return res.send(log.invalidUrl)
	}
	try {
		var hasil = await y2mate.ytv(req.query.url,'id4')
		config = {
			author: 'rndytech',
			result: {
				data: hasil,
			}
		}
		res.json(config)
	} catch (e) {
		console.log(e)
		res.json(log.error)
	}
	}
})
router.get('/ytadl', async (req, res, next) => {
	if (!req.query.url) return res.json(log.emptyparameter)
	if (!req.query.RandKey) return res.json(log.invalidRandKey)
	if (listkey.includes(req.query.RandKey)) {
	if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(req.query.url)) {
		return res.send(log.invalidUrl)
	}
	try {
		var hasil = await y2mate.yta(req.query.url,'id4')
		config = {
			author: 'rndytech',
			result: {
				data: hasil,
			}
		}
		res.json(config)
	} catch (e) {
		console.log(e)
		res.json(log.error)
	}
	}
})


router.all('/*', (req, res, next) => {
	res.send(log.invalidUrl)
})
module.exports = router
