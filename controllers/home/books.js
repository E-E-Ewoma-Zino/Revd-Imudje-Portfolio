// Controlls all the routes consigning the books
const _payments = require("../../middleware/payments");
const _bird = require("../../middleware/messageBird");
const _users = require("../../middleware/users");
const _books = require("../../middleware/books");
const error500 = require("../errors/error500");
const _page = require("../../middleware/page");

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
							user: req.isAuthenticated() && req.user.username,
							books: books ? books : [],
							title: page.title.books,
							bird: _bird.fly,
							page: page
						});
					}
				});
			}
		});
	},
	// I don't want to create another file for the books/:bookName
	buy: {
		get: (req, res) => {
			// to store the book that the user is selecting
			let theBook;
			// to know if the user has paid for this book
			let hasPaid = false;

			_page.getPage((page_err, page) => {
				if (page_err) {
					console.log(page_err);
					error500(req, res);
				}
				else {
					// I wanted to send all the book so that I can put it in the slide and also get the book that is for the page
					_books.allBooks((book_err, books) => {
						if (book_err) {
							console.log(":::book_err:", book_err);
							error500(req, res);
						}
						else if (books) {
							// This loop is to make sure that the book that is sented from the 
							// query is assigned to theBook variable and it also redirect invalid queries to 
							// the error 500 page.
							for (let i = 0; i < books.length; i++) {
							const book = books[i];

								if (book._id == req.query.pq) {
									theBook = book;
									// we want to set the user.hasPaid property to true if theBook is
									// equal to any book in the user.ownedBook
									if(req.isAuthenticated()) req.user.ownedBooks.forEach(ownedBook => {
										if(ownedBook.toString() === theBook._id.toString()) hasPaid = true;
									});
									break;
								}
								else {
									// If an invalid ID was entered for a book do this
									if (books.length - 1 == i) {
										_bird.message("danger", "Invalid request!");
										error500(req, res);
									}
								}
							}

							// This condition makes sure that when books is empty the error500 page will run
							if(books.length) res.render("buy", {
								user: req.isAuthenticated() && req.user.username,
								title: page.title.buy,
								theBook: theBook,
								hasPaid: hasPaid,
								bird: _bird.fly,
								books: books,
								page: page
							});
							else {
								_bird.message("danger", "Invalid request!");
								error500(req, res);
							}
						}
						else {
							console.log(":::Err in books.buy: allBooks is fucked up");
							error500(req, res);
						}
					});
				}
			});
		},
		post: (req, res) => {
			// Get the book 
			_books.byId(req.query.pq, (book_err, book) => {
				if (book_err) {
					console.log(":::book_err:", book_err);
					error500(req, res);
				} else {
					// check if the payment was successful
					if(req.body.status == "successful"){
						// create the payment
						_payments.createPayment({
							book: book._id,
							user: req.user._id,
							status: req.body.status,
							tx_ref: req.body.tx_ref,
							transaction_id: req.body.transaction_id
						}, (payment_err)=>{
							if(payment_err){
								console.log(":::payment_err:", payment_err);
								error500(req, res);
							}

							// Add the book to the user ownlist
							// this function callback is a bool
							_users.ownBook(req.user._id, book._id, (ownBook_err, done)=>{
								if(ownBook_err){
									console.log(":::ownBook_err:", ownBook_err);
									_bird.message("danger", "Something went wrong! Contact costomer care");
								}
								else{
									_bird.message("success", "You now own " + book.title);
									_bird.message("warning", "Refresh this page!");
								}
							});
							res.redirect("back");
						});
					}else{
						_bird.message("danger", "Your payment status: " + req.body.status);
						res.redirect("back");
					}
				}
			});
		}
	}
}