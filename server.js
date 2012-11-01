var teamcity = require('./lib/teamcity');
var raspberry = require('./lib/raspberry');

var checkBuildStatus = function() {
	teamcity.failingProjects(function(count) {
		console.log("Number of failed builds: " + count);
		if (count === 0) {
			//raspberry.off(4);
		}
		else {
			//raspberry.on(4);
		}
	});
};

setInterval(checkBuildStatus, 1000);
