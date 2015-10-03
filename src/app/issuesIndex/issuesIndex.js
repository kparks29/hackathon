(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider.state('issues-index', {
			url: '/',
			templateUrl: 'app/issuesIndex/issuesIndex.html',
			controller: 'issuesIndexCtrl as indexCtrl'
		});
	}

	function issuesIndexCtrl () {
		this.issues = [
      {
        "_id": 1,
        "title": "LA Homeless State of Emergency",
        "slug": "la-homeless-state-of-emergency",
        "description": "The Los Angeles City Council on Tuesday declared a state of emergency on homelessness, calling for $100 million to help address the growing crisis..."
      },
      {
        "_id": 2,
        "title": "Issue Number Two",
        "slug": "issue-number-two",
        "description": "Lorem ipsum..."
      }];
	}

	angular.module('HACKATHON.controllers')
		.config(config)
		.controller('issuesIndexCtrl', issuesIndexCtrl);

})();
