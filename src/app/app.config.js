(function () {
	'use strict';

	function config ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/email');
	}

	config.$inject = ['$urlRouterProvider'];

	angular.module('HACKATHON')
		.config(config);

})();