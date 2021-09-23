// Script to controll the user function
const Users = require("../model/Users")

module.exports = {
	ownBook: (userId, bookId, callback) => {
		Users.updateOne({ _id: userId }, { $push: { ownedBooks: bookId } }, (userUpdate_err, done) => {
			if (userUpdate_err) {
				console.log(":::userUpdate_err", userUpdate_err);
				callback(userUpdate_err, null);
			} else {
				callback(null, done);
			}
		});
	}
}