// controlls all the routes for the home page
const emailTemplate = require("../../components/emailTemplate");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");
const email = require("../../config/email");
const messages = require("../../middleware/messages");

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
				from: `${req.body.name} <${req.body.email}>`,
				to: "info@drimudjejp.com",
				subject: `Message from ${req.body.name}`,
				text: req.body.message,
				html: emailTemplate({logoUrl: "www.mm.com", fromMail: req.body.email, title: `Message from ${req.body.name}`, body: req.body.message, footer: "www.rev-imudje.com"})
			}, (email_err, info)=>{
				if(email_err){
					_bird.message("danger", "Failed to send mail!");
				}
				else if(null){
					_bird.message("danger", "No internet connection");
				}
				else{
					_bird.message("success", "Your mail has been sent.");
					console.log("info", info);
					console.log("Email sent>>");
					// add message to db
					messages.create({name: req.body.name, email: req.body.email, message: req.body.message}, (createMessage_err, done)=>{
						if(createMessage_err){
							return error500(req, res);
						}
					});
				}
				res.redirect("back");
			});
		});
	}
}