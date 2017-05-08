const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/item');
const Feedback = require("../models/feedback");

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


router.route('/users/:user_id')
	.get((req, res) => {
		User.findById(req.params.user_id, (error, user) => {
			if (error) res.status(500).json({message: error});
			 else res.status(200).json(user);
		});
	});

	router.route('/items/:item_id').get((req,res)=>{
		Item.findById(req.params.item_id, (error, item) => {
			if (error) res.status(500).json({message: error});
			 else res.status(200).json(item);
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
  // 	})


module.exports = router;
