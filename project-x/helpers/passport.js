const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User          = require("../models/user");


passport.serializeUser((user, cb) => {
  console.log('1');
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log('2');
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
      console.log("if1 ", err);
      return next(err);
    }
    if (!user) {
      console.log("if2 ", user);
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("if3 ", password, user.password);
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));




module.exports = passport;
