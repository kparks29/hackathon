(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'id':           '',
    'notes':        '',
    'lotSize' :     0,
    'primaryImage': '',
    'images':       ['i1'],
    'features':     [{
        'id':           'lf1',
        'name':         'lFeature1',
        'featureType':  'lFeatureType1',
        'images':       ['i2'],
        'documents':    []
    },{
        'id':           'lf2',
        'name':         'lFeature2',
        'featureType':  'lFeatureType2',
        'images':       ['i3'],
        'documents':    []
    }],
    'appliances':   [{
        'id' :          'la1',
        'name':         'lAppliance1',
        'applianceId':  'lApplianceId1',
        'images':       ['i4'],
        'documents':    []
    }]
};

describe('Model: LotModel', function () {
    var LotModel;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        LotModel = $injector.get('LotModel');
    }));

    describe('constructor', function () {
        it('sets the internal object when given an object', function () {
            var lm = new LotModel(MOCK_PAYLOAD);
            expect(lm.internal).toBe(MOCK_PAYLOAD);
        });
    });

    describe('property:', function () {
        var l;
        beforeEach(function () {
            l = new LotModel();
        });

        describe('id', function () {
            it('is defined', function () {
                expect(l.get('id')).toBeDefined();
            });
        });

        describe('notes', function () {
            it('is defined', function () {
                expect(l.get('notes')).toBeDefined();
            });
        });

        describe('lotSize', function () {
            it('set to 0 by default', function () {
                expect(l.get('lotSize')).toBeDefined();
            });
        });

        describe('modelType', function () {
            it('is set to \'LotModel\'', function () {
                expect(l.modelType).toBe('LotModel');
            });
        });

        describe('primaryImage', function () {
            it('is defined', function () {
                expect(l.get('primaryImage')).toBeDefined();
            });
        });

        describe('features', function () {
            it('is defined', function () {
                expect(l.get('features')).toBeDefined();
            });
        });

        describe('appliances', function () {
            it('is defined', function () {
                expect(l.get('appliances')).toBeDefined();
            });
        });
    });

    describe('method:', function () {
        var l, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            l = new LotModel(mockPayload);
        });

        describe('addFeature()', function () {
            it('is defined', function () {
                expect(l.addFeature).toBeDefined();
            });
        });

        describe('removeFeature()', function () {
            it('is defined', function () {
                expect(l.removeFeature).toBeDefined();
            });
        });

        describe('addAppliance()', function () {
            it('is defined', function () {
                expect(l.addAppliance).toBeDefined();
            });
        });

        describe('removeAppliance()', function () {
            it('is defined', function () {
                expect(l.removeAppliance).toBeDefined();
            });
        });
    });
});


})(_);
