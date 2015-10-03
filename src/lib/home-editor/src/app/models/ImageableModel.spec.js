(function (_) {
describe('Model: ImageableModel', function () {
  var BaseModel, ImageableModel, FileModel, im;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    BaseModel = $injector.get('BaseModel');
    ImageableModel = $injector.get('ImageableModel');
    FileModel = $injector.get('FileModel');
    im = new BaseModel();
    _.extend(im, ImageableModel);
  }));

  describe('initializeImages', function () {
    it('sets the images property to an empty array', function () {
      expect(im.get('images')).toBeUndefined();

      im.initializeImages();

      expect(im.get('images') instanceof Array).toEqual(true);
      expect(im.get('images').length).toEqual(0);
    });
    it('sets the primaryImage property to null', function () {
      expect(im.get('primaryImage')).toBeUndefined();

      im.initializeImages();

      expect(im.get('primaryImage')).toBeNull();
    });
    it('throws an error if applied to an object that does not inherit from BaseModel', function () {
      var notBaseModel = {};
      _.extend(notBaseModel, ImageableModel);
      expect(function () {
        notBaseModel.initializeDocuments();
      }).toThrow();
    });
  });

  describe('external property:', function () {
    beforeEach(function () {
      im.initializeImages();
    });
    describe('images', function () {
      it('defaults to an empty array', function () {
        expect(im.images instanceof Array).toBe(true);
        expect(im.images.length).toBe(0);
      });
    });
  });

  describe('method', function () {
    beforeEach(function () {
      im.initializeImages();
    });

    describe('getPrimaryImage', function () {
      it('returns null if no primary image is set', function () {
        expect(im.getPrimaryImage()).toBeNull();
      });
      it('returns the primary image id after being set to one', function () {
        im.set('images', ['123','456']);
        im.set('primaryImage', '123');
        expect(im.getPrimaryImage()).toEqual('123');
      });
    });

    describe('setPrimaryImage', function () {
      it('sets the primary image when given an image from the images array', function () {
        im.set('images', ['123', '456']);
        expect(im.getPrimaryImage()).toBeNull();
        im.setPrimaryImage('123');
        expect(im.getPrimaryImage()).toEqual('123');
      });
      it('throws an error if the image ID given does not exist in images', function () {
        expect(function () {
          im.setPrimaryImage('123');
        }).toThrow();
      });
      it('accepts a null value', function () {
        im.set('images', ['123','456']);
        im.setPrimaryImage('123');
        expect(im.getPrimaryImage()).toEqual('123');
        im.setPrimaryImage(null);
        expect(im.getPrimaryImage()).toBeNull();
      });
    });

    describe('addImage', function () {
      it('adds an image to both internal and external images properties', function () {
        var fm = new FileModel();
        expect(im.get('images').length).toBe(0);
        expect(im.images.length).toBe(0);

        im.addImage(fm.internal);

        expect(im.get('images').length).toBe(1);
        expect(im.images.length).toBe(1);
        expect(im.images[0] instanceof FileModel).toBe(true);
      });
      it('returns the FileModel added', function () {
      	var fm = new FileModel();
      	var result = im.addImage(fm.internal);
      	expect(result.internal).toBe(fm.internal);
      });
    });

    describe('removeImage', function () {
      it('removes an image from both internal and external images properties', function () {
        var fmPayload = {
          id: '123'
        };
        im.addImage(fmPayload);
        expect(im.get('images').length).toBe(1);
        expect(im.images.length).toBe(1);

        im.removeImage(fmPayload.id);

        expect(im.get('images').length).toBe(0);
        expect(im.images.length).toBe(0);
      });
    });

    describe('cloneImages', function () {
      beforeEach(function () {
   	    im.images = [new FileModel(), new FileModel(), new FileModel()];
      });
	  // Check that the cloned file models are:
	  // - instances of FileModel
	  // - are not the same objects as those in the original images array
	  // - models whose .internal objects are not the same as the internals of the FileModels in the images array
	  // - have the same IDs as those in the original FileModel array
      it('returns an cloned array of the external images property', function () {
        var result = im.cloneImages();
        expect(result.length).toBe(im.images.length);
        _.each(result, function (clonedFileModel, index) {
          expect(clonedFileModel instanceof FileModel).toBe(true);
          expect(clonedFileModel).not.toBe(im.images[index]);
          expect(clonedFileModel.internal).not.toBe(im.images[index].internal);
          expect(clonedFileModel.get('id')).toBe(im.images[index].get('id'));
        });
      });
    });
  });
});
})(_);
