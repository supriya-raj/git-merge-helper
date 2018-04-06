var searchGit = require("./search_git");
var mergeBranch = require("./merge_head_into_base");
var getSinglePrInfo = require("./get_single_pr");
var waitForStatus = require("./wait_for_status");

var config =  require("../config");
var colorLogger = require("../utils/color_logger");

var getPrsToBeMerged = function() {
	var prs_to_be_merged = searchGit({
		'is_pr': true,
		'labels': `"Release+Ready"`
	});

	return prs_to_be_merged;
};

var mergePrs = function() {
	getPrsToBeMerged().then((result) => {

		var prs_to_be_merged = result.items;
		//prs that were actually merged
		var prs_merged = [];

		colorLogger('Details of PRs selected for merging ....', 'blue');
		colorLogger(`Count: ${prs_to_be_merged.length}`, 'blue');
		colorLogger('PR Numbers: ' + prs_to_be_merged.map((pr) => {return pr.number;}).join(','), 'blue');

		prs_to_be_merged.forEach((pr) => {
			let pr_info = {};

			colorLogger("***********************************", "magenta");
			colorLogger("Trying to merge PR#" + pr.number, "blue");

			//Merge base branch into the pr
			getSinglePrInfo(pr.number)
			.then((pr_info_response) => {
				pr_info = pr_info_response;
				mergeBranch({head: pr_info.base, base: pr_info.head});
			})
			.then(() => {
				colorLogger("Waiting for status checks to pass ...", "blue");
				return waitForStatus(pr_info, 'success')
			})
			.then(() => {
				return mergeBranch(pr_info);
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
