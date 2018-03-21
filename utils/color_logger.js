var colors = require('colors');

var colorLogger = function(str, formatting) {
	console.log(str[formatting]);
};

module.exports = colorLogger;
