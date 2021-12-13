// This page controlls the book activities
const Books = require("../model/Books");
const Shelf = require("../model/Shelf");
const Images = require("../model/Images");
const fs = require("fs");

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
	},
	// used to update a book
	update: (bookId, updateData, callback)=>{
		Books.updateOne({_id: bookId}, updateData, (update_err)=>{
			if(update_err){
				console.log("update_err", update_err);
				callback(update_err, null);
			}
			else{
				callback(null, true);
			}
		});
	},
	// delete book with its shelf and Image
	delete: (bookId, callback) => {
		Books.findOneAndDelete({ _id: bookId }, (delete_err, book) => {
			if (delete_err) {
				console.log(":::delete_err", delete_err);
				return callback(delete_err, null);
			}
			if (book) {
				Shelf.findOneAndDelete({ _id: book.shelf }, (shelfDelete_err, shelf) => {
					if (shelfDelete_err) {
						console.log(":::shelfDelete_err", shelfDelete_err);
						return callback(shelfDelete_err, null);
					}
					else {
						// Using fs.stat to check if the file exist before deleting
						fs.stat(shelf.path, (bookStats_err, stats)=>{
							if(bookStats_err){
								console.error("bookStats_err:", bookStats_err);
								return callback(bookStats_err, null);
							}
							// console.log("Stats", stats);
							// Using fs to also delete the book file
							fs.unlink(shelf.path, (unlink_err)=>{
								if(unlink_err){
									console.error("unlink_err:", unlink_err);
									return callback(unlink_err, null);
								}
								console.log("file deleted successfully");
								callback(null, true);
							});
						});
						console.log("Deleted Shelf");
					}
				});
				Images.findOneAndDelete({ _id: book.image }, (imageDelete_err, image) => {
					if (imageDelete_err) {
						console.log(":::imageDelete_err", imageDelete_err);
						return callback(imageDelete_err, null);
					}
					else {
						// Using fs.stat to check if the file exist before deleting
						fs.stat(image.path, (bookStats_err, stats)=>{
							if(bookStats_err){
								console.error("bookStats_err:", bookStats_err);
								return callback(bookStats_err, null);
							}
							// console.log("Stats", stats);
							// Using fs.unlink to also delete the book file
							fs.unlink(image.path, (unlink_err)=>{
								if(unlink_err){
									console.error("unlink_err:", unlink_err);
									return callback(unlink_err, null);
								}
								console.log("file deleted successfully");
								callback(null, true);
							});
						});
						console.log("Deleted Image");
					}
				});
				return callback(null, true);
			}
		});
	}
}