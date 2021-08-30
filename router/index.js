const error500 = require(__dirname + "../../controllers/error500");
const _bird = require(__dirname + "../../middleware/messageBird");
const _books = require(__dirname + "../../middleware/books");
const _client = require(__dirname + "../../middleware/client");
const _page = require(__dirname + "../../middleware/Page");
const express = require("express");
const { hasPayed } = require("../middleware/client");

const router = express.Router();

// @desc	Home Router
router.get("/", (req, res) => {
	res.redirect("/home");
});

// @desc	Home Router
router.get("/home", (req, res) => {
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
						title: page.title.home,
						page: page,
						bird: _bird.fly,
						books: books? books : []
					});
				}
			});
		}
	});
});

// @desc	books Router
router.get("/books", (req, res) => {
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
						books: books? books : []
					});
				}
			});
		}
	});
});


// @desc	books Router
// for when someone wants to buy a book
router.get("/books/:bookTitle", (req, res) => {
	// get the transaction_id from the query (tr = transaction_id)
	const tr = req.query.tr;

	console.log("tr", tr);

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
					_client.hasPayed(tr, (payment_err, transaction) => {
						if (payment_err) {
							console.log(":::", payment_err);
							error500(req, res);
						} else {
							console.log(transaction);
							res.render("buy", {
								title: book.title,
								page: page,
								bird: _bird.fly,
								book: book ? book : {},
								hasPayed: transaction ? true : false
							});
						}
					});
				}
			});
		}
	});
});

// @desc	books Router
// @route	POST
// for when someone wants to buy a book
router.post("/books/:bookTitle", (req, res) => {
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
});


module.exports = router;