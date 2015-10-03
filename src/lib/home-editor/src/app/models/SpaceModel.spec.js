(function (_) {
'use strict';

var MOCK_PAYLOAD = {
  id: 123,
  features: [{
    'id':           'f1',
    'name':         'Feature1',
    'featureType': 'FeatureType1',
    'images':       ['i1'],
    'documents':    ['d1']
  },{
    'id':           'f2',
    'name':         'Feature2',
    'featureType': 'FeatureType2',
    'images':       ['i2'],
    'documents':    ['d2']
  }],
  appliances: [{
    'id':           'a1',
    'name':         'Appliance1',
    'applianceId':  'ApplianceType1',
    'images':       ['i1'],
    'documents':    ['d1']
  }],
  notes: 'test notes'
};

describe('Model: SpaceModel', function () {
  var SpaceModel, Feature, Appliance;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    SpaceModel = $injector.get('SpaceModel');
    Appliance = $injector.get('ApplianceModel');
    Feature = $injector.get('FeatureModel');
  }));

  describe('constructor', function () {
    it('creates an object when object not given', function () {
      expect(function () {
        var sm = new SpaceModel();
      }).not.toThrow();
    });
    it('sets the internal object when given an object', function () {
      var sm = new SpaceModel(MOCK_PAYLOAD);
      expect(sm.internal).toEqual(MOCK_PAYLOAD);
    });
  });

  describe('internal property:', function () {
    var sm;
    beforeEach(function () {
      sm = new SpaceModel();
    });
    describe('id', function () {
      it('is a string', function () {
        expect(typeof(sm.get('id'))).toBe('string');
      });
    });
    describe('features', function () {
      it('is an array', function () {
        expect(sm.get('features') instanceof Array).toBe(true);
      });
    });
    describe('appliances', function () {
      it('is an array', function () {
        expect(sm.get('appliances') instanceof Array).toBe(true);
      });
    });
    describe('notes', function () {
      it('is a string', function () {
        expect(typeof(sm.get('notes'))).toBe('string');
      });
    });
  });

  describe('external property:', function () {
    var sm;
    beforeEach(function () {
      sm = new SpaceModel(MOCK_PAYLOAD);
    });

    describe('features', function () {
      it('is populated if SpaceModel is constructed with features', function () {
        expect(sm.features.length).toBe(2);
      });
    });

    describe('appliances', function () {
      it('is populated if SpaceModel is constructed with appliances', function () {
        expect(sm.appliances.length).toBe(1);
      });
    });
  });

  describe('method:', function () {
    var sm;
    beforeEach(function () {
      sm = new SpaceModel();
    });

    describe('addFeature', function () {
      it('adds a feature to both external and internal feature arrays', function () {
        expect(sm.get('features').length).toBe(0);
        expect(sm.features.length).toBe(0);

        sm.addFeature(MOCK_PAYLOAD.features[0]);

        expect(sm.get('features')[0]).toBe(MOCK_PAYLOAD.features[0]);
        expect(sm.features[0].internal).toBe(MOCK_PAYLOAD.features[0]);
        expect(sm.features[0].location).toBe(sm);
      });
      it('returns the FeatureModel added', function () {
      	var result = sm.addFeature(MOCK_PAYLOAD.features[0]);
      	expect(result.internal).toBe(MOCK_PAYLOAD.features[0]);
      });
    });

    describe('removeFeature', function () {
      it('removes a feature with the given id from both internal/external feature arrays', function () {
        sm.addFeature(MOCK_PAYLOAD.features[0]);
        sm.addFeature(MOCK_PAYLOAD.features[1]);
        expect(sm.get('features').length).toBe(2);
        expect(sm.features.length).toBe(2);

        sm.removeFeature(MOCK_PAYLOAD.features[0].id);

        expect(sm.get('features').length).toBe(1);
        expect(sm.features.length).toBe(1);
      });
    });

    describe('addAppliance', function () {
      it('adds a appliance to both external and internal appliance arrays', function () {
        expect(sm.get('appliances').length).toBe(0);
        expect(sm.appliances.length).toBe(0);

        sm.addAppliance(MOCK_PAYLOAD.appliances[0]);

        expect(sm.get('appliances')[0]).toBe(MOCK_PAYLOAD.appliances[0]);
        expect(sm.appliances[0].internal).toBe(MOCK_PAYLOAD.appliances[0]);
        expect(sm.appliances[0].location).toBe(sm);
      });
      it('returns the ApplianceModel that was added', function () {
      	var result = sm.addAppliance(MOCK_PAYLOAD.appliances[0]);
      	expect(result.internal).toBe(MOCK_PAYLOAD.appliances[0]);
      });
    });

    describe('removeAppliance', function () {
      it('removes a appliance with the given id from both internal/external appliance arrays', function () {
        sm.addAppliance(MOCK_PAYLOAD.appliances[0]);
        sm.addAppliance(MOCK_PAYLOAD.appliances[1]);
        expect(sm.get('appliances').length).toBe(2);
        expect(sm.appliances.length).toBe(2);

        sm.removeAppliance(MOCK_PAYLOAD.appliances[0].id);

        expect(sm.get('appliances').length).toBe(1);
        expect(sm.appliances.length).toBe(1);
      });
    });

    describe('rebuildSpaceModelInternal', function () {
      it('adds any new Feature models into the internal features array', function () {
        var lengthBefore = sm.get('features').length;
        sm.features.push(new Feature({
          id:           'f3',
          name:         'Feature3',
          featureType:  'FeatureType3',
          images:       ['i3'],
          documents:    ['d3']
        }));
        expect(sm.get('features').length).toBe(lengthBefore);

        sm.rebuildSpaceModelInternal();

        expect(sm.get('features').length).toBe(lengthBefore + 1);
      });
      it('adds any new Appliance models into the internal appliances array', function () {
        var lengthBefore = sm.get('appliances').length;
        sm.appliances.push(new Appliance({
          id:           'a3',
          name:         'Appliance3',
          featureType:  'ApplianceType3',
          images:       ['i3'],
          documents:    ['d3']
        }));
        expect(sm.get('appliances').length).toBe(lengthBefore);

        sm.rebuildSpaceModelInternal();

        expect(sm.get('appliances').length).toBe(lengthBefore + 1);
      });
      it('removes any old Feature/Appliance Models from the internal features/appliances array', function () {
        sm = new SpaceModel(MOCK_PAYLOAD);
        sm.features.pop();
        sm.appliances.pop();
        expect(sm.get('features').length).not.toBe(sm.features.length);
        expect(sm.get('appliances').length).not.toBe(sm.appliances.length);

        sm.rebuildSpaceModelInternal();

        expect(sm.get('features').length).toBe(sm.features.length);
        expect(sm.get('appliances').length).toBe(sm.appliances.length);
      });
    });
  });

});

})(_);
