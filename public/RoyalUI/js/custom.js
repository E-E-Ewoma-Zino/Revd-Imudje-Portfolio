// For all the custom code
// For links
function link(data) {
	window.location.href = data.url;
}

// global website hostname
const host = window.location.origin;

// Axios functions to use everywhere in this project
// get
function getAxios(data, callback) {
	axios.get(host + data.url).then((res) => {
		callback(null, res);
	}).catch((err) => {
		console.log("axiosGet_err", err);
		callback(err, null);
		return messager({
			replace: ["success", "danger"],
			message: err
		});
	});
}

// post
function postAxios(data, callback) {
	axios.post(host + data.url, data._data).then((res) => {
		callback(null, res);
	}).catch(function (err) {
		console.error("post_err", err);
		callback(err, null);
		return messager({
			replace: ["success", "danger"],
			message: err
		});
	});
}

// delete
function deleteAxios(data, callback) {
	axios.delete(host + data.url).then((res) => {
		callback(null, res);
	}).catch((err) => {
		console.log("axiosDelete_err", err);
		callback(err, null);
		return messager({
			replace: ["success", "danger"],
			message: err
		});
	});
}
