// This script is in-charge of sending mails to users
const nodemailer = require("nodemailer");

module.exports = ({ from: from, to: to, subject: subject, text: text, html: html }, callback) => {
	var transporter = nodemailer.createTransport({
		host: "srv5.myukserver.com",
		// port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: "info@drimudjejp.com",
			pass: "Omowho6*!!!"
		}
	});

	var mailOptions = {
		from: from,
		to: to,
		subject: subject,
		text: text
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Email Error:::", error);
			callback(error, null);
		} else {
			console.log("Email sent: " + info.response);
			callback(null, info);
		}
	});
}

// const mailgun = require("mailgun-js");
// module.exports = ({ from: from, to: to, subject: subject, text: text, html: html }, callback) => {

// 	const DOMAIN = "sandbox1ded1b06d84d49dd9d3df072eb1bb105.mailgun.org";
// 	const mg = mailgun({ apiKey: "c9581ce37419ea54cbfca5b36bccbcba-8ed21946-f1885e72", domain: DOMAIN });
// 	const data = {
// 		from: from,
// 		to: to,
// 		subject: subject,
// 		text: text
// 	};
// 	mg.messages().send(data, function (error, body) {
// 		if(error){
// 			console.log(error);
// 			callback(error, null);
// 		}else{
// 			console.log(body);
// 			callback(null, body);
// 		}
// 	});
// }