var Express = require("express");
var router = Express.Router();  // eslint-disable-line

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Systers Open Source Slack Inviter" });
});

module.exports = router;
