const rive = require("rivescript");

// Load an individual file.
const bot = new rive();
bot
  .loadFile("brain.rive")
  .then(loading_done)
  .catch(loading_error);

function loading_done() {
  // Now the replies must be sorted!
  bot.sortReplies();
  console.log("Bot is ready!");

  bot.reply("local-user", "Hello").then(function(reply) {
    console.log("The bot says: " + reply);
  });
}

function loading_error() {
  console.log("Error when loading files");
}

module.exports.Speech = function speech(req, res) {
  if (req.body.message !== null && req.body.message !== undefined) {
    console.log(req.body.message);
    var text = req.body.message;
    bot.sortReplies();
    bot.reply("local-user", text).then(function(reply) {
      console.log("The bot says: " + reply);
      res.status(200).send({ message: reply });
    });
  } else {
    res
      .status(201)
      .send({ message: "Sorry I could not understand what you said " });
  }
};

module.exports.Text = function text(req, res) {};
