//  this file will house all of our logic for creating, retrieving, updating, and deleting ... CRUD
const Message = require("../models/messages.model")

// --- function to get all messages
module.exports.findAllMessages = (req, res) => {
    // ...retrieve an array of all documents in the message collection
    Message.find({}).populate('user')
        .then(allMessages => res.json(allMessages))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to get a single message
module.exports.findOneSingleMessage = (req, res) => {
    Message.findOne({ _id: req.params.id })
        .then(oneSingleMessage => res.json({ message: oneSingleMessage }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to create a Message
module.exports.createNewMessage = (req, res) => {
    console.log(req.body)
    Message.create(req.body)
        .then(newlyCreatedMessage => res.json({ message: newlyCreatedMessage }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// --- function to create a Message
module.exports.createNewMsg = (req, res) => {
    const { username } = req.body;
    Message.create(req.body)
        .then(newlyCreatedMessage => res.json({ message: newlyCreatedMessage }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

// module.exports.createNewMsg = (req,res) => {
//     console.log(req.body)
//     Message.create(req.body)
//     .then(newMsg => res.json(newMsg))
//     .catch(err => res.status(400).json(err))
// }


// --- function to delete a message
module.exports.deleteAnExistingMessage = (req, res) => {
    Message.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAllMessages = (req, res) => {
    Message.deleteMany({})
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};



