require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var cBotSpeech = require("./cbot").Speech;
var cBotText = require("./cbot").Text;

var app = express();

// Get - Middleware Serve up public/views folder
app.use(
  "/",
  serveStatic("./public/", { index: ["index.html", "default.htm"] })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/speech", function(req, res) {
  console.log(req.body.message);
  cBotSpeech(req, res);
});

app.listen(process.env.LOCALPORT, function() {
  console.log("Server Started at port " + process.env.LOCALPORT);
});
