var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var nodeMailer = require("nodemailer");
var User = require("../models/User");

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({
    _id: id.doc._id
  }, function (err, user) {
    fn(err, user);
  });
});

passport.use(new GitHubStrategy({
    clientID: "94c3bea3e111456764eb",
    clientSecret: "b665c678fe607b3460b50c41fb01d801848f207a",
    callbackURL: "https://slack-systers-opensource.herokuapp.com/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    // console.log(profile.emails[0].value);
    User.findOrCreate({
      userid: profile.id
    }, {
      name: profile.displayName,
      userid: profile.id,
      emailid: profile.emails[0].value
    }, function (err, user) {
      return done(err, user);
    });
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "baani.jolly@gmail.com",
        pass: ""
      }
    });
    let mailOptions = {
      from: "<baani.jolly@gmail.com>", // sender address
      to: profile.emails[0].value, // list of receivers
      subject: "Slack Invitation", // Subject line
      text: "Here is your link", // plain text body
      html: "<center><img src='https://avatars2.githubusercontent.com/u/6520415?s=280&v=4'><br><br><br><h1> Welcome to Systers Open Source Slack!</h1><br><button><a href='http://systers-opensource.slack.com/'><h2>Click here to join the slack channel</h2></a></button></center>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {

      if (!error) {
        // return console.log(error);
      }

    });
  }
));

module.exports = passport;