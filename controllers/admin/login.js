// Components for login to the admin
const _bird = require("../../middleware/messageBird");

module.exports = {
	get: (req, res) => {
		// Remove the user from login if they are already logedin
		if (req.isAuthenticated()) {
			_bird.message("warning", "You are already logedin. Try loging out!")
			return res.redirect("back");
		}

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