(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'id':            'r1',
    'name':          'roomName1',
    'roomType':      'roomType1',
    'level':         0,
    'size':          0,
    'primaryImage': 'i1',
    'notes':         'notes1',
    'features':      [{
        'id':           'f1',
        'name':         'feature1',
        'featureType':  'featureType1',
        'images':       ['i4'],
        'documents':    []
    },{
        'id':           'f2',
        'name':         'feature2',
        'featureType':  'featureType2',
        'images':       ['i3'],
        'documents':    []
    }],
    'appliances':    [{
        'id' :          'a1',
        'name':         'appliance1',
        'applianceId':  'applianceId1',
        'images':       ['i5'],
        'documents':    []
    }],
    'images':        ['i1', 'i2']
};

describe('Model: RoomModel', function () {
    var RoomModel;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        RoomModel          = $injector.get('RoomModel');
    }));

    describe('constructor', function () {
        it('does not throw an error if no payload is given', function () {
            expect(function () {
                new RoomModel();
            }).not.toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new RoomModel(MOCK_PAYLOAD);
            }).not.toThrow();
        });
    });

    describe('internal property:', function () {
        var r;
        beforeEach(function () {
            r = new RoomModel();
        });

        describe('id', function () {
            it('is defined', function () {
                expect(r.get('id')).toBeDefined();
            });
        });

        describe('name', function () {
            it('defaults to an empty string', function () {
                expect(r.get('name')).toBe('');
            });
        });

        describe('roomType', function () {
            it('defaults to an empty string', function () {
                expect(r.get('roomType')).toBe('');
            });
        });

        describe('level', function () {
            it('defaults to 1', function () {
                expect(r.get('level')).toBe(1);
            });
        });

        describe('size', function () {
            it('defaults to 0', function () {
                expect(r.get('size')).toBe(0);
            });
        });

        describe('primaryImage', function () {
            it('is defined', function () {
                expect(r.get('primaryImage')).toBeDefined();
            });
        });

        describe('notes', function () {
            it('is defined', function () {
                expect(r.get('notes')).toBeDefined();
            });
        });

        describe('images', function () {
            it('is defined', function () {
                expect(r.get('images')).toBeDefined();
            });
        });

        describe('features', function () {
            it('is defined', function () {
                expect(r.get('features')).toBeDefined();
            });
        });

        describe('appliances', function () {
            it('is defined', function () {
                expect(r.get('appliances')).toBeDefined();
            });
        });
    });
    describe('external property:', function () {
        var r;
        beforeEach(function () {
            r = new RoomModel();
        });

        describe('location', function () {
            it('defaults to null', function () {
                expect(r.location).toBeNull();
            });
        });

        describe('features', function () {
            it('is defined', function () {
                expect(r.features).toBeDefined();
            });
        });

        describe('appliances', function () {
            it('is defined', function () {
                expect(r.appliances).toBeDefined();
            });
        });

        describe('modelType', function () {
            it('is set to \'RoomModel\'', function () {
                expect(r.modelType).toBe('RoomModel');
            });
        });
    });

    describe('method:', function () {
        var r;
        beforeEach(function () {
            r = new RoomModel();
        });
        describe('addFeature()', function () {
            it('is defined', function () {
                expect(r.addFeature).toBeDefined();
            });
        });

        describe('removeFeature()', function () {
            it('is defined', function () {
                expect(r.removeFeature).toBeDefined();
            });
        });

        describe('addAppliance()', function () {
            it('is defined', function () {
                expect(r.addAppliance).toBeDefined();
            });
        });

        describe('removeAppliance()', function () {
            it('is defined', function () {
                expect(r.removeAppliance).toBeDefined();
            });
        });
    });
});


})(_);
