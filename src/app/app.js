(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'djds4rce.angular-socialshare',
		'HACKATHON.filters',
		'HACKATHON.service',
		'HACKATHON.controllers'
	];

	angular.module('HACKATHON.service', [])
	angular.module('HACKATHON.controllers', []);
	angular.module('HACKATHON', dependencies);

})();