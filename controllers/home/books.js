// Controlls all the routes consigning the books
const error500 = require(__dirname + "../../errors/error500");
const _bird = require(__dirname + "../../../middleware/messageBird");
const _books = require(__dirname + "../../../middleware/books");
const _client = require(__dirname + "../../../middleware/client");
const _page = require(__dirname + "../../../middleware/page");

module.exports = {
	get: (req, res) => {
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
						res.render("books", {
							title: page.title.books,
							page: page,
							bird: _bird.fly,
							books: books ? books : []
						});
					}
				});
			}
		});
	},
	// I don't want to create another folder for the books/:bookName
	buy: {
		get: (req, res) => {
			// to store the book that the user is selecting
			let theBook;

			_page.getPage((page_err, page) => {
				if (page_err) {
					console.log(page_err);
					error500(req, res);
				}
				else {
					_books.allBooks((book_err, books) => {
						if (book_err) {
							console.log(":::", book_err);
							error500(req, res);
						}
						else if (books) {
							books.forEach(book => {
								if(book._id == req.query.pq){
									theBook = book;
								}
							});
							res.render("buy", {
								page: page,
								bird: _bird.fly,
								theBook: theBook,
								books: books
							});
						}
						else{
							console.log(":::Err in books.buy: allBooks fucked up");
							error500(req, res);
						}
					});
				}
			});
		},
		post: (req, res) => {
			console.log(req.body);
			console.log(req.query.pq);
			_client.buy({
				book: req.query.pq,
				status: req.body.status,
				tx_ref: req.body.tx_ref,
				transaction_id: req.body.transaction_id
			}, (err, done) => {
				if (err) {
					console.log(":::", err);
					_bird.message("danger", "Could not save transaction <i class='fa fa-warning'></i>");
					error500(req, res);
				}
				if (done) {
					// after saving the clients details, I check if the purchase was a success then
					// I render an new buy page if it was or...
					if (req.body.status == "successful") {
						_bird.message("success", "Your payment was a success <i class='fa fa-check'></i>");
						_page.getPage((page_err, page) => {
							if (page_err) {
								console.log(page_err);
								error500(req, res);
							}
							else {
								_books.byId(req.query.pq, (book_err, book) => {
									if (book_err) {
										console.log(":::", book_err);
										error500(req, res);
									}
									else {
										res.render("buy", {
											title: book.title,
											page: page,
											bird: _bird.fly,
											book: book ? book : {},
											hasPayed: true
										});
									}
								});
							}
						});
					}
					// ...I return the user back if it but page to re-purchase
					else {
						_bird.message("danger", "Your payment " + req.body.status + " <i class='fa fa-warning'></i>");
						res.redirect("back");
					}
				}
			});
		}
	}
}