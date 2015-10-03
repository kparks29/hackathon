(function () {
	'use strict';

	function config ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}

	config.$inject = ['$urlRouterProvider'];

	angular.module('HACKATHON')
		.config(config);

})();