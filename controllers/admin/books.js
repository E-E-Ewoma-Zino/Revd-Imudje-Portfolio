// Components for books in the admin route
const _bird = require(__dirname + "../../../middleware/messageBird");
const _page = require(__dirname + "../../../middleware/page");

module.exports = (req, res)=>{
	_page.getPage((page_err, page) => {
		if (page_err) {
			console.log(page_err);
		}
		else {
			res.render("admin/dashboard", {
				title: "admin",
				page: page,
				bird: _bird.fly
			});
		}
	});
}