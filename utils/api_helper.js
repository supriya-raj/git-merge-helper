var superagent = require('superagent');
var _isEmpty = require('lodash').isEmpty;

var config = require('../config');

const GIT_HOST = 'https://api.github.com';

var _request = function(method, endpoint, query = {}, payload = {}, headers = {}) {

	//Add common headers
	let _headers = Object.assign({} , headers, {
		"Authorization": `token ${config['git-personal-access-token']}`
	});

	if(_isEmpty(payload)) {
		_headers['Content-Type'] = 'application/json';
	}

	let _req = superagent[method.toLowerCase()](GIT_HOST + endpoint)
		.query(query)
		.set(_headers)
		.send(payload)

	return _req
		.then((response) => {
			return response.body;
		})
		.catch((err) => {
			console.log(endpoint);
			console.log(err.response.body);
			console.log(err.status);
			throw 'GITHUB API FAILED';
		})
};

var APIHelper = function() {
  return {
    get: _request.bind(this, "get"),
    post: _request.bind(this, "post"),
    patch: _request.bind(this, "patch"),
    put: _request.bind(this, "put")
  }
};

module.exports = new APIHelper();
