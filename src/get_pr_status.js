var config = require('../config');
var APIHelper = require('../utils/api_helper');

const GET_PR_STATUS_ENDPOINT = `/repos/${config.repo.owner}/${config.repo.name}/commits/`;

let getPRStatus = function(pr_number) {
	return APIHelper.get(GET_PR_STATUS_ENDPOINT + pr_number + '/status')
		.then((body) => {
			//console.log(body);
			return body;
		})
};

module.exports = getPRStatus;
