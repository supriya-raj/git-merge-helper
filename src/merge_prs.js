var getPrs = require("./get_prs");
var mergeBranch = require("./merge_head_into_base");
var getSinglePr = require("./get_single_pr");
var waitForStatus = require("./wait_for_status");

var config =  require("../config");
var colorLogger = require("../utils/color_logger");

var getPrsToBeMerged = function() {
	var prs_to_be_merged = getPrs({
		'labels': config['merge_pr_prerequisites'].labels
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

			colorLogger("***********************************", "magenta");
			colorLogger("Trying to merge PR#" + pr.number, "blue");

			//Merge base branch into the pr
			mergeBranch({head: pr.base, base: pr.head})
			.then(() => {
				colorLogger("Waiting for status checks to pass ...", "blue");
				return waitForStatus(pr, 'success')
			})
			.then(() => {
				//return mergeBranch(pr);
			})
			.then(() => {
				colorLogger("Merged PR #" + pr.number + " successfully !!", "green");
			})
			.catch((err) => {
				colorLogger("Error merging PR #" + pr.number + "..Skipping it!!", "red");
				console.log(err);
			})
		})
	})
};

module.exports = mergePrs;
