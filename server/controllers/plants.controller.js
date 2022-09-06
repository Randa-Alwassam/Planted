//  this file will house all of our logic for creating, retrieving, updating, and deleting ... CRUD
var mongoose = require('mongoose');
const Plant = require("../models/plants.model");

// - for the faker -
const { faker } = require("@faker-js/faker");
const fakerId = faker.datatype.uuid();

// --- function to get all plants
module.exports.findAllPlants = (req, res) => {
  // ...retrieve an array of all documents in the plant collection
  Plant.find({})
    .then(allDaPlants => res.json(allDaPlants))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single plant
module.exports.findOneSinglePlant = (req, res) => {
  Plant.findOne({ _id: req.params.id })
    .then(oneSinglePlant => res.json({ plant: oneSinglePlant }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single plant --- 😍🤩 ---
module.exports.findPlantTasks = (req, res) => {
  Plant.findOne({ _id: req.params.id }).populate("tasks")
    .then(oneSinglePlant => res.json(oneSinglePlant.tasks))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// // --- function to get a all plants for one user
// module.exports.findPlantsOfUser = (req, res) => {
//   // var id = mongoose.Types.ObjectId(req.params.id);
//   // console.log(id);
//   Plant.findById({ userId: req.params.id })
//     .then(Plants => res.json(Plants))
//     .catch(err => res.json({ message: "Something went wrong", error: err }));
// };


// // --- a function to get a random single plant
// module.exports.findOneSingleRandomPlant = (req, res) => {
//   let random = Math.floor(Math.random() * (Plant.length))
//   // (Math.floor(Plant.length/2))
// 	Plant.findOne().skip(random) 
// 		.then(oneSinglePlant => res.json({ plant: oneSinglePlant }))
// 		.catch(err => res.json({ message: "Oh no", error: err }));
// };

// --- function to create a plant
module.exports.createNewPlant = (req, res) => {
  Plant.create(req.body)
    .then(newlyCreatedPlant => res.json({ plant: newlyCreatedPlant }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to update a plant
module.exports.updateExistingPlant = (req, res) => {
  Plant.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true , runValidators:true})
    .then(updatedPlant => res.json({ plant: updatedPlant }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// ------------------------------
// findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true}
// module.exports.updateExistingPlantPartTow = (req, res) => {
//   Plant.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true , runValidators:true})
//     .then(updatedPlant => res.json({ plant: updatedPlant }))
//     .catch(err => res.json({ message: "Something went wrong", error: err }));
// };
// ------------------------------

// --- function to delete a plant
module.exports.deleteAnExistingPlant = (req, res) => {
  Plant.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};



