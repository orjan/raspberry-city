var config = require('config');
var Emitter = require('events').EventEmitter;
var TeamCity = require('./lib/teamcity');
var raspberry = require('./lib/raspberry');

var events = new Emitter();

var tc = new TeamCity(config.teamcity.domain, config.teamcity.username, config.teamcity.password);

var checkBuildStatus = function() {
	tc.hasFailingProjects().on('complete', function(buildStatus) {
		var hasFailingProjects = buildStatus.count > 0;
		events.emit("updateBuildStatus", hasFailingProjects);
	});
};

setInterval(function() {
	events.emit("checkBuildStatus");
}, 1000);

events.on("checkBuildStatus", checkBuildStatus);

events.on("updateBuildStatus", function(hasFailingProjects) {
	console.log("New status: ", hasFailingProjects);
});

events.on("updateBuildStatus", function(hasFailingProjects) {
	if (hasFailingProjects) {
		raspberry.on(4);
	}
	else {
		raspberry.off(4);
	}
});