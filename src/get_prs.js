var config = require('../config');
var APIHelper = require('../utils/api_helper');

const GET_PRS_ENDPOINT = `/repos/${config.repo.owner}/${config.repo.name}/pulls`;

let getPRs = function(filter = {}) {
	return APIHelper.get(GET_PRS_ENDPOINT, filter)
		.then((body) => {
			//console.log(body);
			return body;
		})
};

module.exports = getPRs;
