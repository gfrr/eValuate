const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Item = require("../models/item");
const Feedback = require("../models/feedback");
const Expert = require("../models/expert");

mongoose.connect('mongodb://localhost:27017/antiques');

//returns an array of random users with the userType role
function createUserType(number, userType,  password = "test" ){
  let users = [];

  for(let i = 0; i < number; i++){
    name = faker.name.findName();
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const address = faker.helpers.createCard().address;
    users.push({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email: faker.internet.email(name),
      password: hashPass,
      address: {
        street: address.streetC,
        city: address.city,
        country: address.country,
        coordinates: [Number(address.geo.lat), Number(address.geo.lng)],
      },
      role: userType,
      itemsUser: [],
    });
  }
  return users;
}

//returns an array of random images depending on the type passed (i.e coin || stamp)
function randomImage(type){
  let images = [];
  if(type == "coin") images.push({image: `/images/coins/c${Math.floor(Math.random()*19)+1}.jpg`});
  else images.push({image: `/images/stamps/s${Math.floor(Math.random()*28)+1}.jpg`});
  return images;
}


//creates an item
function createItem(){
  let keywords = [];
  let images = [];
  let type = Math.floor(Math.random()*2) ? "coin" : "stamp";
  let address = faker.helpers.createCard().address;
  for(let j = 0; j < Math.floor(Math.random() * 4) + 1; j++){
    keywords.push(faker.commerce.productAdjective());
    images.push(faker.image.image());
  }
  const item = {
    title: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    type: type,
    keywords: keywords,
    images: randomImage(type),
    approxAge: Math.floor(Math.random() * 1000),
    userId: undefined,
    status: "NotEvaluated",
    currentOffers: [],

  };
  return item;
}


//generating admin => USER: Admin PW: demigod"
let salt = bcrypt.genSaltSync(bcryptSalt);
let hashPass = bcrypt.hashSync("demigod", salt);
let address = faker.helpers.createCard().address;
const Admin = User({
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@admin.com",
  password: hashPass,
  address: {
    street: address.streetC,
    city: address.city,
    country: address.country,
    coordinates: [Number(address.geo.lat), Number(address.geo.lng)],
  },
  role: "Admin",
  itemsUser: [],
});
Admin.save();

function generateOwnersAndItems(number){
for(var i = 0; i < number; i++){
  let userData = createUserType(1, "Owner")[0];
  let user = User(userData);
  var test;
  user.save();
  let itemData = createItem();
  itemData.userId = user._id;
  console.log(itemData);
  let item = Item(itemData);
  item.save((error) => {
    if (!error) Item.find({"title": item.title}).populate('userId');
    });
  user.itemsUser = item._id;
  console.log(user);
  }
}

/*
const expertSchema = new Schema({
  cv: String,
  photo: String,
  website: String,
  focus: [], // i.e. Stamps, Coins etc. It can be one or more.
  pending: [],
  completed: [],
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
*/

function generateExpert(){
  
}

function generateExperts(number){
  for(var i = 0; i < number; i++){
    let userData = createUserType(1, "Professional")[0];
    let user = User(userData);
    var test;
    user.save();
    let expertData = createExpert();
    expertData.userId = user._id;
    console.log(itemData);
    let item = Item(itemData);
    Expert.save((error) => {
      if (!error) Item.find({"title": item.title}).populate('userId');
      });
    user.itemsUser = item._id;
    console.log(user);
    }
}

//initializing db with fake data
generateOwnersAndItems(30);
const usersData = createUserType(20, "User");
const professionalsData = createUserType(15, "Professional");


User.create(usersData, (err, docs)=> {
  if(err) throw err;
});
User.create(professionalsData, (err, docs)=> {
  if(err) { throw err;}
  mongoose.connection.close();
});
