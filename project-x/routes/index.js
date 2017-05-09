const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const passport = require("../helpers/passport");
const User = require("../models/user");
const flash = require('connect-flash');
const auth = require("../helpers/auth");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', req.flash());
});

router.post('/', passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const firstName = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const coordinates = [Number(req.body.lat), Number(req.body.lng)];
  const street = req.body.street;
  const postCode = req.body.postalcode;
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

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      address: {
        street,
        postCode,
        city,
        country,
        coordinates,
      }

    });
    console.log("this is the new user: " + newUser);


    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', {
          errorMessage: "Something went wrong"
        });
      } else {
        res.redirect("/");
      }
    });
});
});

//to go to dashboard  personal data and chek if is logged in
router.get('/dashboard', auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.user._id},(err, users)=>{
    if(err) next(err);
    res.render('user/dashboard', {user: users[0]});
  });
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// router.get('/items', function(req, res, next) {
//   res.render('item/showitems');
// });
//
// router.get('/items/:id/', function(req, res, next) {
//   res.render('item/showitem');
// });



module.exports = router;
