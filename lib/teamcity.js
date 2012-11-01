var rest = require('restler');

TeamCity = rest.service(
	function(baseUrl, username, password) {
		this.baseURL = baseUrl;
		this.defaults.username = username;
		this.defaults.password = password;
		this.defaults.headers = { "Accept": "application/json" };
	}, {
		// defaults
	}, {
		failingProjects: function() {
			return this.get('/httpAuth/app/rest/builds?locator=status:failure,sinceBuild:(status:success)');
		}
	}
);

var tc = new TeamCity("http://176.34.231.33", "orjan", "SeaBassNinja");

exports.failingProjects = function (callback) {
	tc.failingProjects().on('complete', function(buildStatus) {
		callback(buildStatus.count);
	});
};