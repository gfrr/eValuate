const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const passport = require("../helpers/passport");
const User = require("../models/user");
const flash = require('connect-flash');
const Item = require("../models/item");
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

router.get('/search/:word?', (req, res) => {
    var word = req.query.word.split(",")[0];
    var type = req.query.word.split(",")[1];
    console.log(word,type);
   if (String(type) == "Users"){
     console.log("1");
  		User.find({lastName: word}, (error, user) => {
        // if (error) res.render("user/showusers");
        if(!user[0])res.redirect("/users");

  			// if (error) res.status(500).json({message: error});
  			else console.log(user);
        // res.status(200).json(user);
        res.render("user/showuser", {user: user[0]});

        	});
        }
if (String(type) == "Items"){
  word = word.split("%20").join(" ");
  console.log(word);
   Item.find({title: String(word)}, (error, item) => {
    //  if (error) res.render("item/showitems");
     if(!item[0])res.redirect("/items");
    //  if (error) res.status(500).json({message: error});
     else console.log(item);
    //  res.status(200).json(item);
    res.render("item/showitem", {item: item[0]});
       });
     }
  });


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;
