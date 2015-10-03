(function () {
'use strict';

describe('Constant: API_URL', function () {

    var API_URL;

    beforeEach(module('HomeEditor.Constants'));

    beforeEach(inject(function ($injector) {
        API_URL = $injector.get('API_URL');
    }));

    describe('CORE', function () {
        it('is defined as a string', function () {
            expect(typeof API_URL.CORE).toBe('string');
        });
    });

    describe('APPLIANCE', function () {
        it('is defined as a string', function () {
            expect(typeof API_URL.CORE).toBe('string');
        });
    });

    describe('NOTIFICATION', function () {
        it('is defined as a string', function () {
            expect(typeof API_URL.CORE).toBe('string');
        });
    });

    describe('WEB', function () {
        it('is defined as a string', function () {
            expect(typeof API_URL.CORE).toBe('string');
        });
    });

});
})();