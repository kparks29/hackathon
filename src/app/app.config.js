(function () {
	'use strict';

	function config ($httpProvider, $urlRouterProvider) {
		$httpProvider.interceptors.push('homdnaInterceptors');
		$urlRouterProvider.otherwise('/login');
	}

	config.$inject = ['$httpProvider', '$urlRouterProvider'];

	angular.module('HACKATHON')
		.config(config);

})();