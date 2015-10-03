(function () {
	'use strict';

	function issueService($http) {
		function getIssueDetails (issue) {
			return $http.get('common/data/' + issue + '.json').then(function (response) {
				return response.data;
			});
		}
		return {
			getIssueDetails: getIssueDetails
		};
	}

	angular.module('HACKATHON.service')
		.service('issueService', issueService);

})();