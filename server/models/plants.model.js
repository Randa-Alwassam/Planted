const mongoose = require("mongoose");

// Create a Schema for plant
// title, price and description
const PlantSchema = new mongoose.Schema({
	plantName: {
		type: String,
		minlength: [2, "the name must be at least 2 characters long"]
	},
	type: {
		type: String,
		required: true
	},
	plantAge: {
		type: Date,
		required: true
	},

	tasks: [{
		type: mongoose.Types.ObjectId,
        ref: "Task"
	}],
	
	// userId: {
	// 	type: mongoose.Types.ObjectId,
    //     ref: "User"
	// }

}, { timestamps: true });

// create a constructor function for our model and store in variable 'Plant'
const Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;