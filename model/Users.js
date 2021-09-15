// The module for the users
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	book: {
		ref: "Book",
		type: mongoose.Schema.Types.ObjectId
	},
	status: String,
	tx_ref: String,
	transaction_id: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("User", userSchema);