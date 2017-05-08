const express = require('express');
const itemsController = express.Router();

const auth = require("../helpers/auth");
const passport = require("../helpers/passport");
const flash    = require("connect-flash");
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const User= require("../models/user");
const Item= require("../models/item");
const Picture = require('../models/picture');
const Feedback= require("../models/feedback");

itemsController.get("/new", (req, res, next)=> {
  res.render('item/new');
});

itemsController.post("/new", upload.single('photo'), (req, res, next)=> {
  console.log("entering post New item");
  pic = new Picture({
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
    next();
  });

  const itemInfo = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    keywords: req.body.keyword.split(' '),
    images: pic,
    approxAge: req.body.approxAge,
    userId: req.user.id
  };

  console.log(itemInfo);

  const newItem = new Item(itemInfo);
  console.log(newItem);

  newItem.save((err)=>{
        if (err) { next(err); } else {
          res.redirect('/items/showitem/:id');
        }
      });

});



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


//public information of one item
itemsController.get("/:id",(req, res, next)=>{
  Item.findById(req.params.id, (err,movie)=> {
    if (err) { next(err); }
    res.render('item/showitem',{item: item});
  });
});

//public information of all items
itemsController.get("/",(req, res, next)=>{
  res.render('/showitems');
});

//check if the user or admin access item evaluation page
itemsController.get("/:id/", auth.checkLoggedIn("/logout"), (req, res, next)=> {
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
itemsController.post('/:id/delete', auth.checkLoggedIn("/logout"), (req, res, next) => {
    const feedback = req.params.feedback;
    Item.findByIdAndRemove(Feedback, (err, item) => {
      if (err){ return next(err); }
      return res.redirect('/items');
    });
  });


module.exports = itemsController;
