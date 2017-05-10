const express = require('express');
const router = express.Router();
const passport = require("../helpers/passport");
const User = require("../models/user");
const flash = require('connect-flash');
const Item = require("../models/item");
const auth = require("../helpers/auth");

//to go to dashboard  personal data and chek if is logged in
router.get('/dashboard', auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.user._id},(err, users)=>{
    if(err) next(err);
    res.render('user/dashboard', {user: users[0]});
  });
});

// Still need to secure the route!! remember before deploying
router.get("/dashboard/remove/:item_id", auth.checkLoggedIn("/logout"), (req, res, next)=>{
  Item.findByIdAndRemove(req.params.item_id, (err)=> {
      if(err) next(err);
  });
  User.findByIdAndUpdate(req.user._id, {$pull:{itemsUser: req.params.item_id}}, {new: true}, (err, user) => {
    if(err) next(err);
    res.redirect("/dashboard");
  });
});

/*
if(req.user._id == String(item[0].userId) || req.user.role == "Admin") res.render("auth/edit-item", {item: item[0]});
else res.redirect("/logout");
*/


module.exports = router;
