(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'postalCode': '92663',
    'state':      'CA',
    'city':       'Newport Beach',
    'street':     '123 Demo St.',
    'unit':       '100'
};

describe('Model: Address', function () {
    var Address;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        Address = $injector.get('AddressModel');
    }));

    describe('constructor', function () {
        it('does not throw an error if no payload is given', function () {
            expect(function () {
                new Address();
            }).not.toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new Address({});
            }).not.toThrow();
        });
    });

    describe('property:', function () {
        var a, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            a = new Address(mockPayload);
        });

        describe('payload', function () {
            it('points to the same object given in the constructor', function () {
                expect(a.payload).toEqual(mockPayload);
            });
        });

        describe('postalCode', function () { 
            it('accesses the postalCode property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.payload.postalCode = EXPECTED_VALUE;
                expect(a.postalCode).toEqual(a.payload.postalCode);
                expect(a.postalCode).toEqual(EXPECTED_VALUE);
            });
            it('modifies the postalCode property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.postalCode = EXPECTED_VALUE;
                expect(a.payload.postalCode).toEqual(a.postalCode);
                expect(a.payload.postalCode).toEqual(EXPECTED_VALUE);
            });
        });

        describe('state', function () { 
            it('accesses the state property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.payload.state = EXPECTED_VALUE;
                expect(a.state).toEqual(a.payload.state);
                expect(a.state).toEqual(EXPECTED_VALUE);
            });
            it('modifies the state property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.state = EXPECTED_VALUE;
                expect(a.payload.state).toEqual(a.state);
                expect(a.payload.state).toEqual(EXPECTED_VALUE);
            });
        });

        describe('street', function () { 
            it('accesses the street property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.payload.street = EXPECTED_VALUE;
                expect(a.street).toEqual(a.payload.street);
                expect(a.street).toEqual(EXPECTED_VALUE);
            });
            it('modifies the street property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.street = EXPECTED_VALUE;
                expect(a.payload.street).toEqual(a.street);
                expect(a.payload.street).toEqual(EXPECTED_VALUE);
            });
        });

        describe('city', function () { 
            it('accesses the city property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.payload.city = EXPECTED_VALUE;
                expect(a.city).toEqual(a.payload.city);
                expect(a.city).toEqual(EXPECTED_VALUE);
            });
            it('modifies the city property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.city = EXPECTED_VALUE;
                expect(a.payload.city).toEqual(a.city);
                expect(a.payload.city).toEqual(EXPECTED_VALUE);
            });
        });

        describe('unit', function () {
            it('accesses the unit property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.payload.unit = EXPECTED_VALUE;
                expect(a.unit).toEqual(a.payload.unit);
                expect(a.unit).toEqual(EXPECTED_VALUE);
            });
            it('modifies the unit property on the payload', function () {
                var EXPECTED_VALUE = {};
                a.unit = EXPECTED_VALUE;
                expect(a.payload.unit).toEqual(a.unit);
                expect(a.payload.unit).toEqual(EXPECTED_VALUE);
            });
        });
    });
});


})(_);