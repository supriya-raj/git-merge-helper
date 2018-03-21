var config = require('../config');
var Poller = require('promise-poller').default;
var getPRStatus = require('./get_pr_status');
var colorLogger = require("../utils/color_logger");

let waitForStatus = function({number, head}, status) {
	return new Promise(function(resolve, reject){

		let pollForStatus = function() {
			Poller({
				taskFn: () => {
					return getPRStatus(head.sha)
					.then((pr_status) => {
						if(pr_status.state === status) {
							return true;
						} else {
							throw `Status not in ${status} state yet !!`
						}
					})
				},
				interval: 5000,
				retries: 20
			})
			.then(() => {
				colorLogger(`Status Check for PR ${number} PASSED`, 'green');
				resolve();
			})
			.catch((err) => {
				colorLogger(`Status Check for ${number} FAILED`, 'red');
				reject(err);
			})
		};

		setTimeout(pollForStatus, config.status_checks.time_required);
	});
};

module.exports = waitForStatus;
