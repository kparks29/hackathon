(function () {
	'use strict';

	function issueService($http, $q) {
		function getIssueDetails (issue) {
			return $http.get('common/data/' + issue + '.json').then(function (response) {
				return response.data;
			});
		}
		function email (payload) {
			return $q.when();
		}
		return {
			getIssueDetails: getIssueDetails,
			email: email
		};
	}

	angular.module('HACKATHON.service')
		.service('issueService', issueService);

})();