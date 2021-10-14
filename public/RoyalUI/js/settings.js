// controll the settings page

// check Password
function checkPassword() {
	const oldP = document.getElementById('oldPassword').value
	const newP = document.getElementById('newPassword').value
	const confirmP = document.getElementById('confirmPassword').value

	console.log(oldP, newP, confirmP);
	changePassword({ oldPassword: oldP, newPassword: newP });
}

// change password function
function changePassword(data) {
	// console.log(data);
	postAxios({ url: '/admin/settings?q=changePassword', _data: data }, (post_err, res) => {
		if (post_err) {
			return messager({
				replace: ["success", "danger"],
				message: post_err
			});
		}
		// console.log(res);
		if (res.data == "Incorrect Password") return messager({
			replace: ["success", "danger"],
			message: "Incorrect Password"
		});
		else if (res.data == "false") return messager({
			replace: ["success", "danger"],
			message: "Error try again later."
		});
		else return messager({
			replace: ["danger", "success"],
			message: "Updated Password."
		});

	});
}

// Update carousel
function updateCarousel() {
	const title = document.querySelectorAll("[data-attribute-carousel='title']");
	const body = document.querySelectorAll("[data-attribute-carousel='body']");

	const data = [
		{
			title: title[0].value,
			body: body[0].value
		},
		{
			title: title[1].value,
			body: body[1].value
		},
		{
			title: title[2].value,
			body: body[2].value
		}
	]

	postAxios({ url: "/admin/settings?q=updateCarousel", _data: data }, (post_err, res)=>{
		if(post_err){
			return messager({
				replace: ["success", "danger"],
				message: post_err
			});
		}
		console.log(res);
		if(res.data) return messager({
			replace: ["danger", "success"],
			message: "Updated <i class=\"ti-thumb-up\"></i>"
		});
		else return messager({
			replace: ["success", "danger"],
			message: "Failed to Update."
		});
	});
}

// Update contact details
function updateContact() {
	const names = document.querySelectorAll("[data-attribute-contact='names']");
	const phone = document.querySelector("[data-attribute-contact='phoneNo']");
	const whatsapp = document.querySelector("[data-attribute-contact='whatsapp']");
	const facebook = document.querySelector("[data-attribute-contact='facebook']");
	const email = document.querySelector("[data-attribute-contact='email']");
	const constants = document.querySelectorAll("[data-attribute-constant='true']");


	const data = {
		names: {
			title: names[0].value,
			firstName: names[1].value,
			lastName: names[2].value,
			middleName: names[3].value
		},
		phoneNo: phone.value,
		email: email.value,
		facebook: facebook.value,
		whatsapp: whatsapp.value,
		topic: constants[0].value,
		aboutTitle: constants[1].value,
		body: [
			constants[2].value,
			constants[3].value,
			constants[4].value
		]
	}

	console.log(data);
	postAxios({ url: "/admin/settings?q=updateContact", _data: data }, (post_err, res)=>{
		if(post_err){
			return messager({
				replace: ["success", "danger"],
				message: post_err
			});
		}
		console.log(res);
		if(res.data) return messager({
			replace: ["danger", "success"],
			message: "Updated <i class=\"ti-thumb-up\"></i>"
		});
		else return messager({
			replace: ["success", "danger"],
			message: "Failed to Update."
		});
	});
}