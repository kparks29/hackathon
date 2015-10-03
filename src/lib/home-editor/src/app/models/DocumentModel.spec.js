(function (_) {
'use strict';

var MOCK_PAYLOAD = {
  id: 'd1'
};

describe('Model: DocumentModel', function () {
  var DocumentModel, FileModel;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    DocumentModel = $injector.get('DocumentModel');
    FileModel = $injector.get('FileModel');
  }));

  describe('constructor', function () {
    it('initializes the DocumentModel when given a payload', function () {
      var dm = new DocumentModel(MOCK_PAYLOAD);
      expect(dm.internal).toBe(MOCK_PAYLOAD);
    });
    it('initializes the DocumentModel when not given a payload', function () {
      var dm = new DocumentModel();
      expect(typeof(dm.internal)).toBe('object');
    });
  });

  describe('internal property:', function () {
    var dm;
    beforeEach(function () {
      dm = new DocumentModel();
    });

    describe('id', function () {
      it('is set to a uuid if none is defined on the payload', function () {
        expect(typeof(dm.get('id'))).toBe('string');
      });
    });
    describe('homdnaId', function () {
      it('defaults to null if not defined', function () {
        var mockPayload = {};
        dm = new DocumentModel(mockPayload);
        expect(dm.get('homdnaId')).toBeNull();
      });
    });

    describe('documentType', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('documentType')).toBe('');
      });
    })

    describe('documentName', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('documentName')).toBe('');
      });
    });

    describe('description', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('description')).toBe('');
      });
    });

    describe('company', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('company')).toBe('');
      });
    });

    describe('amount', function () {
      it('defaults to an 0', function () {
        expect(dm.get('amount')).toBe(0);
      });
    });

    describe('capitalExpediture', function () {
      it('defaults to false', function () {
        expect(dm.get('capitalExpediture')).toBe(false);
      });
    });

    describe('fileIds', function () {
      it('defaults to an empty array', function () {
        expect(dm.get('fileIds') instanceof Array).toBe(true);
        expect(dm.get('fileIds').length).toBe(0);
      });
    });
  });

  describe('external property:', function () {
    var dm;
    beforeEach(function () {
      dm = new DocumentModel();
    });

    describe('files', function () {
      it('defaults to an empty array', function () {
        expect(dm.files instanceof Array).toBe(true);
        expect(dm.files.length).toBe(0);
      });
    });
  });

  describe('method:', function () {
    var dm, newFilePayload;
    beforeEach(function () {
      dm = new DocumentModel();
      newFilePayload = {
        id: 'file1'
      };
    });
    describe('addFile()', function () {
      it('adds a file to both internal.fileIds and .files', function () {
        var fileIdsLengthBefore = dm.get('fileIds').length;
        var filesLengthBefore = dm.files.length;
        expect(dm.get('fileIds').length).not.toBe(fileIdsLengthBefore + 1);
        expect(dm.files.length).not.toBe(filesLengthBefore + 1);

        dm.addFile(newFilePayload);

        expect(dm.get('fileIds').length).toBe(fileIdsLengthBefore + 1);
        expect(dm.files.length).toBe(filesLengthBefore + 1);
        expect(typeof(dm.get('fileIds')[0])).toBe('string');
        expect(typeof(dm.files[0])).toBe('object');
      });
      it('returns the FileModel that was added', function () {
      	var result = dm.addFile(newFilePayload);
      	expect(result instanceof FileModel).toBe(true);
      	expect(result.internal).toBe(newFilePayload);
      });
    });

    describe('removeFile()', function () {
      it('removes a file from both internal.fileIds and .files', function () {
        dm.addFile(newFilePayload);
        var fileIdsLengthBefore = dm.get('fileIds').length;
        var filesLengthBefore = dm.files.length;
        expect(dm.get('fileIds').length).not.toBe(fileIdsLengthBefore - 1);
        expect(dm.files.length).not.toBe(filesLengthBefore - 1);

        dm.removeFile(newFilePayload.id);

        expect(dm.get('fileIds').length).toBe(fileIdsLengthBefore - 1);
        expect(dm.files.length).toBe(filesLengthBefore - 1);
      });
    });
  });
})

})(_);
