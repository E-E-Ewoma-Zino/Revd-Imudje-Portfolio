// Components for general settings
const { authLevel } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");
const _settings = require("../../middleware/settings");

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
		console.log(req.query);
		// get the type of query that was sent
		const requestType = req.query.q;

		switch (requestType) {
			case "changePassword":
				_settings.changePassword(req.body, (cangePassword_err, done) => {
					if (cangePassword_err) {
						if (cangePassword_err.name = "IncorrectPasswordError") {
							// send incorrect password if the error is caused by incorrect password
							return res.send("Incorrect Password");
						}
						// else send false to show bad error occured
						return res.send("false");
					}
					// send true if all went well
					return res.send("true");
				});
				break;
			case "updateCarousel":
				_settings.updateCarousel(req.body, (updateCarousel_err, done) => {
					if (updateCarousel_err) {
						_bird.message("danger", updateCarousel_err);
						return res.send(false);
					}
					else if (done) {
						return res.send(true);
					}
					else {
						return res.send(false);
					}
				});
				break;
			case "updateContact":
				console.log("updateContact");
				_settings.updateContact(req.body, (updateContact_err, done) => {
					if (updateContact_err) {
						_bird.message("danger", updateContact_err);
						return res.send(false);
					}
					else if (done) {
						return res.send(true);
					}
					else {
						return res.send(false);
					}
				});
				break;
			default:
				console.log("switch_err::", requestType, "is invalid");
				error500(req, res);
				break;
		}
	}
}