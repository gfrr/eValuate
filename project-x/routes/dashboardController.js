const express = require('express');
const router = express.Router();
const passport = require("../helpers/passport");
const User = require("../models/user");
const flash = require('connect-flash');
const Item = require("../models/item");
const Expert = require("../models/expert");
const auth = require("../helpers/auth");

//to go to dashboard  personal data and chek if is logged in
router.get('/dashboard', auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.user._id},(err, users) => {
    if(err) next(err);
    res.render('user/dashboard', {user: users[0]});
  });
});

router.post("/dashboard", auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.findById(req.user._id, (err, user)=>{
    if(err) next(err);
    if (user.role !== "Admin" || user.role !== "Professional"){
      user.role = "Professional";
      user.save();
      let focus;
      if(typeof(req.body.focus) == "string") focus = [req.body.focus];
      else focus = req.body.focus;
      const expertInfo = {
        cv: req.body.cv,
        photo: req.body.photo,
        website: req.body.website,
        focus,
        pending: [],
        completed: [],
        userId: user._id
      };
      const expert = Expert(expertInfo);
      expert.save();
      console.log(user);
      console.log(expert);
      res.redirect("/dashboard");
    }


  });

  // const expertSchema = new Schema({
  //   cv: String,
  //   photo: String,
  //   website: String,
  //   focus: [], // i.e. Stamps, Coins etc. It can be one or more.
  //   pending: [],
  //   completed: [],
  //   userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  // });
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
