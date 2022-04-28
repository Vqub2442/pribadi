var express = require('express');
let cookie = require('cookie-parser')
cors = require('cors');
const bodyParser = require("body-parser");
secure = require('ssl-express-www');
let wakeDyno = require("woke-dyno");
const PORT = process.env.PORT || 8080
var {
	color
} = require('./lib/color.js')
apirouter = require('./routes/api')

var app = express()
app.use(cookie())
app.enable('trust proxy');
app.set("json spaces", '\t')
app.use(cors())
app.use(secure)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use('/', apirouter) 
app.listen(PORT, () => {
	wakeDyno({
    url: "https://rndytechapi.herokuapp.com", // url string
    interval: 600000, // interval in milliseconds (1 minute in this example)
    startNap: [17, 0, 0, 0], // the time to start nap in UTC, as [h, m, s, ms] (05:00 UTC in this example)
    endNap: [23, 59, 59, 999], // time to wake up again, in UTC (09:59:59.999 in this example)
  }).start();
	console.log(color("Server running on port " + PORT, 'green'))
})
module.exports = app