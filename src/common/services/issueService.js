(function () {
	'use strict';

	function issueService($http) {
		function getIssueDetails (issue) {
			return $http.get('common/data/' + issue + '.json').then(function (response) {
				return response.data;
			});
		}
    function getIssueIndexDetails () {
      return $http.get('common/data/issuesIndex.json').then(function (response) {
        return response.data;
      });
    }
		return {
			getIssueDetails: getIssueDetails,
      getIssueIndexDetails: getIssueIndexDetails
		};
	}

	angular.module('HACKATHON.service')
		.service('issueService', issueService);

})();
