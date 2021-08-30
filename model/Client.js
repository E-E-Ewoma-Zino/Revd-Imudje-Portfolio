// The module for the clients
const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
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

module.exports = new mongoose.model("Client", clientSchema);