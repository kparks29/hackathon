(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-form', {
			url: '/issue/:issue',
			templateUrl: 'app/issuesForm/issuesForm.html',
			controller: 'issuesFormCtrl as formCtrl'
		});
	}

	function issuesFormCtrl ($stateParams, issueService) {
		var self = this;

		function addRecipient() {
			this.recipients.push('');
		}

		issueService.getIssueDetails($stateParams.issue).then(function (issueDetails) {
			self.message = issueDetails.message;
			self.recipients = issueDetails.recipients;
		});

		this.addRecipient = addRecipient;
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesFormCtrl', issuesFormCtrl);

})();
