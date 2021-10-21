// Controlls all the routes consigning the books
const { userOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res) => {
		// check if the user is authenticated
		if (!userOnly(req)) return res.redirect("back");

		_page.getPage((page_err, page) => {
			if (page_err) {
				console.log(page_err);
				error500(req, res);
			}
			else {
				// TODO: use all books to create books you may like section
				_books.allBooks((err, books) => {
					if (err) {
						console.log(":::", err);
						error500(req, res);
					}
					else {
						res.render("myBooks", {
							user: req.isAuthenticated() && req.user.username,
							books: req.user.ownedBooks,
							title: page.title.books,
							bird: _bird.fly,
							page: page
						});
					}
				});
			}
		});
	}
}