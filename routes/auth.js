var Express = require("express");
var router = Express.Router();  // eslint-disable-line
var passportGitHub = require("../auth/github");
var User = require("../models/User");

/* LOGIN ROUTER */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "Please Sign In with:" });
});

/* LOGOUT ROUTER */
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

/* GITHUB ROUTER */
router.get("/github",
  passportGitHub.authenticate("github", { scope: [ "user:email" ] }));

router.get("/github/callback",
  passportGitHub.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/users");
  });

module.exports = router;
