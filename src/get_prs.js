var config = require('../config');
var APIHelper = require('../utils/api_helper');

const GET_ALL_ISSUES_ENDPOINT = `/repos/${config.repo.name}/${config.repo.owner}/pulls`;

let getPRs = function(filter = {}) {
	return APIHelper.get(GET_ALL_ISSUES_ENDPOINT, filter)
		.then((body) => {
			//console.log(body);
			return body;
		})
};

module.exports = getPRs;
