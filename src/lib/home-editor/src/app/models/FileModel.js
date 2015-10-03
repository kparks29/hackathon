(function (angular, _, chance) {
'use strict';

function FileModelDefinition (BaseModel) {

function FileModel (params) {
  BaseModel.call(this, params);

  // initialize own properties
  initProps.call(this);
}

// Extending the BaseModel Class
FileModel.prototype = Object.create(BaseModel.prototype);
FileModel.prototype.constructor = FileModel;
var proto = FileModel.prototype;

function initProps () {
  /**
   * The FileModel's uuid
   *
   * @name FileModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The UUID of the homdna to which this FileModel is associated.
   *
   * @name FileModel#homdnaId
   * @type {String|null}
   */
  this.set('homdnaId', this.get('homdnaId') || null);

  /**
   * The FileModel's checksum
   *
   * @name FileModel#checksum
   * @type {String}
   */
  this.set('checksum', this.get('checksum') || '');

  /**
   * The FileModel's url
   *
   * @name FileModel#url
   * @type {String}
   */
  this.set('url', this.get('url') || '');

  /**
   * The FileModel's thumbnailUrl
   *
   * @name FileModel#thumbnailUrl
   * @type {String}
   */
  this.set('thumbnailUrl', this.get('thumbnailUrl') || '');

  /**
   * The FileModel's largeThumbnailUrl
   *
   * @name FileModel#largeThumbnailUrl
   * @type {String}
   */
  this.set('largeThumbnailUrl', this.get('largeThumbnailUrl') || '');

  /**
   * The FileModel's MIME type.
   *
   * @name FileModel#mimeType
   * @type {String}
   */
  this.set('mimeType', this.get('mimeType') || '');
}

return FileModel;

}

angular.module('HomeEditor.Models')
  .factory('FileModel', FileModelDefinition);

})(angular, _, chance);
