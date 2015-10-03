/*
SpaceModel
- implements Imageable and Documentable
- getFeature/Appliance(uuid)
  - returns a Feature object whose .internal property points to the feature object in the space’s internal object
- getFeatures/Appliances()
  - returns all features/appliances as Feature/Appliance model objects
- addFeature/Appliance
  - takes in some object? or should the user have to do .addFeature(new Feature({some object}))
- removeFeature/Appliance

- TODO
  - how does set behave when you do this.set(‘features’, a value that isn’t a valid features array)? Override set?
  - get(‘features’) vs getFeatures might get confusing
*/
(function (angular, _, chance) {
'use strict';

function SpaceModelDefinition (BaseModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Constructs the SpaceModel
 * @class SpaceModel
 * @classdesc
 * The class that defines the methods and properties of all spaces (e.g. Lot, Structure, Room, etc.).
 * This class is a child of the BaseModel class.
 */
function SpaceModel (params) {
  // Calling the superclass' constructor
  BaseModel.call(this, params);
  this.initializeDocuments();
  this.initializeImages();
  this.initializeProperties();
}

// Extending the BaseModel Class
SpaceModel.prototype = Object.create(BaseModel.prototype);
SpaceModel.prototype.constructor = SpaceModel;
var proto = SpaceModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
    /**
     * The Space model's instance ID.
     * @name SpaceModel#id
     * @type {String}
     */
    this.set('id', this.get('id') || chance.guid());

    /**
     * @name SpaceModel#features
     * @type {Array<Object>}
     */
    this.set('features', this.get('features') || []);

    /**
     * @name SpaceModel#appliances
     * @type {Array<Object>}
     */
    this.set('appliances', this.get('appliances') || []);

    /**
     * @name SpaceModel#notes
     * @type {String}
     */
    this.set('notes', this.get('notes') || '');

    this.features = buildFeatureModels(this.get('features'));
    var self = this;
    _.each(this.features, function (featureModel) {
        featureModel.location = self;
    });

    this.appliances = buildApplianceModels(this.get('appliances'));
    _.each(this.appliances, function (applianceModel) {
        applianceModel.location = self;
    });
}

/**
 * Adds the new feature to internal features and external features.
 * @param {Object} featureParams Feature parameters
 */
proto.addFeature = function (featureParams) {
  var newFeature = new FeatureModel(featureParams);
  newFeature.location = this;
  this.features.push(newFeature);
  this.get('features').push(newFeature.internal);
  return newFeature;
};

/**
 * Adds the new appliance to internal appliances and external appliances
 * @param {Object} applianceParams Properties for new Appliance
 */
proto.addAppliance = function (applianceParams) {
  var newAppliance = new ApplianceModel(applianceParams);
  newAppliance.location = this;
  this.appliances.push(newAppliance);
  this.get('appliances').push(newAppliance.internal);
  return newAppliance;
};

/**
 * Removes the feature with the given instance ID from the SpaceModel.
 * Removes from both internal and external features properties.
 * @param  {featureId} featureId Instance ID of the feature to remove
 */
proto.removeFeature = function (featureId) {
  _.remove(this.get('features'), function (feature) {
    return feature.id === featureId;
  });
  _.remove(this.features, function (featureModel) {
    featureModel.location = null;
    return featureModel.get('id') === featureId;
  });
};

/**
 * Removes the appliance with the given instance ID from the SpaceModel.
 * Removes from both internal and external appliances properties.
 * @param  {applianceId} applianceId Instance ID of the appliance to remove
 */
proto.removeAppliance = function (applianceId) {
  _.remove(this.get('appliances'), function (appliance) {
    return appliance.id === applianceId;
  });
  _.remove(this.appliances, function (applianceModel) {
    applianceModel.location = null;
    return applianceModel.get('id') === applianceId;
  });
};

/**
 * Ensures that the internal features and appliances properties
 * match up with the models stored on the external features/appliances.
 */
proto.rebuildSpaceModelInternal = function () {
  this.set('features', buildFeatureInternals(this.features));
  this.set('appliances', buildApplianceInternals(this.appliances));
};

function buildFeatureModels (internalArray) {
  return _.map(internalArray, function (feature) {
    return new FeatureModel(feature);
  });
}

function buildFeatureInternals (featureModels) {
  return _.pluck(featureModels, 'internal');
}

/**
 * Given an array of objects, returns an array of ApplianceModel objects.
 * @param  {Array<Object>} internalArray Array of objects
 * @return {Array<Feature>}              Array of ApplianceModels built from the given object array
 */
function buildApplianceModels (internalArray) {
  return _.map(internalArray, function (appliance) {
    return new ApplianceModel(appliance);
  });
}

function buildApplianceInternals (applianceModels) {
  return _.pluck(applianceModels, 'internal');
}

return SpaceModel;

}

angular.module('HomeEditor.Models')
  .factory('SpaceModel', SpaceModelDefinition);

})(angular, _, chance);
