var config = require('../config');
var APIHelper = require('../utils/api_helper');

const SEARCH_ENDPOINT = `/search/issues`;

let searchGit = function(conditions = {}) {
	let url = SEARCH_ENDPOINT + '?q=';
	if(conditions.is_pr) {
		url += 'is:pr+is:open+';
	}
	if(conditions.labels) {
		url += `label:${conditions.labels}+`
	}
	url += `repo:${config.repo.owner}/${config.repo.name}`

	return APIHelper.get(url)
		.then((body) => {
			//console.log(body);
			return body;
		})
};

module.exports = searchGit;
