//  Configure mongodb for online and local DB
module.exports = async (mongoose) => {
	try {
		// const connected = await mongoose.connect("mongodb://localhost:27017/revDB", {
			const connected = await mongoose.connect("mongodb+srv://zino:monday27@revdimduje.zu00q.mongodb.net/RevDB?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		console.log(`Connected Successfully at ${connected.connection.host}`);
	} catch (err) {
		console.error(":::::::::::::>" + err);
		process.exit(1);
	}
}
