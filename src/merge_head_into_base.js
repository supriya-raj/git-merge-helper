var config = require('../config');
var APIHelper = require('../utils/api_helper');
var colorLogger = require('../utils/color_logger');

const MERGE_ENDPOINT = `/repos/${config.repo.name}/${config.repo.owner}/merges`;

let mergeHeadIntoBase = function({head, base}) {
	return APIHelper.post(MERGE_ENDPOINT, null, {
		base: base.ref,
		head: head.ref
	})
	.then((body) => {
		colorLogger(`Merged Branch ${head.ref} into ${base.ref}`, 'green');
		return body;
	})
	.catch((error) => {
		colorLogger(`Cannot Merge Branch ${head.ref} into ${base.ref}`, 'red');
		throw error;
	})
};

module.exports = mergeHeadIntoBase;
