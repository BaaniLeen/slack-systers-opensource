var Express = require("express");
var router = Express.Router();  // eslint-disable-line

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect("/auth/login");
}
/* GET users listing. */
router.get("/", ensureAuthenticated, function(req, res, next) {
  res.render("user", { user: req.user });
});

module.exports = router;
