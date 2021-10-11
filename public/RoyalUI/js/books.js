// for the books page

// function to delete a book
function deleteBook(bookId) {
	deleteAxios({ url: "/admin/books?dl=" + bookId }, (delete_err, res) => {
		if (delete_err) {
			console.log("::delete_err", delete_err);
			return messager({
				replace: ["success", "danger"],
				message: delete_err
			});
		}
		if (res.data) {
			messager({
				replace: ["danger", "success"],
				message: "Deleting..."
			});
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}
	});
}