(function (angular, _, chance) {
'use strict';
function FeatureModelDefinition (BaseModel, ImageableModel, DocumentableModel) {

/**
 * Creates a new FeatureModel object based on homdna payload from the server. If no payload
 * is supplied, then a new feature payload is generated.
 *
 * @class FeatureModel
 * @classdesc
 * This is a wrapper object for the FeatureModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the FeatureModel payload.
 *
 * @param {Object} params FeatureModel parameters
 */
function FeatureModel(params) {
    BaseModel.call(this, params);
    this.initializeImages();
    this.initializeDocuments();
    this.initializeProperties();
}

// Extending the BaseModel Class
FeatureModel.prototype = Object.create(BaseModel.prototype);
FeatureModel.prototype.constructor = FeatureModel;
var proto = FeatureModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the FeatureModels exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
    /**
     * The feature's instance ID. Cannot be modified after being created.
     *
     * @name FeatureModel#id
     * @type {String}
     * @description Read only
     */
    this.set('id', this.get('id') || chance.guid());

    /**
     * The feature's name.
     *
     * @name FeatureModel#name
     * @type {String}
     */
    this.set('name', this.get('name') || '');

    /**
     * The feature's feature type.
     *
     * @name FeatureModel#featureType
     * @type {String}
     */
    this.set('featureType', this.get('featureType') || '');

    this.modelType = 'FeatureModel';
}

/**
 * The location that contains this FeatureModel.
 *
 * @todo Need to check if the location is a valid location
 * @name FeatureModel#location
 * @type {(Lot|Structure|Room|null)}
 */
proto.location = null;


return FeatureModel;
}

angular.module('HomeEditor.Models')
    .factory('FeatureModel', FeatureModelDefinition);

})(angular, _, chance);
