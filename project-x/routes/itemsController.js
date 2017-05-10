const express = require('express');
const itemsController = express.Router();
const auth = require("../helpers/auth");
const passport = require("../helpers/passport");
const flash    = require("connect-flash");
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const User  = require("../models/user");
const Item  = require("../models/item");
const Picture = require('../models/picture');
const Feedback= require("../models/feedback");

//public information of all items
itemsController.get("/",(req, res, next)=>{
  Item.find({},(err,items) => {
    if (err) {
      next(err);
    } else {
      res.render('item/showitems',{items});
    }
  });
});

itemsController.get("/new", (req, res, next)=> {
  res.render('item/new');
});

itemsController.post("/new", upload.single('photo'), (req, res, next)=> {
  pic = new Picture({
    image: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {

  });

  const itemInfo = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    keywords: req.body.keywords.split(' '),
    images: [pic],
    approxAge: req.body.approxAge,
    userId: req.user._id
  };

  const newItem = new Item(itemInfo);

  newItem.save((err, item)=>{
        if (err) { next(err); } else {
          res.redirect(`/items/${item._id}`);
        }
      });
  User.findOneAndUpdate({_id: req.user._id}, {$push:{itemsUser: newItem._id}}, (err, doc) =>{
      if(err) console.log("Something wrong when updating data!");
      console.log(doc);
  });

});

//public information of one item
itemsController.get("/:id",(req, res, next)=>{
  Item.findById(req.params.id, (err,item)=> {
    if (err) { next(err); }

    res.render('item/showitem',{item: item});
  });
});

//Item edited by user
itemsController.post("/:id", auth.checkLoggedIn("/logout"), (req, res, next)=> {
    const itemInfo = {
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.keywords.split(' '),
      approxAge: req.body.approxAge,

    };

      Item.findByIdAndUpdate(req.params.id, itemInfo, (err, item) => {
        if (err) next(err);
        console.log("change saved");
    });


    res.redirect(`/items/${req.params.id}`);
  });

// check if is the user or admin gets the right to go to edit page
itemsController.get("/:id/edit", auth.checkLoggedIn("/logout"), (req, res, next)=> {


  Item.find({"_id": req.params.id}, (err, item)=> {
    if(err) next(err);
      console.log(req.user.id);
        console.log(item[0].userId);

    if(req.user._id == String(item[0].userId) || req.user.role == "Admin") res.render("auth/edit-item", {item: item[0]});
    else res.redirect("/logout");
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






//check if the user or admin access item evaluation page
// itemsController.get("/:id/", auth.checkLoggedIn("/logout"), (req, res, next)=> {
//   User.find({"_id": req.params.id}, (err, user)=> {
//     if(err) next(err);
//     if(req.user._id == req.params.id || req.user.role == "Admin") res.render("auth/feedback", {item: item[0]});
//     else res.redirect("/logout");
//   });
// });

// //Item evaluated by user
// itemsController.post("/:id/", auth.checkLoggedIn("/logout"), (req, res, next)=>{
//   const itemFeedback = req.body.feedback;
//   User.findByIdAndUpdate(req.params.id, itemFeedback, (err, item) => {
//     if (err) next(err);
//     console.log("change saved");
//     res.redirect("/items",{item: item[0]});
//   });
// });

//Item evaluation deleted by user
itemsController.post('/:id/delete', auth.checkLoggedIn("/logout"), (req, res, next) => {
    const feedback = req.params.feedback;
    Item.findByIdAndRemove(Feedback, (err, item) => {
      if (err){ return next(err); }
      return res.redirect('/items');
    });
  });

//
// itemsController.get('/:id/offer', (req, res, next) => {
//   console.log("success");
// });
//
// itemsController.post('/:id/', auth.checkLoggedIn("/logout"), (req, res, next)=> {
//   let offerInfo = {};
//   console.log(req.body.makeoffer);
//   if (req.body.makeoffer.val() !== 0) {
//     offerInfo = {
//       currentOffer: req.body.makeoffer.val(),
//       bidder: req.user._id
//     };
//   }
//   console.log(offerInfo);
//   console.log(req.params.id);
//
//   Item.findByIdAndUpdate(req.params.id, {$push:{currentOffers: offerInfo}}, (err, item) => {
//     if (err) next(err);
//     console.log("change saved");
//     res.redirect("/items",{item: item[0]});
//   });
//
// });


module.exports = itemsController;
