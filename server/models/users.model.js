const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
// Create a Schema for user
// title, price and description
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: [2, "the name must be at least 2 characters long"],
		unique: true
	},
	plants: [{
		type: mongoose.Types.ObjectId,
        ref: "Plant"
	}],

}, { timestamps: true });
UserSchema.plugin(uniqueValidator, { message: 'The name already exist in database, try use another one..' });
// create a constructor function for our model and store in variable 'User'
const User = mongoose.model("User", UserSchema);

module.exports = User;