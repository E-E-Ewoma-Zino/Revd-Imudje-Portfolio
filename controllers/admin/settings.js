// Components for general settings
const { authLevel } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res) => {
		// check if the user is authorized and if the user is the admin
		if (!authLevel(req))	return res.redirect("back");

		_page.getPage((page_err, page) => {
			if (page_err) {
				console.log(page_err);
				error500(req, res);
			}
			else {
				res.render("admin/settings", {
					title: "Admin",
					page: page,
					bird: _bird.fly,
				});
			}
		});
	},
	post: (req, res) => {
		console.log(req.body);
		res.redirect("/admin/editPage");
	}
}