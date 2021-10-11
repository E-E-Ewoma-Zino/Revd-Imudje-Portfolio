// Components for login to the admin
const _bird = require("../../middleware/messageBird");

module.exports = {
	get: (req, res) => {
		res.render("admin/logIn", {
			title: "LogIn",
			bird: _bird.fly
		});
	},
	post: (req, res) => {
		console.log(req.body);
		res.redirect("/admin/dashboard");
	}
}