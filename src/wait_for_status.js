var config = require('../config');
var Poller = require('promise-poller').default;
var ProgressBar = require('cli-progress');
var getPRStatus = require('./get_pr_status');
var colorLogger = require("../utils/color_logger");

let waitForStatus = function({number, head}, status) {
	const APPRX_TIME_FOR_STATUS_CHECKS_TO_PASS = config.status_checks.time_required || 10000;
	const RETRIES_COUNT = 10;
	const RETRY_INTERVAL = 5000;

	var bar = new ProgressBar.Bar({}, ProgressBar.Presets.shades_classic);
	const STEP_INTERVAL = 1000;
	var updateProgressBar = (step) => {
		let updated_val = STEP_INTERVAL * step;
		bar.update(STEP_INTERVAL*step);
		if(updated_val < APPRX_TIME_FOR_STATUS_CHECKS_TO_PASS){
			setTimeout(updateProgressBar.bind(null, step + 1), STEP_INTERVAL);
		}
	};

	bar.start(APPRX_TIME_FOR_STATUS_CHECKS_TO_PASS, 0);
	updateProgressBar(0);

	return new Promise(function(resolve, reject){

		let pollForStatus = function() {
			bar.stop();
			bar.start(RETRIES_COUNT * RETRY_INTERVAL, 0);

			Poller({
				taskFn: () => {
					return getPRStatus(head.sha)
					.then((pr_status) => {
						if(pr_status.state === status) {
							return true;
						} else {
							throw `Status not equal to ${status} state yet !!`
						}
					})
				},
				interval: RETRY_INTERVAL,
				retries: RETRIES_COUNT,
				progressCallback: (retriesRemaining) => {
					bar.update((RETRIES_COUNT - retriesRemaining) * RETRY_INTERVAL);
				}
			})
			.then(() => {
				colorLogger(`Status Check for PR ${number} PASSED`, 'green');
				resolve();
				bar.stop();
			})
			.catch((err) => {
				colorLogger(`Status Check for PR #${number} FAILED`, 'red');
				reject(err);
				bar.stop();
			})
		};

		setTimeout(pollForStatus, APPRX_TIME_FOR_STATUS_CHECKS_TO_PASS);
	});
};

module.exports = waitForStatus;
