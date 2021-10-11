// The module for the page text
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
	book: Object,
	title: Object,
	aboutMe: Object,
	believes: Object,
	carousel: Array,
	achievements : Object
});

module.exports = new mongoose.model("Page", pageSchema);