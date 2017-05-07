const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Item = require("../models/item");
const Feedback = require("../models/feedback");


mongoose.connect('mongodb://localhost:27017/antiques');
