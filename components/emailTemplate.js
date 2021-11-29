// contains the email template

module.exports = ({logoUrl: logoUrl, fromMail: fromMail, title: title, body: body, footer: footer})=>{
	return `
	<section>
	<style>
		.aTag{
			color: black;
			text-decoration: none;
		}
		.aTag:hover{
			text-decoration: underline;
			color: darkgoldenrod;
		}
		.container{
			width: 100%;
			padding: 5%;
			display: flex;
			justify-content: center;
		}
		.card{
			padding: 5%;
			display: flex;
			flex-direction: column;
			box-shadow: 3px 2px 15px 1px rgb(0 0 0 / 50%);
		}
		.heading{
			font-size: small;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.title{
			margin: 1.5rem 0 0.5rem 0;
			font-size: x-large;
		}
		.body{
			padding: 5%;
			margin: 0.5rem 0;
		}
		.footer{
			font-size: small;
			text-align: center;
		}
	</style>
	<div class="container">
		<div class="card">
			<div class="heading">
				<img src="${logoUrl}" alt="logo" style="width: 3remm; height: 3rem; border-radius: 50%;">
				<a class="aTag" href="mailto:${fromMail || "No email was added"}">${fromMail || "No email was added"}</a>
			</div>
			<div class="title">${title}</div>
			<div class="body">${body || "No Message Was sent"}</div>
			<div class="footer">
				<a class="aTag" href="${footer || "www.etemireewoma.com"}" target="_blank">${footer || "www.etemireewoma.com"}</a>
			</div>
		</div>
	</div>
</section>
	`;
}