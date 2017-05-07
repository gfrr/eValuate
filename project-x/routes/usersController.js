const express = require('express');
const userController = express.Router();

const auth = require("../helpers/auth");
const passport = require("../helpers/passport");
const flash    = require("connect-flash");

const User= require("../models/user");
const Item= require("../models/item");

//to go to dashboard  personal data and chek if is logged in
userController.get('/:id', auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.params.id},(err, users)=>{
    if(err) next(err);
    res.render('/dashboard',{user[0]})
  });
});

// check if is the user or admin dets the right to go to edit page
userController.get("/:id/edit", auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.params.id}, (err, user)=> {
    if(err) next(err);
    if(req.user._id == req.params.id || req.user.role == "Admin") res.render("auth/edit", {user: user[0]});
    else res.redirect("/logout");
  });
});

//user edit its own info
userController.post("/:id", auth.checkLoggedIn("/logout"), (req, res, next)=> {
  const userInfo = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address:{
      street: req.body.street,
      postCode: req.body.postCode,
      city: req.body.city,
      country: req.body.country,
  };
  User.findByIdAndUpdate(req.params.id, userInfo, (err, user) => {
    if (err) next(err);
    console.log("change saved");
    res.redirect("/dashboard",{user[0]})
  });
});





userController.get('/profile', function(req, res, next) {
  res.render('profile');
});

userController.get('/profile/:id', function(req, res, next) {
  res.render('profile-show', {user[0]});
});
//to go to dashboard and chek if is logged in
// userController.get('/', auth.checkLoggedIn("/logout"), (req, res, next)=> {
//   User.find({},(err, users)=>{
//     if(err) next(err);
//     res.render('/dashboard',{users})
//   });
// });




module.exports = userController;

