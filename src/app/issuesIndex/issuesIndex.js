(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-index', {
			url: '/',
			templateUrl: 'app/issuesIndex/issuesIndex.html',
			controller: 'issuesIndexCtrl as indexCtrl'
		});
	}

	function issuesIndexCtrl (issueService, $state) {
		var self = this;

		function goToIssue (issue) {
			$state.go('issues-form', { issue: issue });
		}

		issueService.getIssueIndexDetails().then(function (issueIndexDetails) {
			self.issues = issueIndexDetails.issues;
		});

		this.goToIssue = goToIssue;
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesIndexCtrl', issuesIndexCtrl);

})();
