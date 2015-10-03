(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-index', {
			url: '/',
			templateUrl: 'app/issuesIndex/issuesIndex.html',
			controller: 'issuesIndexCtrl as indexCtrl'
		});
	}

	function issuesIndexCtrl (issueService) {
		var self = this;
		issueService.getIssueIndexDetails().then(function (issueIndexDetails) {
			self.issues = issueIndexDetails.issues;
		});
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesIndexCtrl', issuesIndexCtrl);

})();
