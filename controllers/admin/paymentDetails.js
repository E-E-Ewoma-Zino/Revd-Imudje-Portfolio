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
			_payments.all((allPayment_err, payments) => {
				if (allPayment_err) {
					_bird.message("danger", allPayment_err);
					return error500(req, res);
				}

				_payments.find(req.query.ci, (payment_err, payment) => {
					if (payment_err) {
						_bird.message("danger", payment_err);
						return error500(req, res);
					}
					_books.allBooks((allBooks_err, books) => {
						if (allBooks_err) {
							_bird.message("danger", allBooks_err);
							return error500(req, res);
						}

						return res.render("admin/paymentDetails", {
							title: "Payment Details",
							bird: _bird.fly,
							books: books,
							page: page,
							payments: payments,
							payment: payment
						});
					});
				});
			});
		}
	});
}