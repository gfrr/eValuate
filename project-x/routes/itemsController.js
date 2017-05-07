const express = require('express');
const itemsController = express.Router();

const auth = require("../helpers/auth");
const passport = require("../helpers/passport");
const flash    = require("connect-flash");

const User= require("../models/user");
const Item= require("../models/item");


//Item  edit info

  itemsController.post("item/:id", auth.checkLoggedIn("/logout"), (req, res, next)=> {
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
      res.redirect("/item",{item: item[0]});
    });
  });

  itemsController.post('/:id/delete', (req, res, next) => {
    const id = req.params.id;

    Item.findByIdAndRemove(id, (err, item) => {
      if (err){ return next(err); }
      return res.redirect('/items');
    });

  });
