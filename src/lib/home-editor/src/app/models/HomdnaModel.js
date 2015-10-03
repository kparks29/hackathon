(function (angular, _) {
'use strict';

function HomdnaModelDefinition (BaseModel, ImageableModel, DocumentableModel, AddressModel, LotModel, StructureModel) {

/**
 * Creates a new HomdnaModel object based on homdna payload from the server. If no payload
 * is supplied, then a new feature payload is generated.
 *
 * @class HomdnaModel
 * @classdesc
 * This is a wrapper object for the HomdnaModel payload received from the server. <br />
 * This wrapper object provides basic read/write access to the HomdnaModel payload
 * as well as some utility properties/methods that are useful for client-side
 * applications.
 *
 * @param {Object} params HomdnaModel payload object from server
 */
function HomdnaModel (params) {
    BaseModel.call(this, params);

    this.initializeHomdnaModelProperties();
    this.initializeDocuments();
    this.initializeImages();
}

// Extending the BaseModel Class
HomdnaModel.prototype = Object.create(BaseModel.prototype);
HomdnaModel.prototype.constructor = HomdnaModel;
var proto = HomdnaModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeHomdnaModelProperties = function () {
    /**
     * The HomdnaModel's Lot
     *
     * @name HomdnaModel#lot
     * @type {Lot}
     */
    var newLot = new LotModel(this.get('lot'));
    this.set('lot', newLot.internal);
    this.lot = newLot;

    /**
     * The HomdnaModel's structures
     *
     * @name HomdnaModel#structures
     * @type {Array<Structure>}
     */
    this.set('structures', this.get('structures') || []);
    this.structures = buildStructureModels(this.get('structures'));

    /**
     * The HomdnaModel's notes
     *
     * @name HomdnaModel#notes
     * @type {String}
     */
    this.set('notes', this.get('notes') || '');
};

function buildStructureModels (internalArray) {
    return _.map(internalArray, function (structure) {
        return new StructureModel(structure);
    });
}

function buildStructureInternals (structureModels) {
    return _.pluck(structureModels, 'internal');
}

/**
 * Removes the structure whose instance ID matches the given ID.
 *
 * @method HomdnaModel#removeStructure
 * @param  {String} structureId The ID of the structure to remove
 */
proto.removeStructure = function (structureId) {
    _.remove(this.get('structures'), function (structure) {
      return structure.id === structureId;
    });
    _.remove(this.structures, function (structureModel) {
      return structureModel.get('id') === structureId;
    });
};

/**
 * Adds a new structure object to the structures array.
 *
 * @method HomdnaModel#addStructure
 * @param  {String} name Structure's name
 * @param  {String} structureType Structure's type
 * @param  {Number} sizeSqft The structure's size in square feet
 * @return {StructureModel} The StructureModel object that was added
 */
proto.addStructure = function (structureParams) {
    var newStructure = new StructureModel(structureParams);
    this.structures.push(newStructure);
    this.get('structures').push(newStructure.internal);
    return newStructure;
};

/**
 * Sets the HomdnaModel's lot. This adds the lot to both external/internal lot properties.
 * @param {Object} lotParams Lot model properties
 * @return {LotModel} The LotModel object that was added
 */
proto.setLot = function (lotParams) {
    var newLot = new LotModel(lotParams);
    this.lot = newLot;
    this.set('lot', newLot.internal);
    return newLot;
};

proto.rebuildHomdnaModelInternal = function () {
    // Ensure that the structures internal data is up to date
    _.each(this.structures, function (structureModel) {
        structureModel.rebuildStructureModelInternal();
    });
    this.set('structures', buildStructureInternals(this.structures));
    this.set('lot', this.lot.internal);
    // TODO: Address Model too?
};

/**
 * Returns an array of all of this HomdnaModel's Room objects associated with their structures
 *
 * @name HomdnaModel#getAllRooms
 * @type {Array<Room>}
 */
proto.getAllRooms = function () {
    // Go through each structure and add all the rooms together
    return _(this.structures).
        pluck('rooms').
        flatten().
        value();
};

/**
 * Returns an array of all of this HomdnaModel's Lot, Structure, and Room objects
 *
 * @name HomdnaModel#getAllSpaces
 * @type {Array<SpaceModel>}
 */

proto.getAllSpaces = function () {
    return _.union([this.lot],
                    this.structures,
                    this.getAllRooms());
};

/**
 * Returns an array of all of this HomdnaModel's Features
 *
 * @name HomdnaModel#getAllFeatures
 * @type {Array<Feature>}
 */
proto.getAllFeatures = function () {
    return _(this.getAllSpaces()).
        pluck('features').
        flatten().
        compact().
        value();
};

/**
 * Returns an array of all of this HomdnaModel's Appliances
 *
 * @name HomdnaModel#getAllAppliances
 * @type {Array<Appliance>}
 */
proto.getAllAppliances = function () {
    return _(this.getAllSpaces()).
        pluck('appliances').
        flatten().
        compact().
        value();
};

proto.getAllDocumentables = function () {
    return _.union([this],
      this.getAllSpaces(),
      this.getAllFeatures(),
      this.getAllAppliances());
};

/**
 * Returns an array of all document IDs in the payload
 *
 * @name HomdnaModel#getAllDocuments
 * @type {Array<String>}
 */
proto.getAllDocuments = function () {
    return _(this.getAllDocumentables()).
        map(function (documentableModel) {
            return documentableModel.get('documents');
        }).
        flatten().
        compact().
        value();
};

proto.getAllSpacesAndElements = function () {
    return _.union(this.getAllSpaces(),
      this.getAllFeatures(),
      this.getAllAppliances());
};

/**
 * Returns the location of the given document ID
 *
 * @method HomdnaModel#getDocumentLocation
 * @param  {String} documentId The document ID to search
 * @return {DocumentableModel}    The DocumentableModel object that contains the document with the given document ID
 */
proto.getDocumentLocation = function (documentId) {
    return _.find(this.getAllDocumentables(), function (documentableModel) {
        return _.contains(documentableModel.get('documents'), documentId);
    });
};

return HomdnaModel;

}
angular.module('HomeEditor.Models')
    .factory('HomdnaModel', HomdnaModelDefinition);
})(angular, _);
