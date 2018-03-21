var config = require('../config');
var APIHelper = require('../utils/api_helper');

const GET_PR_ENDPOINT = `/repos/${config.repo.name}/${config.repo.owner}/pulls/`;

let getPR = function(pr_number) {
	return APIHelper.get(GET_PR_ENDPOINT + pr_number)
		.then((body) => {
			//console.log(body);
			return body;
		})
};

module.exports = getPR;
