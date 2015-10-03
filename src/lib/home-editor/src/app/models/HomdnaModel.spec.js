(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'address' : {},
    'lot' : {
        'id': '1',
        'images': ['i1'],
        'lot_size': 1,
        'features': [{
            'id': 'f2',
            'name': 'lotfeature',
            'images': ['i8'],
            'documents': ['d5']
        }],
        'appliances': [{
            'id': 'a2',
            'name': 'appliance2',
            'images': ['i9'],
            'documents': ['d6']
        }]
    },
    'structures' : [{
        'id': 's1',
        'features': [{
            'id': 'f1',
            'name': 'structure1',
            'feature_type': 'ft1',
            'images': ['i6'],
            'documents': ['d3']
        }],
        'appliances': [{
            'id' : 'a1',
            'name': 'appliance1',
            'appliance_id': 'applianceid1',
            'images': ['i7'],
            'documents': ['d4']
        }],
        'rooms': [{
            'id': 'r1',
            'features': [{}, {}],
            'appliances': [{},{}]
        }]
    }, {
        'id': 's2',
        'features': [{
            'id': 'f3',
            'name': 'structure1',
            'feature_type': 'ft1',
            'images': ['i10'],
            'documents': ['d7']
        }],
        'appliances': [{
            'id' : 'a3',
            'name': 'appliance1',
            'appliance_id': 'applianceid1',
            'images': ['i11'],
            'documents': ['d8']
        }],
        'rooms' : [{
            'id': 'r2',
            'features': [{}, {}, {}],
            'appliances': [{},{}]
        }, {
            'id': 'r3'
        }]
    }],
    'images': ['i2','i3','i4','i5'],
    'documents': ['d1', 'd2']
};

describe('Model: HomdnaModel', function () {
    var HomdnaModel,
        Lot,
        Structure;
    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        HomdnaModel    = $injector.get('HomdnaModel');
        Lot       = $injector.get('LotModel');
        Structure = $injector.get('StructureModel');
    }));

    describe('constructor', function () {
        it('throws an error if no payload is given', function () {
            expect(function () {
                new HomdnaModel();
            }).not.toThrow();
        });

        it('successfully creates an object from a payload', function () {
            expect(function () {
                new HomdnaModel(MOCK_PAYLOAD);
            }).not.toThrow();
        });
    });

    describe('internal property:', function () {
        var h;
        beforeEach(function () {
            h = new HomdnaModel();
        });

        describe('lot', function () {
            it('is defined', function () {
                expect(h.get('lot')).toBeDefined();
            });
        });

        describe('structures', function () {
            it('is defined', function () {
                expect(h.get('structures')).toBeDefined();
            });
        });

        describe('primaryImage', function () {
            it('is defined', function () {
                expect(h.get('primaryImage')).toBeDefined();
            });
        });

        describe('images', function () {
            it('is defined', function () {
                expect(h.get('images')).toBeDefined();
            });
        });
    });

    describe('external property:', function () {
        var h;
        beforeEach(function () {
            h = new HomdnaModel();
        });

        describe('lot', function () {
            it('is populated with a lot model from the internal by default', function () {
                expect(h.lot.internal).toBe(h.get('lot'));
            });
        });

        describe('structures', function () {
            it('is populated with structures from the internal by default', function () {
                h = new HomdnaModel(MOCK_PAYLOAD);
                expect(h.structures.length).toBe(h.get('structures').length);
            });
        });
    });

    describe('method:', function () {
        var h, hWithPayload;
        beforeEach(function () {
            h = new HomdnaModel();
            hWithPayload = new HomdnaModel(MOCK_PAYLOAD);
        });

        describe('addStructure()', function () {
            it('adds a structure to both external and internal structure arrays', function () {
                expect(h.get('structures').length).toBe(0);
                expect(h.structures.length).toBe(0);

                h.addStructure(MOCK_PAYLOAD.structures[0]);

                expect(h.get('structures')[0]).toBe(MOCK_PAYLOAD.structures[0]);
                expect(h.structures[0].internal).toBe(MOCK_PAYLOAD.structures[0]);
            });
            it('returns the new structure that was added', function () {
            	var result = h.addStructure(MOCK_PAYLOAD.structures[0]);
            	expect(result.internal).toBe(MOCK_PAYLOAD.structures[0]);
            });
        });

        describe('removeStructure()', function () {
            it('removes a structure with the given id from both internal/external structure arrays', function () {
                h.addStructure(MOCK_PAYLOAD.structures[0]);
                h.addStructure(MOCK_PAYLOAD.structures[1]);
                expect(h.get('structures').length).toBe(2);
                expect(h.structures.length).toBe(2);

                h.removeStructure(MOCK_PAYLOAD.structures[0].id);

                expect(h.get('structures').length).toBe(1);
                expect(h.structures.length).toBe(1);
            });
        });

        describe('setLot()', function () {
            it('sets the homdna\'s lot to the a new one created from the params given', function () {
                var newLot = new Lot();
                expect(h.lot.internal).not.toBe(newLot.internal);

                h.setLot(newLot.internal);

                expect(h.lot.internal).toBe(newLot.internal);
            });
            it('returns the new lot added to the homdna', function () {
            	var newLot = new Lot();
            	var result = h.setLot(newLot.internal);
            	expect(result.internal).toBe(newLot.internal);
            });
        });

        describe('rebuildHomdnaModelInternal()', function () {
            it('updates the homdna internal object if a new structure is added', function () {
                var newStructure = new Structure();
                h.structures.push(newStructure);
                expect(h.get('structures').length).toBe(0);

                h.rebuildHomdnaModelInternal();

                expect(h.get('structures').length).toBe(1);
            });
        });

        describe('getAllRooms()', function () {
            it('returns all the rooms nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllRooms().length).toBe(3);
            });
        });

        describe('getAllFeatures()', function () {
            it('returns all the features nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllFeatures().length).toBe(8);
            });
        });

        describe('getAllAppliances()', function () {
            it('returns all the appliances nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllAppliances().length).toBe(7);
            });
        });

        describe('getAllDocumentables()', function () {
            it('returns all the documentable models nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllDocumentables().length).toBe(22);
            });
        });

        describe('getAllDocuments()', function () {
            it('returns all the documents nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllDocuments().length).toBe(8);
            });
        });

        describe('getAllSpaces()', function () {
            it('returns all the spaces nested in the HomdnaModel model', function () {
                expect(hWithPayload.getAllSpaces().length).toBe(6);
            });
        });

        describe('getAllSpacesAndElements()', function () {
            it('returns all the spaces, appliances, and features', function () {
                expect(hWithPayload.getAllSpacesAndElements().length).toBe(21);
            });
        });

        describe('getDocumentLocation()', function () {
            it('returns the DocumentableModel that contains the document ID given', function () {
                expect(hWithPayload.getDocumentLocation('d4').get('id')).toBe('a1');
            });
        });
    });
});

})(_);
