// Components for login to the admin
const _bird = require("../../middleware/messageBird");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res) => {
		// Remove the user from login if they are already logedin
		if (req.isAuthenticated()) {
			_bird.message("warning", "You are already logedin. Try loging out!");
			return res.redirect("back");
		}

		_page.getPage((page_err, page)=>{
			if(page_err){
				_bird.message("danger", page_err);
				return error500(req, res);
			}
			else{
				res.render("admin/logIn", {
					title: "LogIn",
					page: page,
					bird: _bird.fly
				});
			}
		});
	},
	post: (req, res) => {
		console.log(req.body);
		res.redirect("/admin/dashboard");
	}
}