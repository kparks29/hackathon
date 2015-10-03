(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-form', {
			url: '/:issue',
			templateUrl: 'app/issuesForm/issuesForm.html',
			controller: 'issuesFormCtrl as formCtrl'
		}).state('confirm', {
			url: '/:issue/confirm',
			templateUrl: 'app/issuesForm/issuesConfirm.html',
			controller: 'issuesConfirmCtrl as confirmCtrl'
		});
	}

	function issuesFormCtrl ($stateParams, issueService, $state) {
		var self = this,
			issue = $stateParams.issue;

		function addRecipient() {
			this.recipients.push('');
		}

		function email() {
			var payload = {
				recipients: this.recipients,
				message: this.message
			}
			issueService.email(payload).then(function () {
				$state.go('confirm', { issue: issue });
			}).catch(function () {
				window.alert('Email Failed, try again later.');
			})
		}

		issueService.getIssueDetails(issue).then(function (issueDetails) {
			self.message = issueDetails.message;
			self.recipients = issueDetails.recipients;
		});

		this.addRecipient = addRecipient;
		this.email = email;
	}

	function issuesConfirmCtrl ($stateParams) {
		this.issue = $stateParams.issue;
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesFormCtrl', issuesFormCtrl)
		.controller('issuesConfirmCtrl', issuesConfirmCtrl);

})();