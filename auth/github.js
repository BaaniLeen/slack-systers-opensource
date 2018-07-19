var passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(new GitHubStrategy({
    clientID: "94c3bea3e111456764eb",
    clientSecret: "b665c678fe607b3460b50c41fb01d801848f207a",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
    User.findOrCreate({userid: profile.id}, {name: profile.displayName, userid: profile.id, emailid: profile.emails[0].value}, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
