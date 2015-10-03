(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'id':           'a1',
    'name':         'ApplianceModel1',
    'applianceId':  'ApplianceModelType1',
    'images':       ['i1'],
    'documents':    ['d1']
};

describe('Model: ApplianceModel', function () {
    var ApplianceModel, Structure;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        ApplianceModel = $injector.get('ApplianceModel');
        Structure = $injector.get('StructureModel');
    }));

    describe('constructor', function () {
        it('creates an ApplianceModel with an empty payload if no payload is given', function () {
            var a = new ApplianceModel();
            expect(typeof a.get('id')).toEqual('string');
            expect(typeof a.get('name')).toEqual('string');
            expect(typeof a.get('applianceId')).toEqual('string');
            expect(a.get('images') instanceof Array).toBe(true);
            expect(a.get('documents') instanceof Array).toBe(true);
        });

        it('creates an ApplianceModel that refers to the payload provided', function () {
            var a = new ApplianceModel(MOCK_PAYLOAD);
            expect(a.get('id')).toEqual(MOCK_PAYLOAD.id);
            expect(a.get('name')).toEqual(MOCK_PAYLOAD.name);
            expect(a.get('applianceId')).toEqual(MOCK_PAYLOAD.applianceId);
        });
    });

    describe('property:', function () {
        var a, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            a = new ApplianceModel(mockPayload);
        });

        describe('id', function () {
            it('is defined', function () {
                expect(a.get('id')).toBeDefined();
            });
        });

        describe('name', function () {
            it('is defined', function () {
                expect(a.get('name')).toBeDefined();
            });
        });

        describe('applianceId', function () {
            it('is defined', function () {
                expect(a.get('applianceId')).toBeDefined();
            });
        });

        describe('images', function () {
            it('is defined', function () {
                expect(a.get('images')).toBeDefined();
            });
        });

        describe('documents', function () {
            it('is defined', function () {
                expect(a.get('documents')).toBeDefined();
            });
        });

        describe('location', function () {
            it('is set to null by default', function () {
                var a = new ApplianceModel();
                expect(a.location).toEqual(null);
            });
        });

        describe('modelType', function () {
            it('is set to \'ApplianceModel\'', function () {
                expect(a.modelType).toBe('ApplianceModel');
            });
        });
    });
});


})(_);
