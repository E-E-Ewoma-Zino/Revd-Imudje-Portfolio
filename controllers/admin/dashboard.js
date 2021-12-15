// Components for dashboard
const { adminOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _page = require("../../middleware/page");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _payments = require("../../middleware/payments");

module.exports = (req, res) => {
	// check if the user is authorized and if the user is the admin
	if (!adminOnly(req)) return res.redirect("back");

	_page.getPage((page_err, page) => {
		if (page_err) {
			_bird.message("danger", page_err);
			return error500(req, res);
		}
		else {
			_payments.all((payment_err, payments) => {
				if (payment_err) {
					_bird.message("danger", payment_err);
					return error500(req, res);
				}
				_books.allBooks((allBooks_err, books) => {
					if (allBooks_err) {
						_bird.message("danger", allBooks_err);
						return error500(req, res);
					}

					return res.render("admin/dashboard", {
						title: "admin",
						bird: _bird.fly,
						books: books,
						page: page,
						payments: payments
					});
				});
			});
		}
	});
}