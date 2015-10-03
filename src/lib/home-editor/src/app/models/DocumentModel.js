(function (angular, _, chance) {
'use strict';

function DocumentModelDefinition (BaseModel, FileModel) {

function DocumentModel (params) {
  BaseModel.call(this, params);

  // initialize own properties
  initProps.call(this);
}

// Extending the BaseModel Class
DocumentModel.prototype = Object.create(BaseModel.prototype);
DocumentModel.prototype.constructor = DocumentModel;
var proto = DocumentModel.prototype;

function initProps () {
  /**
   * The DocumentModel's uuid
   *
   * @name DocumentModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The UUID of the homdna to which this DocumentModel is associated.
   *
   * @name DocumentModel#homdnaId
   * @type {String|null}
   */
  this.set('homdnaId', this.get('homdnaId') || null);

  /**
   * The DocumentModel's documentType
   *
   * @name DocumentModel#documentType
   * @type {String}
   */
  this.set('documentType', this.get('documentType') || '');

  /**
   * The DocumentModel's document name
   *
   * @name DocumentModel#documentName
   * @type {String}
   */
  this.set('documentName', this.get('documentName') || '');

  /**
   * The DocumentModel's description
   *
   * @name DocumentModel#description
   * @type {String}
   */
  this.set('description', this.get('description') || '');

  /**
   * The DocumentModel's company
   *
   * @name DocumentModel#company
   * @type {String}
   */
  this.set('company', this.get('company') || '');

  /**
   * The DocumentModel's associated dollar amount. This is
   * used for documents that are receipts.
   *
   * @name DocumentModel#amount
   * @type {Number}
   */
  this.set('amount', this.get('amount') || 0);

  /**
   * The DocumentModel's capitalExpediture.
   *
   * @name DocumentModel#capitalExpediture
   * @type {Boolean}
   */
  this.set('capitalExpediture', this.get('capitalExpediture') || false);

  /**
   * The DocumentModel's fileIds. An array containing the uuids of files
   * associated with this document.
   *
   * @name DocumentModel#fileIds
   * @type {Array<String>}
   */
  this.set('fileIds', this.get('fileIds') || []);

  /**
   * An array of file model objects associated with the DocumentModel
   *
   * @name DocumentModel#files
   */
  this.files = [];
}

/**
 * Adds a new file to the document
 *
 * @method DocumentModel#addFile
 * @param {Object} fileParams FileModel object that will be added
 */
proto.addFile = function (fileParams) {
  var newFile = new FileModel(fileParams);
  this.files.push(newFile);
  this.get('fileIds').push(newFile.get('id'));
  return newFile;
};

/**
 * Removes the file with the given instance ID from the document
 *
 * @method DocumentModel#removeFile
 * @param {String} fileId Instance ID of the file to remove
 */
proto.removeFile = function (targetFileId) {
  _.remove(this.get('fileIds'), function (fileId) {
    return fileId === targetFileId;
  });
  _.remove(this.files, function (fileModel) {
    return fileModel.get('id') === targetFileId;
  });
};

return DocumentModel;

}

angular.module('HomeEditor.Models')
  .factory('DocumentModel', DocumentModelDefinition);

})(angular, _, chance);
