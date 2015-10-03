(function () {
	'use strict';

	describe('Filters', function () {

		var $filter;

		beforeEach(module('HACKATHON.filters'));

		beforeEach(inject(function (_$filter_) {
			$filter = _$filter_;
		}));

		describe('levelNiceName', function () {

			it('returns a nice name for level #', function () {
				var levelNiceName = $filter('levelNiceName');
				expect(levelNiceName('1st')).toEqual('1st floor');
				expect(levelNiceName(1)).toEqual('1st floor');
				expect(levelNiceName('1')).toEqual('1st floor');

				expect(levelNiceName(2)).toEqual('2nd floor');
				expect(levelNiceName('2')).toEqual('2nd floor');

				expect(levelNiceName(3)).toEqual('3rd floor');
				expect(levelNiceName('3')).toEqual('3rd floor');

				expect(levelNiceName(4)).toEqual('4th floor');
				expect(levelNiceName('4')).toEqual('4th floor');

				expect(levelNiceName(5)).toEqual('5th floor');
				expect(levelNiceName('5')).toEqual('5th floor');

				expect(levelNiceName(6)).toEqual('6th floor');
				expect(levelNiceName('6')).toEqual('6th floor');

				expect(levelNiceName(7)).toEqual('7th floor');
				expect(levelNiceName('7')).toEqual('7th floor');

				expect(levelNiceName(8)).toEqual('8th floor');
				expect(levelNiceName('8')).toEqual('8th floor');

				expect(levelNiceName(22)).toEqual('22nd floor');
				expect(levelNiceName('22')).toEqual('22nd floor');
			});

			it('returns the original input if not a number', function () {
				var levelNiceName = $filter('levelNiceName');
				expect(levelNiceName({})).toEqual({});
				expect(levelNiceName('first')).toEqual('first');
			})

		});

		describe('stateToFull', function () {
			it('returns the full name of a state if it exists', function () {
				var stateToFullName = $filter('stateToFullName');
				expect(stateToFullName('CA')).toEqual('California');
				expect(stateToFullName('TX')).toEqual('Texas');
				expect(stateToFullName('missing')).toEqual('missing');
			});
		});

		describe('stateToAbbreviation', function () {
			it('returns the abbreviation of a state if it exists', function () {
				var stateToAbbreviation = $filter('stateToAbbreviation');
				expect(stateToAbbreviation('California')).toEqual('CA');
				expect(stateToAbbreviation('Texas')).toEqual('TX');
				expect(stateToAbbreviation('missing')).toEqual('missing');
			});
		});

		describe('tel', function () {
			it('converts a phone number to our preferred format', function () {
				var tel = $filter('tel');
				expect(tel('555-555-1234')).toEqual('(555) 555-1234');
				expect(tel('(555) 555-1234')).toEqual('(555) 555-1234');
				expect(tel('555 555 1234')).toEqual('(555) 555-1234');
			});

			it('returns original input if not a telephone number', function () {
				var tel = $filter('tel');
				expect(tel('string')).toEqual('string');
				expect(tel('')).toEqual('');
				expect(tel(undefined)).toEqual('');
				expect(tel()).toEqual('');
				expect(tel(1234567891011)).toEqual(1234567891011);
				expect(tel(123)).toEqual(123);
				expect(tel({})).toEqual({});
			});

			it('can handle international numbers', function () {
				var tel = $filter('tel');
				expect(tel('2 555-555-1234')).toEqual('2 (555) 555-1234');
				expect(tel('235 55-555-1234')).toEqual('235 (55) 555-1234');
			});
		});

	});

})();