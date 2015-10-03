(function (angular, _) {
'use strict';
function ImageableModelDefinition (BaseModel, FileModel) {

var ImageableModel = {
  /**
   * Initializes the images and primaryImage property on the internal object of the base model.
   */
  initializeImages: function () {
    if (!(this instanceof BaseModel)) {
      throw new Error('ImageableModel can only be applied to a BaseModel object');
    }
    this.set('images', this.get('images') || []);
    this.set('primaryImage', this.get('primaryImage') || null);
    this.images = [];
  },

  /**
   * Returns the primary image ID or null if it hasn't been set.
   * @return {String|null} The primary image ID or null
   */
  getPrimaryImage: function () {
    return this.get('primaryImage');
  },

  /**
   * Sets the primary image to the image ID given. This function throws an error
   * if the given image ID is not contained in the images array.
   * @param {String} imageId Image ID to set as the primary image
   */
  setPrimaryImage: function (imageId) {
    if (imageId !== null && !_.includes(this.get('images'), imageId)) {
      throw new Error('Primary image can only be set to image contained in the images array');
    }
    this.set('primaryImage', imageId);
  },

  addImage: function (fileParams) {
    var newFileModel = new FileModel(fileParams);
    this.get('images').push(newFileModel.get('id'));
    this.images.push(newFileModel);
    return newFileModel;
  },

  removeImage: function (targetFileId) {
    _.remove(this.get('images'), function (imageId) {
      return imageId === targetFileId;
    });
    _.remove(this.images, function (fileModel) {
      return fileModel.get('id') === targetFileId;
    });
  },

  /**
   * Returns a clone of the images array that contains FileModels
   * @return {Array<FileModels>} An array of FileModels
   */
  cloneImages: function () {
    // Extract an array of the file models internals
    // for each model internal. create a new FileModel from them and add them to an array?
    return _.map(this.images, function (fileModel) {
      // TODO We could implement a FileModel.clone function but
      // right now it would only consist of the line below. If the FileModel ever needs to
      // clone an external property, we would implement it then. But for now this will do.
      return new FileModel(_.cloneDeep(fileModel.internal));
    });
  }
};

return ImageableModel;

}

angular.module('HomeEditor.Models')
  .factory('ImageableModel', ImageableModelDefinition);

})(angular, _);
