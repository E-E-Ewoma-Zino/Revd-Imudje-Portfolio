// Components for dashboard
const _bird = require("../../middleware/messageBird");
const _page = require("../../middleware/page");

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