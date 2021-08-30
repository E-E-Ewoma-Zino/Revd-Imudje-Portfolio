// for all the code that helps with buying
const Client = require(__dirname + "../../model/Client");

module.exports = {
	buy: (data, callback)=>{
		Client.create({
			book: data.book,
			status: data.status,
			tx_ref: data.tx_ref,
			transaction_id: data.transaction_id
		}, (err)=>{
			if(err){
				console.log(":::", err);
				callback(err, null);
			}
			else{
				callback(null, true);
			}
		});
	},
	// just in case
	hasPayed: (transaction_id, callback)=>{
		Client.findOne({transaction_id: transaction_id}, (err, transaction)=>{
			if(err){
				console.log(":::", err);
				callback(err, null);
			}
			else{
				callback(null, transaction);
			}
		});
	}
}