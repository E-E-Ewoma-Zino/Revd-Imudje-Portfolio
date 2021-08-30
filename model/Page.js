// The module for the page text
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
	title: Object,
	aboutMe: Object,
	belives: Array,
	acheivements: Array
});

module.exports = new mongoose.model("Page", pageSchema);