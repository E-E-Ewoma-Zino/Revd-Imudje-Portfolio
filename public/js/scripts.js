//
// Scripts
// 
// modal
// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks the button, open the modal 
function openModal(data) {
	console.log("modal");
	modal.style.display = "block";
	document.querySelector("#myModal > div > div > h4").innerHTML = data.title;
	document.querySelector("#myModal > div > p").innerHTML = data.body;
}

// When the user clicks on (x), close the modal
function close_modal() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	// This is for simple modals
	if (event.target == modal) {
		modal.style.display = "none";
	}
	// This is for the Login Modal
	if (event.target == logInModal) {
		logInModal.firstElementChild.classList.remove("riseUp");
		logInModal.firstElementChild.classList.add("fallDown");
		setTimeout(() => {
			logInModal.style.display = "none";
		}, 700);
	}
	// This is for the Register Modal
	if (event.target == registerModal) {
		registerModal.firstElementChild.classList.remove("riseUp");
		registerModal.firstElementChild.classList.add("fallDown");
		setTimeout(() => {
			registerModal.style.display = "none";
		}, 700);
	}
}


// NavBar
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		document.getElementById("navbar").style.padding = ".5rem 0";
		document.getElementById("navbar").style.backgroundColor = "rgb(0,0,0)";
		// document.getElementById("logo").style.fontSize = "25px";
	} else {
		document.getElementById("navbar").style.padding = "0rem 0";
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0, .6)";
		// document.getElementById("logo").style.fontSize = "35px";
	}
}