var APIHelper = require("../utils/api_helper");

const GET_USER_INFO_ENDPOINT = '/user';

let getUserData = function(filter = {}) {
	APIHelper.get(GET_USER_INFO_ENDPOINT)
		.then((body) => {
			console.log(body);
			return body;
		})
};

module.exports = getUserData;
