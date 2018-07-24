var Express = require("express");
var router = Express.Router();  // eslint-disable-line

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
