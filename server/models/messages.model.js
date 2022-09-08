const mongoose = require("mongoose");

// Create a Schema for Messages
// title, price and description
const MessageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
        required:true,
	},
	message: {
		type: String,
        required:true,
	},
	image:String,

}, { timestamps: true });

// create a constructor function for our model and store in variable 'Message'
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;