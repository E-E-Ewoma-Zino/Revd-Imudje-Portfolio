// controll message schema
const Messages = require("../model/messages");

module.exports = {
	allMessages: (callback)=>{
		Messages.find({}, (err, messages) => {
			if (err) {
				console.log(":::Messages_err:", err);
				callback(err, null);
			}
			else {
				callback(null, messages);
			}
		});
	},
	findById: (messageId, callback)=>{
		Messages.findById({_id: messageId}, (err, message)=>{
			if(err){
				console.log("messageFindById_err", err);
				callback(err, null);
			}
			else{
				callback(null, message);
			}
		})
	},
	create: ({name: name, email: email, message: message}, callback)=>{
		Messages.create({
			name: name,
			email: email,
			message: message
		}, (err, done)=>{
			if(err){
				console.log(":::createMessage_err:", err);
				callback(err, null);
			}
			else{
				callback(null, done);
			}
		});
	},
	delete: (callback)=>{
		Messages.deleteMany({}, (err)=>{
			if(err){
				console.log("deleteMessage_err:", err);
				callback(err, null);
			}else{
				callback(null, true);
			}
		});
	}
}