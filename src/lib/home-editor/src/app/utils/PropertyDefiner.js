/**
 * PropertyDefiner
 *
 * Provides utilities for defining properties for objects. Allows you to define
 * - properties with custom get/set handlers
 * - read only properties
 * - proxy properties
 * 
 * @module PropertyDefiner
 */
(function (angular) {
'use strict';

function PropertyDefinerDefinition () {

/**
 * Creates a PropertyDefiner object that provides property defining 
 * functions for the specified prototype object
 * @param {[type]} targetObject [description]
 * @constructor
 */
function PropertyDefiner (targetObject) {
    if (!(targetObject instanceof Object)) {
        throw new Error('Target prototype must be an object. Type received: ' + (typeof targetObject));
    }
    this._targetObject = targetObject;
}
var proto = PropertyDefiner.prototype;

/**
 * Defines a getter/setter for the targeted prototype
 * @param {string} propertyName The name of the new property
 * @param {function} getter       Function to run when accessing the property
 * @param {function} setter       Function to run when setting the property
 */
function property (propertyName, getter, setter) {
    var setGet = {};
    if (getter) {
        setGet.get = getter;
    }
    if (setter) {
        setGet.set = setter;
    }
    Object.defineProperty(this._targetObject, propertyName, setGet);
}
proto.property = property;

/**
 * Defines a getter for the targeted prototype. Throws an error if you try to write 
 * to this property.
 * @param  {string} propertyName The name of the new property
 * @param  {function} getter       Function to run when accessing the property
 */
function readOnlyProperty (propertyName, getter) {
    this.property(propertyName, getter, function () {
        throw new Error('Cannot modify read only property: ' + propertyName);
    });
}
proto.readOnlyProperty = readOnlyProperty;

/**
 * Defines a proxy property for the target object
 *
 * A 'proxy property' is a property whose get/set actions affect the
 * property of the object referenced by the 'payload' property
 *
 * For example, assume a proxy property called `lot` is defined on the 
 * Homdna object whose source property is the `lot` property on the payload object.
 * - Assigning a value to Homdna.lot will assign the value to Homdna.payload.lot.
 * - Reading a value from Homdna.lot will return the value from Homdna.payload.lot.
 *
 * A proxy property should still work if the source property name is not defined on
 * the source object. In this situation, the proxy property will return undefined upon
 * read and will define the source property on the source object upon assignment.
 *
 * A proxy property will always reference the object being referenced by the 'payload' property.
 * For example, assuming the following:
 *   - Homdna.payload is assigned to Object A, 
 *   - A proxy property 'homeId' is defined
 *     - Thus, Homdna.homeId points to A.homeId
 * If Homdna.payload is set to Object B, Homdna.homeId will now refer to B.homeId.
 *
 * If you're familiar with pointers, you can think of a proxy property as a pointer to a pointer.
 * 
 * @param  {string} propertyName       Name of the proxy property being defined
 * @param  {string} sourcePropertyName The property name that this proxy property will reference
 */
function proxyProperty (propertyName, sourcePropertyName) {
    if (!sourcePropertyName) {
        sourcePropertyName = propertyName;
    }
    this.property(propertyName, function get () {
        return this.payload[sourcePropertyName];
    }, function set (newValue) {
        this.payload[sourcePropertyName] = newValue;
    });
}
proto.proxyProperty = proxyProperty;

return PropertyDefiner;

}
angular.module('HomeEditor.Utils').
    factory('PropertyDefiner', PropertyDefinerDefinition);

})(angular);