// for modal display
// show modal
// get the modal
const myModal = document.getElementById("modal");

function modal(data) {
	const content = document.createElement("div");
	if (!data) {
		messager({
			replace: ["success", "danger"],
			message: "Modal is disabled"
		});
		return;
	}
	else if (data.type === "info") {
		myModal.style.display = "flex";
		content.innerHTML = `<h4 class="card-title">${data.title}</h4>
		<p class="card-description">${data.message}</p>`;
	}
	else if (data.type === "form") {
		// data for this form:
		// title, type, message, method{ params{ itemId } }
		// you can customise it
		myModal.style.display = "flex";
		content.innerHTML = `<h4 class="card-title">${data.title}</h4>
		<p class="card-description">${data.message}</p>
		<div class="text-center my-4"><button type="button" class="btn btn-danger ml-2" onclick="${data.method.name}('${data.method.params.itemId}')">
		Confirm</button>
		<a href="#x" class="btn btn-light" onclick="closeModal()">Cancel</a></div>`;
	}
	else if (data.type === "form2") {
		// for changing password
		myModal.style.display = "flex";
		content.innerHTML = `<h4 class="card-title">${data.title}</h4>
		<p class="card-description">${data.message}</p>
		<div class="my-4">
		<form action="/admin/settings" method="post">
			<label for="oldPassword">Previous Password</label>
			<input type="password" class="form-control mb-2" name="oldPassword" id="oldPassword" placeholder="Previous Password">
			<label for="password">New Password</label>
			<input type="password" class="form-control mb-2" name="newPassword" id="newPassword" placeholder="New Password">
			<label for="confirmPassword">Confirm Password</label>
			<input type="password" class="form-control mb-2" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password">
			<button type="button" class="btn btn-primary" onclick="checkPassword()">Send</button>
			<a href="#x" class="btn btn-light" onclick="closeModal()">Cancel</a>
		</form>
		</div>`;
	}
	else {
		messager({
			replace: ["success", "danger"],
			message: "Modal is disabled"
		});
		return;
	}

	myModal.firstElementChild.firstElementChild.firstElementChild.innerHTML = "";
	myModal.firstElementChild.firstElementChild.firstElementChild.append(content);
}

// deactivate modal
window.onclick = (e) => {
	if (e.target == myModal) {
		myModal.style.display = "none";
	}
}

// close the modal
function closeModal() {
	myModal.style.display = "none";
}
