(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'id':            's1',
    'notes':         'structure notes',
    'name':          'structureName1',
    'structureType': 'structureType1',
    'size':          500,
    'levels':        2,
    'primaryImage':  '',
    'features':      [{
        'id':           'sf1',
        'name':         'sFeature1',
        'featureType':  'sFeatureType1',
        'images':       ['i6'],
        'documents':    []
    },{
        'id':           'sf2',
        'name':         'sFeature2',
        'featureType':  'sFeatureType2',
        'images':       ['i7'],
        'documents':    []
    }],
    'appliances':    [{
        'id' :          'sa1',
        'name':         'sAppliance1',
        'applianceId':  'sApplianceId1',
        'images':       ['i8'],
        'documents':    []
    }],
    'rooms':         [{
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
    }],
    'images': ['i9']
};

describe('Model: StructureModel', function () {
    var StructureModel, Room;

    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        StructureModel = $injector.get('StructureModel');
        Room      = $injector.get('RoomModel');
    }));

    describe('constructor', function () {
        it('does not throw an error if no payload is given', function () {
            expect(function () {
                new StructureModel();
            }).not.toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new StructureModel({});
            }).not.toThrow();
        });
    });

    describe('internal property:', function () {
        var s;
        beforeEach(function () {
            s = new StructureModel();
        });

        describe('id', function () {
            it('is defined', function () {
                expect(s.get('id')).toBeDefined();
            });
        });

        describe('name', function () {
            it('is defined', function () {
                expect(s.get('name')).toBeDefined();
            });
        });

        describe('structureType', function () {
            it('is defined', function () {
                expect(s.get('structureType')).toBeDefined();
            });
        });

        describe('size', function () {
            it('is defined', function () {
                expect(s.get('size')).toBeDefined();
            });
        });

        describe('levels', function () {
            it('is defined', function () {
                expect(s.get('levels')).toBeDefined();
            });
        });

        describe('rooms', function () {
            it('is defined', function () {
                expect(s.get('rooms')).toBeDefined();
            });
        });

        describe('notes', function () {
            it('is defined', function () {
                expect(s.get('notes')).toBeDefined();
            });
        });

        describe('appliances', function () {
            it('is defined', function () {
                expect(s.get('appliances')).toBeDefined();
            });
        });

        describe('features', function () {
            it('is defined', function () {
                expect(s.get('features')).toBeDefined();
            });
        });

        describe('primaryImage', function () {
            it('is defined', function () {
                expect(s.get('primaryImage')).toBeDefined();
            });
        });

        describe('images', function () {
            it('is defined', function () {
                expect(s.get('images')).toBeDefined();
            });
        });

        describe('documents', function () {
            it('is defined', function () {
                expect(s.get('documents')).toBeDefined();
            });
        });
    });

    describe('external property:', function () {
        var s;
        beforeEach(function () {
            s = new StructureModel();
        });

        describe('features', function () {
            it('is defined', function () {
                expect(s.features).toBeDefined();
            });
        });

        describe('appliances', function () {
            it('is defined', function () {
                expect(s.appliances).toBeDefined();
            });
        });

        describe('rooms', function () {
            beforeEach(function () {
                s = new StructureModel(MOCK_PAYLOAD);
            });
            it('is populated from the internal object by default', function () {
                expect(s.get('rooms').length).toBe(s.rooms.length);
            });
        });

        describe('modelType', function () {
            it('is set to \'StructureModel\'', function () {
                expect(s.modelType).toBe('StructureModel');
            });
        });
    });

    describe('method:', function () {
        var s;
        beforeEach(function () {
            s = new StructureModel();
        });

        describe('addFeature()', function () {
            it('is defined', function () {
                expect(s.addFeature).toBeDefined();
            });
        });

        describe('removeFeature()', function () {
            it('is defined', function () {
                expect(s.removeFeature).toBeDefined();
            });
        });

        describe('addAppliance()', function () {
            it('is defined', function () {
                expect(s.addAppliance).toBeDefined();
            });
        });

        describe('removeAppliance()', function () {
            it('is defined', function () {
                expect(s.removeAppliance).toBeDefined();
            });
        });

        describe('addRoom()', function () {
        	it('returns the new room that was added', function () {
                var result = s.addRoom(MOCK_PAYLOAD.rooms[0]);
                expect(result.internal).toEqual(MOCK_PAYLOAD.rooms[0]);
        	});
            it('adds a room to both external and internal room arrays', function () {
                expect(s.get('rooms').length).toBe(0);
                expect(s.rooms.length).toBe(0);

                s.addRoom(MOCK_PAYLOAD.rooms[0]);

                expect(s.get('rooms')[0]).toBe(MOCK_PAYLOAD.rooms[0]);
                expect(s.rooms[0].internal).toBe(MOCK_PAYLOAD.rooms[0]);
                expect(s.rooms[0].location).toBe(s);
            });
        });

        describe('removeRoom()', function () {
            it('removes a room with the given id from both internal/external room arrays', function () {
                s.addRoom(MOCK_PAYLOAD.rooms[0]);
                s.addRoom(MOCK_PAYLOAD.rooms[1]);
                expect(s.get('rooms').length).toBe(2);
                expect(s.rooms.length).toBe(2);

                s.removeRoom(MOCK_PAYLOAD.rooms[0].id);

                expect(s.get('rooms').length).toBe(1);
                expect(s.rooms.length).toBe(1);
            });
        });

        describe('rebuildStructureModelInternal()', function () {
            it('adds any new Room models into the internal rooms array', function () {
                var lengthBefore = s.get('rooms').length;
                s.rooms.push(new Room({
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
                }));
                expect(s.get('rooms').length).toBe(lengthBefore);

                s.rebuildStructureModelInternal();

                expect(s.get('rooms').length).toBe(lengthBefore + 1);
            });
            it('removes any old Room Models from the internal room array', function () {
                s = new StructureModel(MOCK_PAYLOAD);
                s.rooms.pop();
                expect(s.get('rooms').length).not.toBe(s.rooms.length);

                s.rebuildStructureModelInternal();

                expect(s.get('rooms').length).toBe(s.rooms.length);
            });
        });
    });
});


})(_);
