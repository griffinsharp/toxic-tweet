const express = require("express");
const router = express.Router();
var Twitter = require("twitter");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the tweet route" });
});

router.get("/:user", (req, res) => {
  var client = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });

  const params = {
    screen_name: `${req.params.user}`,
    include_rts: "false",
    count: "200",
    trim_user: "true",
    tweet_mode: "extended"
  };

  const path = "https://api.twitter.com/1.1/statuses/user_timeline.json";

  client
    .get(path, params)
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ noUserFound: "User Not Found. Please try another." }));
});

module.exports = router;
