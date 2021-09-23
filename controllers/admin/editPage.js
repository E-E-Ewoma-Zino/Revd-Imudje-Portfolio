// Components for editing a page
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res)=>{
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
						res.render("admin/editpage", {
							title: page.title.home,
							page: page,
							bird: _bird.fly,
							books: books? books : []
						});
					}
				});
			}
		});
	},
	post: (req, res) => {
		res.redirect("/admin/editPage");
	}
}