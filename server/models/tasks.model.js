const mongoose = require("mongoose");

// Create a Schema for tasks
// title, price and description
const TaskSchema = new mongoose.Schema({
	taskName: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	isDode: {
		type: Boolean,
	},
	plants:{
		type: mongoose.Types.ObjectId,
        ref: "Plants"
	}

}, { timestamps: true });

// create a constructor function for our model and store in variable 'Task'
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;