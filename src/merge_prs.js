var getPrs = require("./get_prs");
var mergeBranch = require("./merge_head_into_base");
var getSinglePr = require("./get_single_pr");
var waitForStatus = require("./wait_for_status");

var config =  require("../config");
var colorLogger = require("../utils/color_logger");

var getPrsToBeMerged = function() {
	var prs_to_be_merged = getPrs({
		//'labels': config['merge_pr_prerequisites'].labels
	});

	return prs_to_be_merged;
};

var mergePrs = function() {
	getPrsToBeMerged().then((prs_to_be_merged) => {

		//prs that were actually merged
		var prs_merged = [];

		colorLogger('Details of PRs selected for merging ....', 'blue');
		colorLogger(`Count: ${prs_to_be_merged.length}`, 'blue');
		colorLogger('PR Numbers: ' + prs_to_be_merged.map((pr) => {return pr.number;}).join(','), 'blue');

		prs_to_be_merged.forEach((pr) => {

			//Merge base branch into the pr
			mergeBranch({head: pr.base, base: pr.head})
			.then(() => {
				return waitForStatus(pr, 'success')
			})
			.then(() => {
				console.log("Merged PR !!Yay!!!");
			})
			.catch((err) => {
				//do ntn
			})
		})
	})
};

module.exports = mergePrs;
