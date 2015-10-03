(function () {
	'use strict';

	function config ($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true).hashPrefix('!');
	}

	config.$inject = ['$urlRouterProvider', '$locationProvider'];

	angular.module('HACKATHON')
		.config(config);

})();