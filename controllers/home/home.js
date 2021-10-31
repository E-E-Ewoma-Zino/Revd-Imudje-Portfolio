// controlls all the routes for the home page
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");
const email = require("../../config/email");

module.exports = {
	get: (req, res) => {
		_page.getPage((page_err, page) => {
			if (page_err) {
				console.log(page_err);
				_bird.message("danger", page_err);
				error500(req, res);
			}
			else {
				_books.allBooks((err, books) => {
					if (err) {
						console.log(":::", err);
						error500(req, res);
					}
					else {
						return res.render("index", {
							user: req.isAuthenticated() && req.user.username,
							books: books ? books : [],
							title: page.title.home,
							bird: _bird.fly,
							page: page
						});
					}
				});
			}
		});
	},
	post: (req, res)=>{
		_page.getPage((page_err, page)=>{
			if(page_err){
				_bird.message("danger", page_err);
				return error500(req, res);
			}

			// Sending Email using nodemailer
			email({
				from: `${page.aboutMe.names.title} ${page.aboutMe.names.lastName} <${req.body.email}>`,
				to: "eewoma75@gmail.com",
				subject: `Message from ${req.body.name}`,
				text: req.body.message,
				html: req.body.message
			}, (accessToken_err, email_err, info)=>{
				if(email_err){
					_bird.message("danger", "Failed to send mail!");
				}
				else if(accessToken_err){
					_bird.message("danger", "No internet connection");
				}
				else{
					_bird.message("success", "Your mail has been sent.");
					console.log("info", info);
					console.log("Email sent>>");
				}
				res.redirect("back");
			});
		});
	}
}