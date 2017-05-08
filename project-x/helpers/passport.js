const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User          = require("../models/user");


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email',
  passwordField: 'password'
}, (req, email, password, next) => {
  User.findOne({ email }, (err, user) => {

    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("error1");
      return next(null, false, { message: "* Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("error2");
      return next(null, false, { message: "* Incorrect password" });
    }
    return next(null, user);
  });
}));




module.exports = passport;
