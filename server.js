var teamcity = require('./lib/teamcity');
var raspberry = require('./lib/raspberry');

var tc = teamcity.create("http://176.34.231.33", "orjan", "SeaBassNinja");

var checkBuildStatus = function() {
	tc.hasFailingProjects().on('complete', function(buildStatus) {
		var hasFailingProjects = buildStatus.count > 0;
		if (hasFailingProjects) {
			console.log("fail");
		}
		else {
			console.log("ok");
		}
	});
};

setInterval(checkBuildStatus, 1000);
