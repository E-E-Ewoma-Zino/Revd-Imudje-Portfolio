// This page controlls the book activities
const Books = require(__dirname + "../../model/Books");


module.exports = {
	allBooks: (callback) => {
		Books.find({}).populate({
			path: "shelf image",
			select: ["path"]
		}).exec((err, books) => {
			if (err) {
				console.log(":::", err);
				callback(err, null);
			}
			else {
				callback(null, books);
			}
		});
	},
	byId: (bookId, callback) => {
		Books.findById({ _id: bookId }).populate({
			path: "image shelf",
			select: ["path"]
		}).exec((err, book) => {
			if (err) {
				console.log(":::", err);
				callback(err, null);
			}
			else {
				callback(null, book);
			}
		});
	}
}