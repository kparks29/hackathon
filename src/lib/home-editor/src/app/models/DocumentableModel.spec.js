(function (_) {
describe('Model: DocumentableModel', function () {
  var BaseModel, DocumentableModel, DocumentModel, dm;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    BaseModel = $injector.get('BaseModel');
    DocumentableModel = $injector.get('DocumentableModel');
    DocumentModel = $injector.get('DocumentModel');
    dm = new BaseModel();
    _.extend(dm, DocumentableModel);
  }));

  describe('initializeDocuments', function () {
    it('sets the documents property to an empty array', function () {
      expect(dm.get('documents')).toBeUndefined();
      dm.initializeDocuments();
      expect(dm.get('documents') instanceof Array).toEqual(true);
      expect(dm.get('documents').length).toEqual(0);
    });
    it('throws an error if applied to an object that does not inherit from BaseModel', function () {
      var notBaseModel = {};
      _.extend(notBaseModel, DocumentableModel);
      expect(function () {
        notBaseModel.initializeDocuments();
      }).toThrow();
    });
  });

  describe('external property:', function () {
    beforeEach(function () {
      dm.initializeDocuments();
    });
    describe('documents', function () {
      it('defaults to an empty array', function () {
        expect(dm.documents instanceof Array).toBe(true);
        expect(dm.documents.length).toBe(0);
      });
    });
  });

  describe('method:', function () {
    beforeEach(function () {
      dm.initializeDocuments();
    });

    describe('addDocument', function () {
      it('adds an document to both internal and external documents properties', function () {
        var docModel = new DocumentModel();
        expect(dm.get('documents').length).toBe(0);
        expect(dm.documents.length).toBe(0);

        dm.addDocument(docModel.internal);

        expect(dm.get('documents').length).toBe(1);
        expect(dm.documents.length).toBe(1);
        expect(dm.documents[0] instanceof DocumentModel).toBe(true);
        expect(typeof(dm.get('documents')[0])).toBe('string');
      });
      it('returns the new DocumentModel object added', function () {
      	var docModel = new DocumentModel();
      	var result = dm.addDocument(docModel.internal);
      	expect(result.internal).toBe(docModel.internal);
      });
    });

    describe('removeDocument', function () {
      it('removes an document from both internal and external documents properties', function () {
        var docPayload = {
          id: '123'
        };
        dm.addDocument(docPayload);
        expect(dm.get('documents').length).toBe(1);
        expect(dm.documents.length).toBe(1);

        dm.removeDocument(docPayload.id);

        expect(dm.get('documents').length).toBe(0);
        expect(dm.documents.length).toBe(0);
      });
    });
  });
});
})(_);
