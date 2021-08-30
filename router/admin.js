const _bird = require(__dirname + "../../middleware/messageBird");
const ImagesDB = require(__dirname + "../../model/Images");
const _page = require(__dirname + "../../middleware/page");
const upload = require(__dirname + "../../config/multer");
const Books = require(__dirname + "../../model/Books");
const Shelf = require(__dirname + "../../model/Shelf");
const express = require("express");

const router = express.Router();

// @desc	Admin Router
router.get("/", (req, res) => {
	res.redirect("/admin/dashboard");
});

// @desc	Dashboard Router
// @route	get
router.get("/dashboard", (req, res) => {
	_page.getPage((page_err, page) => {
		if (page_err) {
			console.log(page_err);
		}
		else {
			res.render("admin/dashboard", {
				title: "admin",
				page: page,
				bird: _bird.fly
			});
			// res.send(page);
		}
	});
});


// @desc	Dashboard Router
// @route	post
router.post("/dashboard", upload.fields([{ name: "book" }, { name: "image" }]), (req, res) => {
	console.log("it", req.body);
	console.log("it", req.files.book[0]);
	// variable to check if image and shelf have finished saving
	let is_image_save = false, is_shelf_save = false;

	// create new shelf
	const newShelf = new Shelf(req.files.book[0]);
	// save book path in shelf
	newShelf.save((err)=>{
		if(err){
			console.log(":::", err);
			// _bird.message("danger", err);
		}else{
			is_shelf_save = true;
		}
	});

	// create new Image
	const newImage = new ImagesDB(req.files.image[0]);
	// save book image in images
	newImage.save((error)=>{
		if(error){
			console.log(":::", error);
			// _bird.message("danger", err);
		}else{
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

	newBook.save((err_upload)=>{
		if(err_upload){
			console.log(":::", err_upload);
			// _bird.message("danger", err);
		}else{
			if(is_shelf_save && is_image_save){
				_bird.message("success", "Book Uploaded Successfully!");
				res.redirect("back");
			}
			else{
				console.log(is_image_save, is_shelf_save);
				_bird.message("danger", "Something went wrong!");
				res.redirect("back");
			}
		}
	});
});

module.exports = router;