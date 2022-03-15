// Components for books in the admin route
const { adminOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const _payments = require("../../middleware/payments");
const _messages = require("../../middleware/messages");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res) => {
		// check if the user is authorized and if the user is the admin
		if (!adminOnly(req))	return res.redirect("back");
		_page.getPage((page_err, page)=>{
			if(page_err){
				_bird.message("danger", page_err);
				return error500(req, res);
			}
			else{
				_payments.all((allPayment_err, payments) => {
					if (allPayment_err) {
						_bird.message("danger", allPayment_err);
						return error500(req, res);
					}
					_messages.allMessages((allMessages_err, messages) => {
						if (allMessages_err) {
							_bird.message("danger", allMessages_err);
							return error500(req, res);
						}
	
						_books.allBooks((book_err, books) => {
							if (book_err) {
								console.log("::book_err:", book_err);
								_bird.message("danger", book_err);
								error500(req, res);
							} else {
								res.render("admin/books", {
									title: "admin",
									bird: _bird.fly,
									payments: payments,
									messages: messages,
									books: books,
									page: page
								});
							}
						});
					});
				});
			}
		});
	},
	// delete route calls the delete function from the books middleware
	delete: (req, res) => {
		_books.delete(req.query.dl, (delete_err, done) => {
			if (delete_err) {
				console.log("delete_err:", delete_err);
				_bird.message("danger", delete_err);
				error500(req, res);
			}
			else {
				console.log("book deleted", done);
				res.send(true);
			}
		});
	}
}