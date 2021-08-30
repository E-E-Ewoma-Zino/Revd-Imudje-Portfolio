// stores pages to db and gets them
const Page = require(__dirname + "../../model/Page");


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
						title: require(__dirname + "../../page/index").title,
						aboutMe: require(__dirname + "../../page/index").aboutMe,
						belives: require(__dirname + "../../page/index").belives,
						acheivements: require(__dirname + "../../page/index").acheivements
					});
					newPage.save();
				}
			}
		});
	}
}