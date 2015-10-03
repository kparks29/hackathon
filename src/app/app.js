(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'HACKATHON.filters',
		'HACKATHON.controllers'
	];

	angular.module('HACKATHON.controllers', []);
	angular.module('HACKATHON', dependencies);

})();