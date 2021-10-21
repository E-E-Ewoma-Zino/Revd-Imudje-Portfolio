// The module for the page text
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
	book: Object,
	title: Object,
	carousel: Array,
	profile: Object,
	aboutMe: Object,
	believes: Object,
	achievements : Object
});

module.exports = new mongoose.model("Page", pageSchema);