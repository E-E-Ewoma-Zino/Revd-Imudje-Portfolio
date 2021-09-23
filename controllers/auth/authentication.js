// controlls all the authentication for the users
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");
const Users = require("../../model/Users");
const passport = require("passport");

module.exports = {
	register: (req, res) => {
		console.log("body", req.body);

		Users.register({ username: req.body.username }, req.body.password, (register_err, user) => {
			if (register_err) {
				console.log(":::register_err", register_err);
				_bird.message("danger", register_err);
				res.redirect("back");
			} else {
				passport.authenticate("local")(req, res, () => {
					_bird.message("success", "Successful Registered");
					res.redirect("back");
				});
			}
		});
	},
	login: (req, res, next) => {
		// LogIn a user
		// I am using the passport custom callback to authenticate the user
		passport.authenticate("local", function (logIn_err, user, info) {
			// if any exceptions happen, come here
			if (logIn_err) {
				_bird.message("danger", logIn_err, info.message);
				console.log("::logIn_err:", logIn_err, info.message);
				return next(logIn_err);
			}
			// if user is not found, come here
			if (!user) {
				_bird.message("danger", info.message);
				console.log("NO USER FOUND!", info.message);
				return res.redirect("back");
			}
			// if everything goes well, come here
			req.logIn(user, function (reqLogIn_err) {
				if (reqLogIn_err) {
					_bird.message("danger", reqLogIn_err);
					console.log("::reqLogIn_err:", reqLogIn_err);
					return next(reqLogIn_err);
				}
				_bird.message("success", "Welcome back " + req.user.username);
				return res.redirect("back");
			});
		})(req, res, next);
	},
	logOut: (req, res)=>{
		_bird.message("primary", "Bye " + req.user.username);
		req.logOut();
		res.redirect("back");
	}
}