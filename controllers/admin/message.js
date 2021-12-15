// Components for message
const { adminOnly } = require("../auth/authentication");
const _payments = require("../../middleware/payments");
const _messages = require("../../middleware/messages");
const _bird = require("../../middleware/messageBird");
const _page = require("../../middleware/page");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res) => {
		// check if the user is authorized and if the user is the admin
		if (!adminOnly(req)) return res.redirect("back");
	
		_page.getPage((page_err, page) => {
			if (page_err) {
				_bird.message("danger", page_err);
				return error500(req, res);
			}
			else {
				_payments.all((allPayment_err, payments) => {
					if (allPayment_err) {
						_bird.message("danger", allPayment_err);
						return error500(req, res);
					}
					_messages.allMessages((message_err, messages) => {
						if (message_err) {
							_bird.message("danger", message_err);
							return error500(req, res);
						}
						_books.allBooks((allBooks_err, books) => {
							if (allBooks_err) {
								_bird.message("danger", allBooks_err);
								return error500(req, res);
							}
		
							return res.render("admin/messages", {
								title: "admin",
								bird: _bird.fly,
								books: books,
								page: page,
								payments: payments,
								messages: messages
							});
						});
					});
				});
			}
		});
	},
	post: (req, res)=>{
		_messages.delete((err, done)=>{
			if(err){
				return error500(req, res);
			}
			else{
				return res.redirect("back");
			}
		});
	}
}