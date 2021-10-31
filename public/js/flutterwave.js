// Flutterwave 
function makePayment(callback) {
	try {
		console.log("ent", document.getElementById("username").value, document.getElementById("price").value);
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
				document.getElementById("status").value = data.status;
				document.getElementById("transaction_id").value = data.transaction_id;
				document.getElementById("tx_ref").value = data.tx_ref;

				// submit form
				document.getElementById("paymentForm").submit();
			},
			onclose: function () {
				// close modal
				console.log("closed function");
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
