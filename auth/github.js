var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var nodeMailer = require("nodemailer");
var User = require('../models/User');

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
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
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
      html: "<b>Hello World</b>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {

      if (!error) {
        return console.log(error);
      }

    });
  }
));

module.exports = passport;