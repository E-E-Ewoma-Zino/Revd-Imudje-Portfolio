// This page is called by any server errors

module.exports = (req, res)=>{
	res.render("error500");
}