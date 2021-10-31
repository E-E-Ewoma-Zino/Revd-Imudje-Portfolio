// Controlls all the routes consigning the books
const { userOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const _users = require("../../middleware/users");
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
				_books.allBooks((books_err, books) => {
					if (books_err) {
						console.log(":::books_err", books_err);
						error500(req, res);
					}
					else {
						_users.mybook(req.user._id, (ownBooks_err, userBooks)=>{
							if(ownBooks_err){
								_bird.message("danger", ownBooks_err);
								return error500(req, res);
							}
							else{
								return res.render("myBooks", {
									user: req.isAuthenticated() && req.user.username,
									myBooks: userBooks,
									title: page.title.books,
									bird: _bird.fly,
									books: books,
									page: page
								});
							}
						});
					}
				});
			}
		});
	}
}