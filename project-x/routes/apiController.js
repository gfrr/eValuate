const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/item');
const Feedback = require("../models/feedback");
const Expert = require("../models/expert");

router.route("/test", (req, res, next) => {
	res.render("test");
});


router.route('/users')
	.get((req, res) => {
	  User.find((error, users) => {
	  	if (error) res.status(500).json({message: error});
	  	 else res.status(200).json(users);
	  });
	});

router.get("/experts", (req, res, next)=> {
	Expert.find((error, users) => {
		if (error) res.status(500).json({message: error});
		 else res.status(200).json(users);
	});
});

router.get("/experts/:experts_id", (req, res, next)=> {
	Expert.find({"userId": req.params.experts_id}, (error, users)=>{
		if (error) res.status(500).json({message: error});
		 else res.status(200).json(users[0]);
	});
});

  router.route('/items')
  	.get((req, res) => {
  	  Item.find((error, items) => {
  	  	if (error) res.status(500).json({message: error});
  	  	 else res.status(200).json(items);
  	  });
  	});

    router.route('/feedbacks')
    	.get((req, res) => {
    	  Feedback.find((error, feedbacks) => {
    	  	if (error) res.status(500).json({message: error});
    	  	 else res.status(200).json(feedbacks);
    	  });
    	});


router.get('/users/:user_id', (req, res) => {
		User.findById(req.params.user_id, (error, user) => {
			if (error) {
				res.status(500).json({message: error});
			} else {
				console.log(user);
				res.status(200).json(user);
			}
		});
	});

router.patch("/users/:user_id", (req, res) => {
		let itemId;
		for(let prop in req.body){
			itemId = prop;
		}
		User.findByIdAndUpdate(req.params.user_id, {$pull:{itemsUser: itemId}}, (err, user) => {
			if(err) res.status(500).json({message: err});
			else res.status(200).json("user updated");
	  });
	});

	router.get('/items/:item_id', (req,res)=>{
		Item.findById(req.params.item_id, (error, item) => {
			if (error) res.status(500).json({message: error});
			 else res.status(200).json(item);
		});
	});

	router.get("/items/:user_id/items_user", (req, res)=>{
		Item.find({userId: req.params.user_id}, (error, items)=>{
			if (error) res.status(500).json({message: error});
			 else res.status(200).json(items);
		});
	});
	router.delete("/items/:item_id", (req, res)=> {
		Item.findByIdAndRemove(req.params.item_id, (error)=> {
			 if(error) res.status(500).json({message: error});
			 else res.status(200).json("item deleted");

		});
	});

	router.patch("/items/:item_id", (req, res) => {
			console.log("patch called");
			console.log(req.body);
			Item.findByIdAndUpdate(req.params.item_id, {$push:{currentOffers: req.body}}, {new: true}, (err, user) => {
				if(err) res.status(500).json({message: err});
				else res.status(200).json("user updated");
		  });
		});
  // router.route('/search')
  // 	.get((req, res) => {
  // 		const latitude = req.query.lat;
  // 		const longitude = req.query.lng;
  // 		const maxDistance = req.query.dis;
  // 		Restaurant.where('location')
  // 							.near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance })
  // 							.find((error, restaurants) => {
  // 								if (error) {
  // 									res.status(500).json({message: error});
  // 								} else {
  // 									res.status(200).json(restaurants);
  // 								}
  // 							});
  //


router.get("/users/email/:id",(req,res)=>{
	User.find({"email": req.params.id}, (err, user)=>{
		if(err) res.status(500).json({message: err});
		else res.status(200).json(user[0]);
	});
});

module.exports = router;
