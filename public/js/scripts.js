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
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


// using messageBird
const messageBox = document.getElementById("littleMessageBox");
const messageBird = document.getElementById("littleMessage");

// message sender
function messager(data) {
	$("#littleMessageBox").fadeIn(() => {
		setTimeout(() => {
			$("#littleMessageBox").fadeOut();
		}, 7000);
	});

	messageBox.classList.replace(`alert-${data.replace[0]}`, `alert-${data.replace[1]}`);
	messageBird.innerHTML = data.message;
}

// this function uses the book id to know if the book has been but by this browser before
// it will add the transactionId to the link, if the book has been bought before
function getTransactionId(e, bookId) {
	// get items and convert it from json to array
	const items = window.localStorage.getItem("payments") ? JSON.parse(window.localStorage.getItem("payments")) : [];
	// value to be retuned
	let transaction_id = 0;

	items.forEach(item => {
		console.log(item.bookId, bookId);
		if (item.bookId === bookId) {
			transaction_id = item.transaction_id;
		}
	});
	e.href = e.href.slice(0, e.href.search("&tr=")) + "&tr=" + transaction_id;
}


// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	console.log("scrolling");
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		document.getElementById("navbar").style.padding = ".5rem 0";
		document.getElementById("navbar").style.backgroundColor = "rgb(0,0,0)";
		// document.getElementById("logo").style.fontSize = "25px";
	} else {
		document.getElementById("navbar").style.padding = "2rem 0";
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0, .6)";
		// document.getElementById("logo").style.fontSize = "35px";
	}
}