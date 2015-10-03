'use strict';

describe('utils', function() {

	var convertFile,
		$localStorage,
		prepareJSON,
		generateUUID,
		$q,
		$window;

	beforeEach(module('HOMDNA.common.utils'));

	beforeEach(inject(function($injector) {
		convertFile = $injector.get('convertFile');
		prepareJSON = $injector.get('prepareJSON');
		$localStorage = $injector.get('$localStorage');
		generateUUID = $injector.get('generateUUID');
		$q = $injector.get('$q');
		$window = $injector.get('$window');
	}));

	describe('convertFile', function () {

		beforeEach(function () {
			spyOn(window, 'FileReader').and.callFake(function () {
				var result = 'data:image/png;base64,test';
				return {
					result: result,
					target: {
						result: result
					},
					readAsDataURL: function (file) {
						return this.onloadend(this);
					},
					readAsArrayBuffer: function () {
						return this.onloadend(this);
					}
				};
			});
		});
		afterEach(function () {

		});

		it('returns a promise that uses FileReader', function () {
			var test = convertFile({});
			expect(convertFile).toBeDefined();
			expect(test.then).toBeDefined();
			expect(window.FileReader).toHaveBeenCalled();
		});
	});

	describe('prepareJSON', function () {
		beforeEach(function () {
			spyOn(window, 'btoa').and.callThrough();
			spyOn(CryptoJS, 'MD5').and.callThrough();
			spyOn(angular, 'toJson').and.callThrough();
		});
		it('getMD5 should return an base64 MD5 hash', function () {
			var test = { test: 'myobject', $$angularProp: true },
				test1 = prepareJSON.getMD5(test);
			expect(test1).toBeDefined();
			expect(typeof test1).toEqual('string');
			expect(window.btoa).toHaveBeenCalled();
			expect(CryptoJS.MD5).toHaveBeenCalled();
			expect(angular.toJson).toHaveBeenCalled();
			// removes $$angular properties
			delete test.$$angularProp;
			var test2 = btoa(CryptoJS.MD5(angular.toJson(test)).toString());
			expect(test2).toEqual(test1)
		});
		it('getVersionUpdateHeaders should return the Content-MD5 and correct modified verions', function () {
			spyOn(prepareJSON, 'getMD5').and.callThrough();
			var headers = prepareJSON.getVersionUpdateHeaders({ test: true }, 1);
			expect(typeof headers).toEqual('object');
			expect(headers['Content-MD5']).toBeDefined();
			expect(prepareJSON.getMD5).toHaveBeenCalled();
			expect(headers['X-Homdna-Modified-Version']).toEqual('1');
			expect(headers['X-Homdna-Version']).toEqual('2');
		});

	});

	describe('$localStorage', function () {

		beforeEach(function () {
			delete $window.localStorage.test;
			delete $window.localStorage.testObj;
		});

		it('get/set should allow get/set on $window.localStorage', function () {
			expect(localStorage).toBeDefined();
			expect($localStorage.get('test')).toEqual(undefined);
			expect($localStorage.get('test', 'default')).toEqual('default');
			$localStorage.set('test', 'testValue');
			expect($localStorage.get('test')).toEqual('testValue');
			expect($localStorage.get('test', 'default')).toEqual('testValue');
			$localStorage.set('test', 'overwritten');
			expect($localStorage.get('test')).toEqual('overwritten');
		});

		it('get/set object should return the same JS object that was set', function () {
			expect(typeof $localStorage.getObject('testObj')).toEqual('object');
			expect($localStorage.getObject('anotherObj')).toEqual({});
			$localStorage.setObject('testObj', { test: 123, nested: { test: 4 }});
			expect(typeof $window.localStorage['testObj']).toEqual('string');
			expect($localStorage.getObject('testObj').nested.test).toEqual(4);
			expect(typeof $localStorage.getObject('testObj').test).toEqual('number');
		});
	});

	describe('generateUUID', function () {
		it('generates a random but valid UUID', function () {
			var uuid = generateUUID();
			expect(generateUUID).toBeDefined();
			expect(typeof generateUUID).toEqual('function');
			expect(typeof uuid).toEqual('string');
			expect(uuid.length).toEqual(36);
			expect(uuid).not.toEqual(generateUUID());
		});
	});

});