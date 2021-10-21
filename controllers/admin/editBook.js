// Components for editing books in the admin route
const { adminOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
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
				_books.allBooks((book_err, books) => {
					if (book_err) {
						console.log("::book_err:", book_err);
						_bird.message("danger", book_err);
						error500(req, res);
					} else {
						_books.byId(req.query.pq, (singleBook_err, theBook) => {
							if (singleBook_err) {
								console.log("singleBook_err", singleBook_err);
								_bird.message("danger", singleBook_err);
								error500(req, res);
							}
							else {
								res.render("admin/editbook", {
									title: "admin",
									bird: _bird.fly,
									books: books,
									page: page,
									theBook: theBook
								});
							}
						});
					}
				});
			}
		});
	},
	// Update a book using this route
	post: (req, res) => {
		const updatedBook = req.body;

		_books.update(req.query.pq, updatedBook, (bookUpdate_err)=>{
			if(bookUpdate_err){
				_bird.message("danger", bookUpdate_err);
				return error500(req, res);
			}
			else{
				_bird.message("success", "Updated book successfully");
				return res.redirect("back");
			}
		});
	}
}