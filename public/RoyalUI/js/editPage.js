"use strict";
// This script controls how the edit page works
// Get all dom element which contains attribute [concatinatable="true"]
const pageBody = document.querySelectorAll("[contenteditable='true']");
// get all values that will not be changed by this page
const constPageBody = document.querySelectorAll("[data-attribute-constant='true']");

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
			home: constPageBody[0].value,
			books: constPageBody[1].value,
			buy: constPageBody[2].value,
			error: {
				error404: constPageBody[3].value,
				error500: constPageBody[4].value
			}
		},
		aboutMe: {
			names: {
				"title": constPageBody[5].value,
				"firstName": constPageBody[6].value,
				"lastName": constPageBody[7].value,
				"middleName": constPageBody[8].value
			},
			phoneNo: constPageBody[9].value,
			email: constPageBody[10].value,
			facebook: constPageBody[11].value,
			whatsapp: constPageBody[12].value,
			topic: pageBody[0].innerText,
			aboutTitle: pageBody[1].innerText,
			body: [
				pageBody[2].innerText,
				pageBody[3].innerText,
				pageBody[4].innerText
			]
		},
		believes: {
			topic: constPageBody[13].value,
			title: pageBody[5].innerText,
			cross: pageBody[6].innerText,
			bell: pageBody[7].innerText,
			bible: pageBody[8].innerText,
			church: pageBody[9].innerText
		},
		achievements: {
			topic: constPageBody[14].value,
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
				title: constPageBody[15].value,
				body: constPageBody[16].value
			},
			{
				title: constPageBody[17].value,
				body: constPageBody[18].value
			},
			{
				title: constPageBody[19].value,
				body: constPageBody[20].value
			}
		]
	}

	postAxios({ url: "/admin/editpage", _data: pageDetails }, (err, res) => {
		if (err) {
			return console.error("::post_err", err);
		}
		else {
			// console.log(res);
			return messager({
				replace: ["danger", "success"],
				message: "Updated <i class=\"ti-thumb-up\"></i>"
			});
		}
	});
}