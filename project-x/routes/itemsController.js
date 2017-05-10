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
          User.find({_id: req.user._id}, (err, user)=> {
            if(err) console.log("Something wrong when updating data!");
            if(user[0].role == "User") user[0].role = "Owner";
            user[0].itemsUser.push(newItem._id);
            user[0].save();
            console.log(user[0]);
          });
          // User.findOneAndUpdate({_id: req.user._id}, {$push:{itemsUser: newItem._id}}, (err, doc) =>{
          //     if(err) console.log("Something wrong when updating data!");
          //     console.log(doc);
          // });
          // User.findOneAndUpdate({_id: req.user._id}, {$set: {status: "Owner"}}, (err, doc)=>{
          //     if(err) console.log("Something wrong when updating data!");
          //     console.log(doc);
          // });
          res.redirect(`/items/${item._id}`);
        }
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



module.exports = itemsController;
