// Flutterwave 
function makePayment(callback) {
	try {
		// console.log("ent", document.getElementById("username").value, document.getElementById("price").value);
		FlutterwaveCheckout({
			public_key: "FLWPUBK_TEST-88cd4a7dc50e807c5da141b586b3a656-X",
			tx_ref: "RX1" + Math.floor(Math.random() * 9999999) + 1,
			amount: document.getElementById("price").value,
			currency: "NGN",
			customer: {
				email: document.getElementById("username").value,
				name: document.getElementById("username").value.substr(0, 1).toUpperCase()
			},
			callback: function (data) {
				console.log("the function has been called");

				const paymentData = {
					status: data.status,
					tx_ref: data.transaction_id,
					transaction_id: data.tx_ref
				}

				// submit form
				axios.post("/books/" + document.getElementById("title").value + "?pq=" + document.getElementById("bookId").value, paymentData).then((res) => {
					console.log("RES", res);
					if (res.data.type) {
						messager({
							replace: ["danger", "success"],
							message: res.data.message
						});
						setTimeout(() => {
							window.location.reload();
						}, 1000);
					} else {
						if (res.data.message == "Something went wrong! Contact costomer care") messager({
							replace: ["success", "danger"],
							message: res.data.message
						});
						else messager({
							replace: ["success", "danger"],
							message: res.data.message
						});
					}
				}).catch((err) => {
					console.error("err", err);
				});
			},
			onclose: function () {
				// close modal
				// console.log("closed function");
				messager({
					replace: ["success", "danger"],
					message: "You cancled the payment!"
				});
			},
			customizations: {
				title: document.querySelector("#navbar > div > a > div").innerText,
				description: "Payment for book",
			},
		});
	} catch (err) {
		console.log(err);
		if (err == "ReferenceError: FlutterwaveCheckout is not defined") messager({
			replace: ["success", "danger"],
			message: "Little or No Connection!\n<i class='fa fa-reload' aria-hidden='true'></i> Refresh!"
		});
	}
}