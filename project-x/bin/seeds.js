const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Item = require("../models/item");
const Feedback = require("../models/feedback");

mongoose.connect('mongodb://localhost:27017/antiques');

//returns an array of random users with the userType role
function createUserType(number, userType, password = "test", name = faker.name.findName()){
  let users = [];
  for(let i = 0; i < number; i++){
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

//creates an item
function createItem(){
  let keywords = [];
  let images = [];
  let address = faker.helpers.createCard().address;
  for(let j = 0; j < Math.floor(Math.random() * 4) + 1; j++){
    keywords.push(faker.commerce.productAdjective);
    images.push(faker.image.image());
  }
  const item = {
    title: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    type: faker.commerce.product(),
    keywords: keywords,
    images: images,
    approxAge: Math.floor(Math.random() * 1000),
    userId: undefined,

  };
  return item;
}

//generating admin => USER: Admin PW: demigod
const Admin = User(createUserType(1, "Admin", "demigod", "Admin")[0]);
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
    if (!error) {
        Item.find({"title": item.title})
            .populate('userId')
            .exec((error, items) => {
              console.log(item);
            });
          }
    });
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
