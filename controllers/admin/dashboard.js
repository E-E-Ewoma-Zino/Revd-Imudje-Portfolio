// Components for dashboard
const { adminOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _page = require("../../middleware/page");
const error500 = require("../errors/error500");

module.exports = (req, res) => {
	// check if the user is authorized and if the user is the admin
	if (!adminOnly(req)) return res.redirect("back");

	_page.getPage((page_err, page)=>{
		if(page_err){
			_bird.message("danger", page_err);
			return error500(req, res);
		}
		else{
			res.render("admin/dashboard", {
				title: "admin",
				page: page,
				bird: _bird.fly
			});
		}
	});
}