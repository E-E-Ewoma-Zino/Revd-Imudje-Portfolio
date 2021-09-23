// The module for the payments
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
	book: {
		ref: "Book",
		type: mongoose.Schema.Types.ObjectId
	},
	user: {
		ref: "User",
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

module.exports = new mongoose.model("Payment", paymentSchema);