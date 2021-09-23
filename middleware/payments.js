// for all the code that helps with buying
const Payments = require("../model/Payments");

module.exports = {
	createPayment: (data, callback)=>{
		Payments.create({
			book: data.book,
			user: data.user,
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
	}
}