const axios = require("axios")
const request = require("request")
const cheerio = require("cheerio")
const aiovideo = async (url) => {
	return new Promise((resolve, reject) => {
		axios({
			url: 'https://aiovideodl.ml/',
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
			}
		}).then((data) => {
			let a = cheerio.load(data.data)
			let token = a('#token').attr('value')
			const options = {
				method: 'POST',
				url: `https://aiovideodl.ml/wp-json/aio-dl/video-data/`,
				headers: {
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
				},
				formData: {
					url: url,
					token: token
				}
			};
			request(options, async function(error, response, body) {
				if (error) {
					return resolve({
						error
					})
				};
				const $ = cheerio.load(body)
				res = JSON.parse(body)
				res.status = 200
				resolve(res);
			});
		})
	})
}

module.exports = aiovideo;