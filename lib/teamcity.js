var rest = require('restler')

var TeamCity = rest.service(
		function(baseUrl, username, password) {
			this.baseURL = baseUrl;
			this.defaults.username = username;
			this.defaults.password = password;
			this.defaults.headers = { "Accept": "application/json" };
		}, {
			// defaults
		}, {
			hasFailingProjects: function() {
				return this.get('/httpAuth/app/rest/builds?locator=status:failure,sinceBuild:(status:success)');
			}
		}
	);
	
exports.create = function(baseUrl, username, password) {
	return new TeamCity(baseUrl, username, password);
};
