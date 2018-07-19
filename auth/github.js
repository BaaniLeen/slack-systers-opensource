var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var nodeMailer = require("nodemailer");
var User = require('../models/User');

passport.use(new GitHubStrategy({
    clientID: "e7b10decd2ed4ef13816",
    clientSecret: "bb073a53914d014f328de98ad9fe5a3cff366912",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
          user: "baani16234@iiitd.ac.in",
          pass: ""
      }
    });
    let mailOptions = {
      from: "<baani16234@iiitd.ac.in>", // sender address
      to: profile.emails[0].value, // list of receivers
      subject: "Systers OSS Slack Invite", // Subject line
      text: "Good morning!", // plain text body
      html: "<b>Demo</b>" // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {    
      if (!error) {
          res.render("index");
        }    
      });
    User.findOrCreate({userid: profile.id}, {name: profile.displayName, userid: profile.id, email: profile.emails[0].value}, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
