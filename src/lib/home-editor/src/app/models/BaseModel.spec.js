(function (_) {
describe('Model: Base', function () {
  var BaseModel, bm;

  beforeEach(module('HomeEditor.Models'));
  beforeEach(inject(function ($injector) {
    BaseModel = $injector.get('BaseModel');
    bm = new BaseModel();
  }));

  describe('constructor', function () {
    it('creates an internal property', function () {
      expect(typeof bm.internal).toEqual('object');
    });
    it('sets the internal property to the object given to it', function () {
      var myInternal = {
        hello: 1,
        world: 2
      };
      bm = new BaseModel(myInternal);
      expect(bm.internal).toEqual(myInternal);
    });
  });
  describe('get', function () {
    it('returns a value from the internal object', function () {
      expect(bm.get('hello')).toBeUndefined();
      bm.internal.hello = 'hello';
      expect(bm.get('hello')).toEqual('hello');
    });
  });
  describe('set', function () {
    it('modifies the value at the given property with the new value', function () {
      expect(bm.internal.hello).toBeUndefined();
      bm.set('hello', 'hello');
      expect(bm.internal.hello).toEqual('hello');
      bm.set('hello', 5);
      expect(bm.internal.hello).toEqual(5);
    });
    it('assigns properties from the object if given an object as a first arg', function () {
      var newObj = {
        'hello': 5
      };
      expect(bm.internal.hello).not.toEqual(newObj.hello);
      bm.set(newObj);
      expect(bm.internal.hello).toEqual(newObj.hello);
    });
    it('overwrites properties with new values from the given object', function () {
      var newObj = {
        'hello': 5
      };
      bm.set('hello','hello');
      expect(bm.internal.hello).not.toEqual(newObj.hello);
      bm.set(newObj);
      expect(bm.internal.hello).toEqual(newObj.hello);
    });
    it('throws an error if given something that is neither a string nor an object', function () {
      expect(function () {
        bm.set(5,5);
      }).toThrow();
    });
  });
});
})();
