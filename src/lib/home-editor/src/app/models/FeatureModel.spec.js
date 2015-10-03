(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'id':           'f1',
    'name':         'FeatureModel1',
    'featureType': 'FeatureModelType1',
    'images':       ['i1'],
    'documents':    ['d1']
};

describe('Model: FeatureModel', function () {
    var FeatureModel,
        Structure;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        FeatureModel   = $injector.get('FeatureModel');
        Structure = $injector.get('StructureModel');
    }));

    describe('constructor', function () {
        it('initializes properties with default properties when given no params', function () {
            var f = new FeatureModel();
            expect(typeof f.get('id')).toEqual('string');
            expect(typeof f.get('name')).toEqual('string');
            expect(typeof f.get('featureType')).toEqual('string');
            expect(f.get('images') instanceof Array).toBe(true);
            expect(f.get('documents') instanceof Array).toBe(true);
        });
        it('initializes properties with values given in params', function () {
            var mockParam = {
                id: '123',
                name: 'FeatureModel 1',
                featureType: 'FeatureModel Type 1'
            };
            var f = new FeatureModel(mockParam);
            expect(f.get('id')).toEqual(mockParam.id);
            expect(f.get('name')).toEqual(mockParam.name);
            expect(f.get('featureType')).toEqual(mockParam.featureType);
        });
    });

    describe('property:', function () {
        var h, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            h = new FeatureModel(mockPayload);
        });

        describe('id', function () {
            it('is defined', function () {
                expect(h.get('id')).toBeDefined();
            });
        });

        describe('name', function () {
            it('is defined', function () {
                expect(h.get('name')).toBeDefined();
            });
        });

        describe('featureType', function () {
            it('is defined', function () {
                expect(h.get('featureType')).toBeDefined();
            });
        });

        describe('images', function () {
            it('is defined', function () {
                expect(h.get('images')).toBeDefined();
            });
        });

        describe('documents', function () {
            it('is defined', function () {
                expect(h.get('documents')).toBeDefined();
            });
        });

        describe('location', function () {
            it('is set to null by default', function () {
                var a = new FeatureModel();
                expect(a.location).toEqual(null);
            });
        });

        describe('modelType', function () {
            it('is set to \'FeatureModel\'', function () {
                expect(h.modelType).toBe('FeatureModel');
            });
        });
    });
});


})(_);
