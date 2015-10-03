(function (angular, _) {
'use strict';
function HomeDefinition (PropertyDefiner, HomdnaMetaDataModel) {

var DEFAULT_HOME_PAYLOAD = {};

/**
 * Creates a new Home with the given payload.
 * 
 * @class Home
 * @classdesc
 * This is a wrapper object for the Home payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the Home payload. 
 * 
 * @param {Object} homePayload - Payload object from server
 */
function Home(homePayload) {
    /** @todo Create a new default payload if no payload is given */
    if (!homePayload) {
        throw new Error('Need to provide a home payload object to Home constructor');
    }
    this.payload = homePayload;
    /** @todo convert activeHomdna into HomdnaMetaData object */
}
var proto = Home.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The Home's name
 *
 * @name Home#name
 * @type {String}
 */
proxyProperty('name');

/**
 * UUID of the MLS for this Home
 *
 * @name Home#mlsId
 * @type {String}
 */
proxyProperty('mlsId');

/**
 * The Home's street address
 *
 * @name Home#streetAddress
 * @type {String}
 */
proxyProperty('streetAddress');

/**
 * The Home's unit address
 *
 * @name Home#unitAddress
 * @type {String}
 */
proxyProperty('unitAddress');

/**
 * The Home's city
 *
 * @name Home#city
 * @type {String}
 */
proxyProperty('city');

/**
 * The Home's state
 *
 * @name Home#state
 * @type {String}
 */
proxyProperty('state');

/**
 * The Home's postal code
 *
 * @name Home#postalCode
 * @type {String}
 */
proxyProperty('postalCode');

/**
 * The Home's country
 *
 * @name Home#country
 * @type {String}
 */
proxyProperty('country');

/**
 * The Home's latitude
 *
 * @name Home#latitude
 * @type {Number}
 */
proxyProperty('latitude');

/**
 * The Home's longitude
 *
 * @name Home#longitude
 * @type {Number}
 */
proxyProperty('longitude');

/**
 * The Home's primary photo URL
 *
 * @name Home#primaryPhotoUrl
 * @type {String}
 */
proxyProperty('primaryPhotoUrl');

/**
 * The Home's primary thumbnail URL.
 *
 * @name Home#primaryThumbnailUrl
 * @type {String}
 */
proxyProperty('primaryThumbnailUrl');

/**
 * The Home's primary large thumbnail URL.
 *
 * @name Home#primaryLargeThumbnailUrl
 * @type {String}
 */
proxyProperty('primaryLargeThumbnailUrl');

/**
 * The Home's map photo URL.
 *
 * @name Home#mapPhotoUrl
 * @type {String}
 */
proxyProperty('mapPhotoUrl');

/**
 * The Home's street photo URL.
 *
 * @name Home#streetPhotoUrl
 * @type {String}
 */
proxyProperty('streetPhotoUrl');

/**
 * The Home's active homdna.
 *
 * @name Home#activeHomdna
 * @type {HomdnaMetaData}
 */
propDef.readOnlyProperty('activeHomdna', function () {
    return new HomdnaMetaDataModel(this.payload.activeHomdna);
});

return Home;

}

angular.module('HomeEditor.Models')
    .factory('HomeModel', HomeDefinition);

})(angular, _);