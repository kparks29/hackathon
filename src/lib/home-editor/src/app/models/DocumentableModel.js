/*
- TODO
  - How do I ensure that there is a documents property on the internal object? How to run initialization code on upon mixin?
  - Make an actual Document object and have DocumentableModel accept it?
*/
(function (angular, _) {
'use strict';
function DocumentableModelDefinition (BaseModel, DocumentModel) {

var DocumentableModel = {
  /**
   * Initializes the documents property on the internal object of the base model.
   */
  initializeDocuments : function () {
    if (!(this instanceof BaseModel)) {
      throw new Error('DocumentableModel can only be applied to a BaseModel object');
    }
    this.set('documents', this.get('documents') || []);
    this.documents = [];
  },

  addDocument : function (documentParams) {
    var newDocument = new DocumentModel(documentParams);
    this.get('documents').push(newDocument.internal.id);
    this.documents.push(newDocument);
    return newDocument;
  },

  removeDocument : function (targetDocumentId) {
    _.remove(this.get('documents'), function (documentId) {
      return documentId === targetDocumentId;
    });
    _.remove(this.documents, function (documentModel) {
      return documentModel.get('id') === targetDocumentId;
    });
  }
};

return DocumentableModel;
}

angular.module('HomeEditor.Models')
    .factory('DocumentableModel', DocumentableModelDefinition);

})(angular, _);
