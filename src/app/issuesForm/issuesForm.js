(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-form', {
			url: '/email',
			templateUrl: 'app/issuesForm/issuesForm.html',
			controller: 'issuesFormCtrl as formCtrl'
		});
	}

	function issuesFormCtrl () {
		this.test = 'test';
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesFormCtrl', issuesFormCtrl);

})();