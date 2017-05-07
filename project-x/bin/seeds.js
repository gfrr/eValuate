
const mongoose = require('mongoose');
const faker = require("faker");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Item = require("../models/item");
const Feedback = require("../models/feedback");


mongoose.connect('mongodb://localhost:27017/antiques');

function createUser(userType){
  const name = faker.name.findName();
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync('test', salt);
  const address = faker.helpers.createCard().address;
  const user = {
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
  };
  return user;
}

//returns an array of random users with the userType role
function createUserType(number, userType){
  let users = [];
  for(let i = 0; i < number; i++){
    const name = faker.name.findName();
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync('test', salt);
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
    });
  }
  return users;
}

//returns an array of random items
function createItems(number){
    let items = [];

    for(let i = 0; i < number; i++){
      let keywords = [];
      let images = [];
      let address = faker.helpers.createCard().address;
      for(let j = 0; j < Math.floor(Math.random() * 4) + 1; j++){
        keywords.push(faker.commerce.productAdjective);
        images.push(faker.image.image());
      }
      items.push({
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        type: faker.commerce.product(),
        keywords: keywords,

        images: images,
        approxAge: Math.floor(Math.random() * 1000),
        coordinates: [Number(address.geo.lat), Number(address.geo.lng)],
      });
    }
    return items;
}


//initializing db with fake data
const itemsData = createItems(30);
const usersData = createUserType(100, "User");
const ownersData = createUserType(30, "Owner");
const professionalsData = createUserType(10, "Professional");





User.create(ownersData, (err, docs)=> {
  if(err)  throw err;
  // docs.forEach((user, index) =>
});

Item.create(itemsData, (err, docs) => {
  if (err) throw err;
});







User.create(usersData, (err, docs)=> {
  if(err) throw err;
  // docs.forEach((user) => console.log(user.firstName));
});

User.create(professionalsData, (err, docs)=> {
  if(err)  throw err;
  // docs.forEach((user) => console.log(user.firstName));
  mongoose.connection.close();
});
