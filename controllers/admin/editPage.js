// Components for editing a page
const { authLevel } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");

module.exports = {
	get: (req, res)=>{
		// check if the user is authorized and if the user is the admin
		if (!authLevel(req))	return res.redirect("back");

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
							title: "Admin",
							page: page,
							user: false,
							bird: _bird.fly,
							books: books? books : []
						});
					}
				});
			}
		});
	},
	post: (req, res) => {
		console.log(req.body);
		_page.update(req.body, (pageUpdate_err, done)=>{
			if (pageUpdate_err) {
				_bird.message("danger", pageUpdate_err)
				error500(req, res);
			}
			else {
				res.redirect("/admin/editPage");
			}
		});
	}
}