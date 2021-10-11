// Components for books in the admin route
const { authLevel } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res) => {
		// check if the user is authorized and if the user is the admin
		if (!authLevel(req))	return res.redirect("back");
		
		_books.allBooks((book_err, books) => {
			if (book_err) {
				console.log("::book_err:", book_err);
				_bird.message("danger", book_err);
				error500(req, res);
			} else {
				res.render("admin/books", {
					title: "admin",
					bird: _bird.fly,
					books: books
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