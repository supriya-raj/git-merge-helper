var getPrs = require("./get_prs");
var updateBranch = require("./merge_base_into_head");
var config =  require("../config");

var getPrsToBeMerged = function() {
	var prs_to_be_merged = getPrs({
		'labels': config['merge_pr_prerequisites'].labels
	});

	return prs_to_be_merged;
};

var mergePrs = function() {
	getPrsToBeMerged().then((prs_to_be_merged) => {
		prs_to_be_merged.forEach((pr) => {
			updateBranch(pr);
		})
	})
};

module.exports = mergePrs;
