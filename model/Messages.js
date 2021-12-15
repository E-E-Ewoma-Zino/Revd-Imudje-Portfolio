// The module for the messages
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
	name: String,
	email: String,
	message: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("Message", messageSchema);