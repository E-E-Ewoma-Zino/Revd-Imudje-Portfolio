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
	},
	mybook: (user, callback)=>{
		Users.findOne({_id: user}).populate({
			path: 'ownedBooks',
			populate: {
				path: "image shelf",
				select: "path"
			}
		}).exec((userBook_err, user)=>{
			if(userBook_err){
				console.error("userBook_err::", userBook_err);
				return callback(userBook_err, null);
			}
			else{
				return callback(null, user.ownedBooks);
			}
		});
	},
	changePassword: (data, callback) => {
		Users.findOne({ _id: data.user }, (user_err, user) => {
			if (user_err) {
				return console.error("user_err::", user_err);
			}
			if (user) {
				// using the passport-local-mongoose module, you can use the changePassword function to change the password
				user.changePassword(data.oldPassword, data.newPassword, function (changePassword_err) {
					if (changePassword_err) {
						console.log(":::::", changePassword_err);
						callback(changePassword_err, null);
					} else {
						callback(null, true);
					}
				});
			}
		});
	}
}