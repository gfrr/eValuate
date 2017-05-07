const express = require('express');
const itemsController = express.Router();

const auth = require("../helpers/auth");
const passport = require("../helpers/passport");
const flash    = require("connect-flash");

const User= require("../models/user");
const Item= require("../models/item");
const Feedback= require("../models/feedback");

// check if is the user or admin gets the right to go to edit page
itemsController.get("/:id/edit", auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.params.id}, (err, user)=> {
    if(err) next(err);
    if(req.user._id == req.params.id || req.user.role == "Admin") res.render("auth/edit", {item: item[0]});
    else res.redirect("/logout");
  });
});

//Item edited by user
itemsController.post("/:id", auth.checkLoggedIn("/logout"), (req, res, next)=> {
    const itemInfo = {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        keywords: req.body.keywords,
        images: [req.body.images],
        approxAge: req.body.approxAge,
    };
    User.findByIdAndUpdate(req.params.id, itemInfo, (err, item) => {
      if (err) next(err);
      console.log("change saved");
      res.redirect("/items",{item: item[0]});
    });
  });

//Item deleted by user
itemsController.post('/:id/delete', auth.checkLoggedIn("/logout"),(req, res, next) => {
    const id = req.params.id;

    Item.findByIdAndRemove(id, (err, item) => {
      if (err){ return next(err); }
      return res.redirect('/items');
    });

  });


//Item public information
itemsController.get("/:id",(req, res, next)=>{
  res.render('item');
});



//check if the user or admin access item evaluation page
itemsController.get("/:id/feedback", auth.checkLoggedIn("/logout"), (req, res, next)=> {
  User.find({"_id": req.params.id}, (err, user)=> {
    if(err) next(err);
    if(req.user._id == req.params.id || req.user.role == "Admin") res.render("auth/feedback", {item: item[0]});
    else res.redirect("/logout");
  });
});

//Item evaluated by user
itemsController.post("/:id/", auth.checkLoggedIn("/logout"), (req, res, next)=>{
  const itemFeedback = req.body.feedback;
  User.findByIdAndUpdate(req.params.id, itemFeedback, (err, item) => {
    if (err) next(err);
    console.log("change saved");
    res.redirect("/items",{item: item[0]});
  });
});

//Item evaluation deleted by user
itemsController.post('/:id/feedbackdelete', auth.checkLoggedIn("/logout"), (req, res, next) => {
    const feedback = req.params.feedback;
    Item.findByIdAndRemove(Feedback, (err, item) => {
      if (err){ return next(err); }
      return res.redirect('/items');
    });
  });


module.exports = itemsController;
