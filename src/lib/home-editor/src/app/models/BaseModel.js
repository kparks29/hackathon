/*
BaseModel
- internal object (the object that stores the true values)
- Internal object is needed to delineate which data that belongs to the model and which properties have been attached by users of the model
- get(string or path)
 - returns data based on string from payload
- set(string)
 - if string is a property, sets that property on the payload
- set(object)
 - adds those properties to the payload, if any of the properties already exist, then the value from the new object will overwrite the value on the payload

In the context of a Model Object being sent to the server, whatever is set on the internal object will be used
 */

(function (angular, _) {
'use strict';
function BaseModelDefinition () {

function BaseModel (obj) {
  this.internal = obj || {};
}

BaseModel.prototype.get = function (path) {
  return _.get(this.internal, path);
};

BaseModel.prototype.set = function (firstArg, value) {
  // If the first arg is a path, set that path to the given value
  // If the first arg is an object, merge the properties with the internal object.
  // The given object's properties should overwrite the internal object's properties.
  if (typeof(firstArg) === 'string') {
    if (_.isUndefined(value)) {
      throw new Error('BaseModel.set requires 2nd argument to be defined if the 1st argument is a string');
    }
    _.set(this.internal, firstArg, value);
  } else if (typeof(firstArg) === 'object') {
    _.assign(this.internal, firstArg);
  } else {
    throw new Error('BaseModel.set requires first argument to be either a string or object');
  }
}

return BaseModel;
}

angular.module('HomeEditor.Models')
    .factory('BaseModel', BaseModelDefinition);

})(angular, _);
