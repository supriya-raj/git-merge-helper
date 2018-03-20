var config = require('../config');
var APIHelper = require('../utils/api_helper');

const MERGE_ENDPOINT = `/repos/${config.repo.name}/${config.repo.owner}/merges`;

let mergeBaseIntoHead = function({head, base}) {
	return APIHelper.post(MERGE_ENDPOINT, null, {
		base: base.ref,
		head: head.ref
	})
	.then((body) => {
		console.log(`Merged Branch ${base.ref} into ${head.ref}`);
		return body;
	})
};

module.exports = mergeBaseIntoHead;
