// this scritp contains the functions for the settings route
const Page = require("../model/Page");
const Users = require("../model/Users");

module.exports = {
	changePassword: (data, callback) => {
		Users.findOne({ authLevel: 1 }, (user_err, user) => {
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
	},
	updateCarousel: (data, callback)=>{
		Page.updateOne({}, {$set: {carousel: data}}, (updateCarousel_err)=>{
			if(updateCarousel_err){
				console.error("updateCarousel_err::", updateCarousel_err);
				return callback(updateCarousel_err, null);
			}
			return callback(null, true);
		})
	},
	updateContact: (data, callback)=>{
		Page.updateOne({}, {$set: {aboutMe: data}}, (updateContact_err)=>{
			if(updateContact_err){
				console.error("updateContact_err::", updateContact_err);
				return callback(updateContact_err, null);
			}
			return callback(null, true);
		});
	},
	// TODO: delete file when changing
	changeProfile: (data, callback)=>{
		Page.updateOne({}, {$set: {profile: data}}, (updateProfile_err)=>{
			if(updateProfile_err){
				console.error("updateContact_err::", updateProfile_err);
				return callback(updateProfile_err, null);
			}
			return callback(null, true);
		});
	}
}