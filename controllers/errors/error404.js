// This page is called by any missing page or page not found
const _page = require("../../middleware/page");

module.exports = (req, res)=>{
	_page.getPage((page_err, page)=>{
		if(page_err){
			console.log(":::page_err:", page_err);
			return res.send("<div style='margin: 20vh 10vw; display: flex; justify-content: center; align-items: center; padding: 4rem; background-color: rgb(67, 67, 68); color: rgba(255, 255, 255, 0.6); width: auto; font-size: 4rem'>Page Not Found!</div>");
		}

		return res.render("errors/error404", {
			page: page,
			user: req.isAuthenticated() && req.user.username,
			title: page.title.error.error404
		});
	});
}