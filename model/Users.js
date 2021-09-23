// The module for the users
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	// Things needed for all user Schema
	username: String,
	password: String,
	// things need for a user for this site
	book: {
		ref: "Book",
		type: mongoose.Schema.Types.ObjectId
	},
	status: String,
	tx_ref: String,
	transaction_id: String,
	// Things needed for all user Schema
	createdAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);