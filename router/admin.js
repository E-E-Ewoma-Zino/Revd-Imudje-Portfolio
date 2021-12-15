const messagesDetails = require("../controllers/admin/messagesDetails");
const paymentDetails = require("../controllers/admin/paymentDetails");
const authentication = require("../controllers/auth/authentication");
const dashboard = require("../controllers/admin/dashboard");
const editBook = require("../controllers/admin/editBook");
const addBooks = require("../controllers/admin/addBooks");
const editPage = require("../controllers/admin/editPage");
const settings = require("../controllers/admin/settings");
const message = require("../controllers/admin/message");
const login = require("../controllers/admin/login");
const books = require("../controllers/admin/books");
const upload = require("../config/multer");
const express = require("express");

const router = express.Router();

// @desc	Admin Router / LogIn
// @route	Get admin/
router.get("/", (req, res) => login.get(req, res));

// @desc	Admin Router / LogIn
// @route	Post admin/
router.post("/", (req, res) => login.post(req, res));

// @desc	LogOut User
// @route	GET
// for when someone wants to logOut
router.get("/logout", (req, res) => authentication.logOut(req, res));

// @desc	Dashboard Router
// @route	get
router.get("/dashboard", (req, res) => dashboard(req, res));

// @desc	Messages Router
// @route	get
router.get("/messages", (req, res) => message.get(req, res));

// @desc	Messages Router
// @route	get
router.post("/messages", (req, res) => message.post(req, res));

// @desc	Payment Details Router
// @route	get
router.get("/paymentdetails", (req, res) => paymentDetails(req, res));

// @desc	Message Details Router
// @route	get
router.get("/messagedetails", (req, res) => messagesDetails(req, res));

// @desc	Add New Book Router
// @route	get
router.get("/addbook", (req, res) => addBooks.get(req, res));

// @desc	Add New Book Router
// @route	post
router.post("/addbook", upload.fields([{ name: "book" }, { name: "image" }]), (req, res) => addBooks.post(req, res));

// @desc	All Books
// @route	Get admin/books
router.get("/books", (req, res) => books.get(req, res));

// @desc	All Books
// @route	Delete admin/books
router.delete("/books", (req, res) => books.delete(req, res));

// @desc	Edit and update book
// @route	Get admin/books
router.get("/editbook", (req, res) => editBook.get(req, res));

// @desc	Edit and update book
// @route	Post admin/books
router.post("/editbook", (req, res) => editBook.post(req, res));

// @desc	Edit Home Router
// @route	Get admin/editpage
router.get("/editpage", (req, res) => editPage.get(req, res));

// @desc	Edit Home Router
// @route	Post admin/editpage
router.post("/editpage", (req, res) => editPage.post(req, res));

// @desc	Settings for setting
// @route	Get admin/settings
router.get("/settings", (req, res) => settings.get(req, res));

// @desc	Settings for setting
// @route	Post admin/settings
router.post("/settings", upload.single("image"), (req, res) => settings.post(req, res));


module.exports = router;