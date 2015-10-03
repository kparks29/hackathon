(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-form', {
			url: '/:issue',
			templateUrl: 'app/issuesForm/issuesForm.html',
			controller: 'issuesFormCtrl as formCtrl'
		});
	}

	function issuesFormCtrl ($stateParams, issueService) {
		var self = this;

		function addRecipient() {
			this.recipients.push('');
		}

		this.addRecipient = addRecipient;
		issueService.getIssueDetails($stateParams.issue).then(function (issueDetails) {
			self.message = issueDetails.message;
			self.recipients = issueDetails.recipients;
		});
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesFormCtrl', issuesFormCtrl);

})();