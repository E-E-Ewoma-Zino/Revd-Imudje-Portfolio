/*!
* Start Bootstrap - Resume v7.0.2 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

	// Activate Bootstrap scrollspy on the main nav element
	const sideNav = document.body.querySelector('#sideNav');
	if (sideNav) {
		new bootstrap.ScrollSpy(document.body, {
			target: '#sideNav',
			offset: 74,
		});
	};

	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector('.navbar-toggler');
	const responsiveNavItems = [].slice.call(
		document.querySelectorAll('#navbarResponsive .nav-link')
	);
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener('click', () => {
			if (window.getComputedStyle(navbarToggler).display !== 'none') {
				navbarToggler.click();
			}
		});
	});

});

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
function close_modal () {
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
function getTransactionId(e ,bookId){
	// get items and convert it from json to array
	const items = window.localStorage.getItem("payments")? JSON.parse(window.localStorage.getItem("payments")) : [];
	// value to be retuned
	let transaction_id = 0;

	items.forEach(item => {
		console.log(item.bookId, bookId);
		if(item.bookId === bookId){
			transaction_id = item.transaction_id;
		}
	});
	e.href = e.href.slice(0, e.href.search("&tr=")) + "&tr=" +transaction_id;
}