//  this file will house all of our logic for creating, retrieving, updating, and deleting ... CRUD

const Task = require("../models/tasks.model");

// - for the faker -
const { faker } = require("@faker-js/faker");
const fakerId = faker.datatype.uuid();

// --- function to get all tasks
module.exports.findAllTasks = (req, res) => {
  // ...retrieve an array of all documents in the task collection
  Task.find({})
    .then(allDaTasks => res.json(allDaTasks))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single task
module.exports.findOneSingleTask = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then(oneSingleTask => res.json({ task: oneSingleTask }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// // --- a function to get a random single task
// module.exports.findOneSingleRandomTask = (req, res) => {
//   let random = Math.floor(Math.random() * (Task.length))
//   // (Math.floor(Task.length/2))
// 	Task.findOne().skip(random) 
// 		.then(oneSingleTask => res.json({ task: oneSingleTask }))
// 		.catch(err => res.json({ message: "Oh no", error: err }));
// };

// --- function to create a task
module.exports.createNewTask = (req, res) => {
  Task.create(req.body)
    .then(newlyCreatedTask => res.json({ task: newlyCreatedTask }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to update a task
module.exports.updateExistingTask = (req, res) => {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true , runValidators:true})
    .then(updatedTask => res.json({ task: updatedTask }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
// ------------------------------

// --- function to delete a task
module.exports.deleteAnExistingTask = (req, res) => {
  Task.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};



