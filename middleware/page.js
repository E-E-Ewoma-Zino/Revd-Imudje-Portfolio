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
						book: require("../page/index").book,
						title: require("../page/index").title,
						believes: require("../page/index").believes,
						aboutMe: require("../page/index").aboutMe,
						carousel: require("../page/index").carousel,
						achievements: require("../page/index").achievements
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
				Page.deleteOne({ _id: page._id }, (pageDelete_err) => {
					if (pageDelete_err) {
						console.log(":::pageDelete_err:", pageDelete_err);
					}
				});
			}
		});
	},
	update(data, callback) {
		Page.replaceOne({}, data, (pageUpdate_err) => {
			if (pageUpdate_err) {
				console.log(":::pageUpdate_err", pageUpdate_err);
				callback(pageUpdate_err, null);
			} else {
				callback(null, true);
			}
		});
	}
}