//  this file will house all of our logic for creating, retrieving, updating, and deleting ... CRUD

const User = require("../models/users.model");

// - for the faker -
const { faker } = require("@faker-js/faker");
const fakerId = faker.datatype.uuid();

// --- function to get all users
module.exports.findAllUsers = (req, res) => {
  // ...retrieve an array of all documents in the user collection
  User.find({})
    .then(allDaUsers => res.json(allDaUsers))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single user
module.exports.findOneSingleUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(oneSingleUser => res.json({ user: oneSingleUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single user by name
module.exports.findOneSingleUserByName = (req, res) => {
  User.findOne({ username: req.params.username })
    .then(oneSingleUser => res.json({ user: oneSingleUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single user plants --- this is rigth 😍🤩 ---
module.exports.findOneSingleUserPlants = (req, res) => {
  User.findOne({ _id: req.params.id }).populate("plants")
    .then(oneSingleUser => res.json( oneSingleUser.plants ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// // --- a function to get a random single user
// module.exports.findOneSingleRandomUser = (req, res) => {
//   let random = Math.floor(Math.random() * (User.length))
//   // (Math.floor(User.length/2))
// 	User.findOne().skip(random) 
// 		.then(oneSingleUser => res.json({ user: oneSingleUser }))
// 		.catch(err => res.json({ message: "Oh no", error: err }));
// };

// --- function to create a user
module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to update a user
module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// ------------------------------
// findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true}
// module.exports.updateExistingUserPartTow = (req, res) => {
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true , runValidators:true})
//     .then(updatedUser => res.json({ user: updatedUser }))
//     .catch(err => res.json({ message: "Something went wrong", error: err }));
// };
// ------------------------------

// --- function to delete a user
module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};



