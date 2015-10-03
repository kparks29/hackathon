/**
 * @fileoverview Defines the Structure Model
 */
(function (angular, _) {
'use strict';
function StructureModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel, RoomModel) {

/**
 * Creates a new StructureModel with the given payload.
 *
 * @class StructureModel
 * @classdesc
 * This is a wrapper object for the StructureModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the StructureModel payload.
 *
 * @param {Object} params - Payload object from server
 */
function StructureModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeStructureModelProperties();
}

// Extending the SpaceModel Class
StructureModel.prototype = Object.create(SpaceModel.prototype);
StructureModel.prototype.constructor = StructureModel;
var proto = StructureModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);


/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeStructureModelProperties = function () {
  /**
   * The structure's name
   *
   * @name StructureModel#name
   * @type {String}
   */
  this.set('name', this.get('name') || '');

  /**
   * The structure's structureType
   *
   * @name StructureModel#structureType
   * @type {String}
   */
  this.set('structureType', this.get('structureType') || '');

  /**
   * The structure's size in square feet
   *
   * @name StructureModel#size
   * @type {Number}
   */
  this.set('size', this.get('size') || 0);

  /**
   * The structure's levels
   *
   * @name StructureModel#levels
   * @type {Number}
   */
  this.set('levels', this.get('levels') || 1);

  /**
   * An array of Room objects associated with the structure
   *
   * @name StructureModel#rooms
   * @type {Array<Room>}
   */
  this.set('rooms', this.get('rooms') || []);

  this.rooms = buildRoomModels(this.get('rooms'));
  var self = this;
  _.each(this.rooms, function (roomModel) {
      roomModel.location = self;
  });

  this.modelType = 'StructureModel';
}

function buildRoomModels (internalArray) {
  return _.map(internalArray, function (room) {
    return new RoomModel(room);
  });
}

function buildRoomInternals (roomModels) {
  return _.pluck(roomModels, 'internal');
}

/**
 * Adds a new room to the structure
 *
 * @method StructureModel#addRoom
 * @param {Object} roomParams RoomModel object that will be added
 */
proto.addRoom = function (roomParams) {
    var newRoom = new RoomModel(roomParams);
    newRoom.location = this;
    this.rooms.push(newRoom);
    this.get('rooms').push(newRoom.internal);
    return newRoom;
};

/**
 * Removes the room with the given instance ID from the structure
 *
 * @method StructureModel#removeRoom
 * @param {String} roomId Instance ID of the room to remove
 */
proto.removeRoom = function (roomId) {
    _.remove(this.get('rooms'), function (room) {
        return room.id === roomId;
    });
    _.remove(this.rooms, function (roomModel) {
        roomModel.location = null;
        return roomModel.get('id') === roomId;
    });
};

/**
 * Ensures that the internal rooms, features, and appliances properties
 * match up with the models stored on the external features/appliances/rooms.
 */
proto.rebuildStructureModelInternal = function () {
    this.rebuildSpaceModelInternal();
    this.set('rooms', buildRoomInternals(this.rooms));
};

return StructureModel;
}

angular.module('HomeEditor.Models')
    .factory('StructureModel', StructureModelDefinition);

})(angular, _);
