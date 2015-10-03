(function (_) {
'use strict';

var MOCK_PAYLOAD = {
  id: 'file1'
};

describe('Model: FileModel', function () {
  var FileModel;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    FileModel = $injector.get('FileModel');
  }));

  describe('constructor', function () {
    it('initializes the FileModel when given a payload', function () {
      var dm = new FileModel(MOCK_PAYLOAD);
      expect(dm.internal).toBe(MOCK_PAYLOAD);
    });
    it('initializes the FileModel when not given a payload', function () {
      var dm = new FileModel();
      expect(typeof(dm.internal)).toBe('object');
    });
  });

  describe('internal property:', function () {
    var dm;
    beforeEach(function () {
      dm = new FileModel();
    });

    describe('id', function () {
      it('is set to a uuid if none is defined on the payload', function () {
        expect(typeof(dm.get('id'))).toBe('string');
      });
    });
    describe('homdnaId', function () {
      it('defaults to null if not defined', function () {
        var mockPayload = {};
        dm = new FileModel(mockPayload);
        expect(dm.get('homdnaId')).toBeNull();
      });
    });

    describe('checksum', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('checksum')).toBe('');
      });
    })

    describe('url', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('url')).toBe('');
      });
    });

    describe('thumbnailUrl', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('thumbnailUrl')).toBe('');
      });
    });

    describe('largeThumbnailUrl', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('largeThumbnailUrl')).toBe('');
      });
    });

    describe('mimeType', function () {
      it('defaults to an empty string', function () {
        expect(dm.get('mimeType')).toBe('');
      });
    });
  });
})

})(_);
