const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const passport = require("../helpers/passport");
const User = require("../models/user");
const auth = require("../helpers/auth");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/",
  failureFlash: false,
  passReqToCallback: true
}));

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next) {
  const firstName = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const street = req.body.street;
  const postCode = req.body.postCode;
  const city = req.body.city;
  const country = req.body.country;

  const tempInfo = {
    firstName, lastName, email, street, postCode, city, country
  };

  // check if confirm password is same as password
  if (password != confirmPassword) {
    res.render('auth/signup', {
      errorMessage: 'Something went wrong with your password. Please re-enter password',
      tempInfo
    });

  }


  User.findOne({"email": email},
      "email",
      (err,user) => {
        if (user !== null) {
        res.render('auth/signup', {
          errorMessage: 'The email entered already exists'
      });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      address: {
        street: street,
        postCode: postCode,
        city: city,
        country: country
      }

    });
    console.log("this is the new user: " + newUser);


    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', {
          errorMessage: "Something went wrong"
        });
      } else {
        res.redirect("/dashboard");
      }
    });
});
});

router.get('/dashboard', auth.checkLoggedIn("/logout"), function(req, res, next) {

  res.render('user/dashboard', {user: req.user});
});

router.get('/items', function(req, res, next) {
  res.render('item/showitems');
});

router.get('/items/:id/', function(req, res, next) {
  res.render('item/showitem');
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
