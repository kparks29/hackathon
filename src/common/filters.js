(function () {
'use strict';

/**
 * Converts a number to 1st, 2nd, 3rd, 4th, etc.
 * @ngdoc filter
 * @name levelNiceName
 * @param {number} level level/floor
 * @return {string} level formatted level string
 */
function levelNiceName () {

	function ordinal (input) {
		var s = ['th','st','nd','rd'],
			v = input % 100;
		return input + (s[(v-20)%10]||s[v]||s[0]);
	}

	return function (input) {
		if (_.isNaN(parseInt(input))) {
			return input;
		} else {
			return ordinal(parseInt(input)) + ' floor';
		}
	};
}

var states = {
	'AL': 'Alabama',
	'AK': 'Alaska',
	'AS': 'American Samoa',
	'AZ': 'Arizona',
	'AR': 'Arkansas',
	'CA': 'California',
	'CO': 'Colorado',
	'CT': 'Connecticut',
	'DE': 'Delaware',
	'DC': 'District Of Columbia',
	'FM': 'Federated States Of Micronesia',
	'FL': 'Florida',
	'GA': 'Georgia',
	'GU': 'Guam',
	'HI': 'Hawaii',
	'ID': 'Idaho',
	'IL': 'Illinois',
	'IN': 'Indiana',
	'IA': 'Iowa',
	'KS': 'Kansas',
	'KY': 'Kentucky',
	'LA': 'Louisiana',
	'ME': 'Maine',
	'MH': 'Marshall Islands',
	'MD': 'Maryland',
	'MA': 'Massachusetts',
	'MI': 'Michigan',
	'MN': 'Minnesota',
	'MS': 'Mississippi',
	'MO': 'Missouri',
	'MT': 'Montana',
	'NE': 'Nebraska',
	'NV': 'Nevada',
	'NH': 'New Hampshire',
	'NJ': 'New Jersey',
	'NM': 'New Mexico',
	'NY': 'New York',
	'NC': 'North Carolina',
	'ND': 'North Dakota',
	'MP': 'Northern Mariana Islands',
	'OH': 'Ohio',
	'OK': 'Oklahoma',
	'OR': 'Oregon',
	'PW': 'Palau',
	'PA': 'Pennsylvania',
	'PR': 'Puerto Rico',
	'RI': 'Rhode Island',
	'SC': 'South Carolina',
	'SD': 'South Dakota',
	'TN': 'Tennessee',
	'TX': 'Texas',
	'UT': 'Utah',
	'VT': 'Vermont',
	'VI': 'Virgin Islands',
	'VA': 'Virginia',
	'WA': 'Washington',
	'WV': 'West Virginia',
	'WI': 'Wisconsin',
	'WY': 'Wyoming'
};

/**
 * Converts a state abbreviation to the full name.
 * @ngdoc filter
 * @name stateToFullName
 * @param {string} state state abbreviation (e.g. 'CA')
 * @return {string} state full state name (e.g. 'California')
 */
function stateToFullName () {
	return function (input) {
		return states[input] || input;
	};
}

/**
 * Converts a state name to the abbreviation.
 * @ngdoc filter
 * @name stateToAbbreviation
 * @param {string} state state full name (e.g. 'California')
 * @return {string} state abbreviated state name (e.g. 'CA')
 */
function stateToAbbreviation () {
	return function (input) {
		return _.invert(states)[input] || input;
	};
}

function tel () {
	//TODO: get this to pass default .jshintrc maxcomplexity
	/* eslint-disable complexity */
	return function (tel) {
		if (!tel) {
			return '';
		}

		var value = tel.toString().trim().replace(/\D/g, '');

		if (!value || value.match(/[^0-9]/)) {
			return tel;
		}

		var country, city, number;

		switch (value.length) {
			case 10: // +1PPP####### -> C (PPP) ###-####
				country = 1;
				city = value.slice(0, 3);
				number = value.slice(3);
				break;

			case 11: // +CPPP####### -> CCC (PP) ###-####
				country = value[0];
				city = value.slice(1, 4);
				number = value.slice(4);
				break;

			case 12: // +CCCPP####### -> CCC (PP) ###-####
				country = value.slice(0, 3);
				city = value.slice(3, 5);
				number = value.slice(5);
				break;

			default:
				return tel;
		}

		if (country === 1) {
			country = '';
		}

		number = number.slice(0, 3) + '-' + number.slice(3);

		return (country + ' (' + city + ') ' + number).trim();
	};
	/* eslint-enable complexity */
}

angular.module('HACKATHON.filters', [])
	.filter('levelNiceName', levelNiceName)
	.filter('stateToFullName', stateToFullName)
	.filter('stateToAbbreviation', stateToAbbreviation)
	.filter('tel', tel);

})();