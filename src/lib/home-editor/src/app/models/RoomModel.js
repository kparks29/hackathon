(function (angular, _) {
'use strict';
function RoomModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Creates a new RoomModel object based on homdna payload from the server.
 *
 * @class RoomModel
 * @classdesc
 * This is a wrapper object for the RoomModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the RoomModel payload.
 *
 * @param {Object} roomPayload - Payload object from server
 */
function RoomModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeRoomModelProperties();
}

// Extending the SpaceModel Class
RoomModel.prototype = Object.create(SpaceModel.prototype);
RoomModel.prototype.constructor = RoomModel;
var proto = RoomModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeRoomModelProperties = function () {
    /**
     * The room's name.
     *
     * @name RoomModel#name
     * @type {String}
     */
    this.set('name', this.get('name') || '');

    /**
     * The room's room type.
     *
     * @name RoomModel#roomType
     * @type {String}
     */
    this.set('roomType', this.get('roomType') || '');

    /**
     * The floor level on which this room is located within its structure.
     *
     * @name RoomModel#level
     * @type {String}
     */
    this.set('level', this.get('level') || 1);

    /**
     * The room's size in square feet.
     *
     * @name RoomModel#size
     * @type {String}
     */
    this.set('size', this.get('size') || 0);

    this.modelType = 'RoomModel';
}

/**
 * The location that contains this RoomModel.
 * This property can only be set to a location that actually contains this RoomModel.
 *
 * @name RoomModel#location
 * @type {Structure}
 */
proto.location = null;

return RoomModel;
}

angular.module('HomeEditor.Models')
    .factory('RoomModel', RoomModelDefinition);

})(angular, _);
