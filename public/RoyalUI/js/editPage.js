"use strict";
// This script controls how the edit page works
// Get all dom element which contains attribute [concatinatable="true"]
const pageBody = document.querySelectorAll("[contenteditable='true']");

for (let i = 0; i < pageBody.length; i++) {
	const body = pageBody[i];

	const iTag = document.createElement("i");

	iTag.setAttribute("class", "ti-write text-p");

	body.appendChild(iTag);
}

// function to save the edited page
function savePage() {
	// get the body to be updated
	const pageDetails = {
		title: {
			home: "Revd Joseph G.O. Imudje",
			books: "My Books",
			buy: "Get a book",
			error: {
				error404: "Page Not Found",
				error500: "Server Error"
			}
		},
		aboutMe: {
			name: {
				fullname: "Revd Joseph G.O. Imudje",
				eachName: [
					"RevdJoseph",
					"GO. Imudje"
				]
			},
			phoneNo: "08021286282",
			email: "daddyimudje@gmail.com",
			facebook: "www.facebook.com/imudje",
			whatsapp: "090290298762",
			topic: pageBody[0].innerText,
			aboutTitle: pageBody[1].innerText,
			body: [
				pageBody[2].innerText,
				pageBody[3].innerText,
				pageBody[4].innerText
			]
		},
		believes: {
			topic: "Believes",
			title: pageBody[5].innerText,
			cross: pageBody[6].innerText,
			bell: pageBody[7].innerText,
			bible: pageBody[8].innerText,
			church: pageBody[9].innerText
		},
		achievements: {
			topic: "Achievements",
			title: pageBody[10].innerText,
			achievements: [
				{
					title: pageBody[11].innerText,
					body: pageBody[12].innerText
				},
				{
					title: pageBody[13].innerText,
					body: pageBody[14].innerText
				}
			]
		},
		book: {
			topic: pageBody[15].innerText,
			title: pageBody[16].innerText
		},
		carousel: [
			{
				title: "First slide label",
				body: "Some representative placeholder content for the first slide."
			},
			{
				title: "Second slide label",
				body: "Some representative placeholder content for the first slide."
			},
			{
				title: "Third slide label",
				body: "Some representative placeholder content for the first slide."
			}
		]
	}

	console.log(pageDetails);
	postAxios({ url: "/admin/editpage", _data: pageDetails }, (err, res) => {
		if (err) {
			return console.error("::post_err", err);
		}
		else {
			console.log(res);
			return messager({
				replace: ["danger", "success"],
				message: "Updated <i class=\"ti-thumb-up\"></i>"
			});
		}
	});
}