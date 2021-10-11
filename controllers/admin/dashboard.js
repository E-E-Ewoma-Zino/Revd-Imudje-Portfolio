// Components for dashboard
const { authLevel } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");

module.exports = (req, res) => {
	// check if the user is authorized and if the user is the admin
	if (!authLevel(req))	return res.redirect("back");

	res.render("admin/dashboard", {
		title: "admin",
		bird: _bird.fly
	});
}