// Components for adding books
const { adminOnly } = require("../auth/authentication");
const _payments = require("../../middleware/payments");
const _bird = require("../../middleware/messageBird");
const _books = require("../../middleware/books");
const _page = require("../../middleware/page");
const error500 = require("../errors/error500");
const ImagesDB = require("../../model/Images");
const Books = require("../../model/Books");
const Shelf = require("../../model/Shelf");

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
				_payments.all((allPayment_err, payments) => {
					if (allPayment_err) {
						_bird.message("danger", allPayment_err);
						return error500(req, res);
					}
					_books.allBooks((book_err, books) => {
						if (book_err) {
							console.log("::book_err:", book_err);
							_bird.message("danger", book_err);
							error500(req, res);
						} else {
							res.render("admin/books", {
								title: "admin",
								bird: _bird.fly,
								payments: payments,
								books: books,
								page: page
							});
						}
					});
				});
			}
		});
	},
	post: (req, res) => {
		// variable to check if image and shelf have finished saving
		let is_image_save = false, is_shelf_save = false;

		// create new shelf
		const newShelf = new Shelf(req.files.book[0]);
		// save book path in shelf
		newShelf.save((err) => {
			if (err) {
				console.log(":::", err);
				// _bird.message("danger", err);
			} else {
				is_shelf_save = true;
			}
		});

		// create new Image
		const newImage = new ImagesDB(req.files.image[0]);
		// save book image in images
		newImage.save((error) => {
			if (error) {
				console.log(":::", error);
				// _bird.message("danger", err);
			} else {
				is_image_save = true;
			}
		});

		// creaate book to db
		const newBook = new Books({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			length: req.body.length,
			shelf: newShelf,
			image: newImage
		});

		newBook.save((err_upload) => {
			if (err_upload) {
				console.log(":::", err_upload);
				// _bird.message("danger", err);
			} else {
				if (is_shelf_save && is_image_save) {
					_bird.message("success", "Book Uploaded Successfully!");
					res.redirect("back");
				}
				else {
					console.log(is_image_save, is_shelf_save);
					_bird.message("danger", "Something went wrong!");
					res.redirect("back");
				}
			}
		});
	}
}