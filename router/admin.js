const dashboard = require("../controllers/admin/dashboard");
const addBooks = require("../controllers/admin/addBooks");
const editPage = require("../controllers/admin/editPage");
const books = require("../controllers/admin/books");
const upload = require("../config/multer");
const express = require("express");

const router = express.Router();

// @desc	Admin Router
router.get("/", (req, res) =>res.redirect("/admin/dashboard"));

// @desc	Dashboard Router
// @route	get
router.get("/dashboard", (req, res) => dashboard(req, res));

// @desc	Add New Book Router
// @route	get
router.get("/addbook", (req, res) => addBooks.get(req, res));

// @desc	Add New Book Router
// @route	post
router.post("/addbook", upload.fields([{ name: "book" }, { name: "image" }]), (req, res) => addBooks.post(req, res));

// @desc	All Books
// @route	Get admin/books
router.get("/books", (req, res)=>books(req, res));

// @desc	Edit Home Router
// @route	Get admin/editpage
router.get("/editpage", (req, res) => editPage.get(req, res));

// @desc	Edit Home Router
// @route	POST admin/editpage
router.post("/editpage", (req, res) => editPage.post(req, res));


module.exports = router;