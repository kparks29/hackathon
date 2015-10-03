(function (angular, _, chance) {
'use strict';
function ApplianceModelDefinition (BaseModel, ImageableModel, DocumentableModel) {

/**
 * Creates a new ApplianceModel with the given payload.
 *
 * @class ApplianceModel
 * @classdesc
 * This is a wrapper object for the ApplianceModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the ApplianceModel payload.
 *
 * @param {Object} appliancePayload - Payload object from server
 */
function ApplianceModel(appliancePayload) {
    BaseModel.call(this, appliancePayload);
    this.initializeImages();
    this.initializeDocuments();
    this.initializeProperties();
}

// Extending the BaseModel Class
ApplianceModel.prototype = Object.create(BaseModel.prototype);
ApplianceModel.prototype.constructor = ApplianceModel;
var proto = ApplianceModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
  /**
   * The appliance's instance ID.
   *
   * @name ApplianceModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The appliance's name
   *
   * @name ApplianceModel#name
   * @type {String}
   */
  this.set('name', this.get('name') || '');

  /**
   * The appliance's appliance ID.
   *
   * @name ApplianceModel#applianceId
   * @type {String}
   */
  this.set('applianceId', this.get('applianceId') || '');

  this.modelType = 'ApplianceModel';
}

/**
 * The location that contains this ApplianceModel.
 *
 * @name ApplianceModel#location
 * @type {(Lot|Structure|Room|null)}
 */
proto.location = null;

return ApplianceModel;
}

angular.module('HomeEditor.Models')
    .factory('ApplianceModel', ApplianceModelDefinition);

})(angular, _, chance);
