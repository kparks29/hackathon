/**
 * @fileoverview Defines the Address Model
 */
(function (angular, _, chance) {
'use strict';
function AddressDefinition (PropertyDefiner) {

/**
 * Creates a new Address with the given payload.
 *
 * @class Address
 * @classdesc
 * This is a wrapper object for the Address payload received from the server.
 * This wrapper object provides basic read/write access to the Address payload.
 * 
 * @param {Object} addressPayload - Payload object from server
 */
function Address(addressPayload) {
    this.payload = addressPayload || getNewAddressPayload();
}
var proto = Address.prototype;


var propDef          = new PropertyDefiner(proto);
var proxyProperty    = _.bind(propDef.proxyProperty, propDef);


/**
 * The address's postal code
 *
 * @name Address#postalCode
 * @type {String}
 */
proxyProperty('postalCode');

/**
 * The address's state
 *
 * @name Address#state
 * @type {String}
 */
proxyProperty('state');

/**
 * The address's street
 *
 * @name Address#street
 * @type {String}
 */
proxyProperty('street');

/**
 * The address's city
 *
 * @name Address#city
 * @type {String}
 */
proxyProperty('city');

/**
 * The address's unit
 *
 * @name Address#unit
 * @type {String}
 */
proxyProperty('unit');


var DEFAULT_ADDRESS_PAYLOAD = {
    'postalCode': '',
    'state':      '',
    'city':       '',
    'street':     '',
    'unit':       ''
};

function getNewAddressPayload() {
    var newPayload = _.cloneDeep(DEFAULT_ADDRESS_PAYLOAD);
    return newPayload;
}

return Address;
}

angular.module('HomeEditor.Models')
    .factory('AddressModel', AddressDefinition);

})(angular, _, chance);