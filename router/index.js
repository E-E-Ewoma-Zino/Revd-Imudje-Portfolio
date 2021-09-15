const books = require(__dirname + "../../controllers/home/books");
const home = require(__dirname + "../../controllers/home/home");
const express = require("express");

const router = express.Router();

// @desc	Home Router
router.get("/", (req, res) => res.redirect("/home"));

// @desc	Home Router
router.get("/home", (req, res) => home(req, res));

// @desc	books Router
router.get("/books", (req, res) => books.get(req, res));

// @desc	books Router
// for when someone wants to buy a book
router.get("/books/:bookTitle", (req, res) => books.buy.get(req, res));

// @desc	books Router
// @route	POST
// for when someone wants to buy a book
router.post("/books/:bookTitle", (req, res) => books.buy.post(req, res));


module.exports = router;