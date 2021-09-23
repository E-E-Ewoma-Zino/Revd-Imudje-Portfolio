const authentication = require(__dirname + "../../controllers/auth/authentication");
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

// @desc	Register User
// @route	POST
// for when someone wants to register
router.post("/register", (req, res) => authentication.register(req, res));

// @desc	LogIn User
// @route	POST
// for when someone wants to logIn
router.post("/login", (req, res, next) => authentication.login(req, res, next));

// @desc	LogOut User
// @route	GET
// for when someone wants to logOut
router.get("/logout", (req, res) => authentication.logOut(req, res));

module.exports = router;