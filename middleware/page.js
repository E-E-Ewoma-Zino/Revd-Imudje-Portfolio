// stores pages to db and gets them
const Page = require("../model/Page");


module.exports = {
	getPage: (callback) => {
		Page.findOne({}, (err, page) => {
			if (err) {
				console.log(":::", err);
				callback(err, null);
			} else {
				callback(null, page);
			}
		});
	},
	createPage() {
		this.getPage((err, page) => {
			if (err) {
				console.log(":::", err);
			} else {
				if (page) {
					console.log("Set Page");
				} else {
					console.log("New Page");
					const newPage = Page({
						title: require("../page/index").title,
						aboutMe: require("../page/index").aboutMe,
						belives: require("../page/index").belives,
						achievements : require("../page/index").achievements, 
						carousel : require("../page/index").carousel 
					});
					newPage.save();
				}
			}
		});
	},
	dropPage() {
		this.getPage((err, page) => {
			if (err) {
				console.log(":::", err);
			} else {
				Page.deleteOne({_id: page._id}, (pageDelete_err)=>{
					if(pageDelete_err){
						console.log(":::pageDelete_err:", pageDelete_err);
					}
				});
			}
		});
	}
}