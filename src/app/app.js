(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'HACKATHON.filters',
		'HACKATHON.service',
		'HACKATHON.controllers'
	];

	angular.module('HACKATHON.service', [])
	angular.module('HACKATHON.controllers', []);
	angular.module('HACKATHON', dependencies);

})();