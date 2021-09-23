// controlls all the routes for the home page
const _bird = require(__dirname + "../../../middleware/messageBird");
const _client = require(__dirname + "../../../middleware/client");
const _books = require(__dirname + "../../../middleware/books");
const error500 = require(__dirname + "../../errors/error500");
const _page = require(__dirname + "../../../middleware/page");

module.exports = (req, res) => {
	_page.getPage((page_err, page) => {
		if (page_err) {
			console.log(page_err);
			error500(req, res);
		}
		else {
			_books.allBooks((err, books) => {
				if (err) {
					console.log(":::", err);
					error500(req, res);
				}
				else {
					res.render("index", {
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
}