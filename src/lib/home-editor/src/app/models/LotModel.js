(function (angular, _, chance) {
'use strict';
function LotModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Creates a new LotModel with the given payload.
 *
 * @class LotModel
 * @classdesc
 * This is a wrapper object for the LotModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the LotModel payload.
 *
 * @param {object} params - Payload object from server
 */
function LotModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeLotModelProperties();
}

// Extending the SpaceModel Class
LotModel.prototype = Object.create(SpaceModel.prototype);
LotModel.prototype.constructor = LotModel;
var proto = LotModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeLotModelProperties = function () {
  /**
   * The lot's size in square feet.
   *
   * @name LotModel#lotSize
   * @type {Number}
   */
  this.set('lotSize', this.get('lotSize') || 0);

  this.modelType = 'LotModel';
}

return LotModel;
}

angular.module('HomeEditor.Models')
    .factory('LotModel', LotModelDefinition);

})(angular, _);
