(function () {
	'use strict';

	var apiUrl = 'http://voiceofsouthla.herokuapp.com',
		apiKey = 'alkfnqwejnfkandsklgfjkadafda';

	angular.module('HACKATHON.constants')
		.constant('apiUrl', apiUrl)
		.constant('apiKey', apiKey);
})();