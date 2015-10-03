(function (angular, _) {
'use strict';

function HomdnaMetaDataDefinition (PropertyDefiner, HomdnaWorkflowModel) {

/** @todo Implement default homdna meta data payload */
var DEFAULT_HOMDNA_META_DATA_PAYLOAD = {};

/**
 * Creates a new HomdnaMetaData with the given payload.
 * 
 * @class HomdnaMetaData
 * @classdesc
 * This is a wrapper object for the HomdnaMetaData payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the HomdnaMetaData payload. 
 * 
 * @param {Object} homdnaWorkflowPayload - Payload object from server
 */
function HomdnaMetaData(homdnaMetaDataPayload) {
    if (!homdnaMetaDataPayload) {
        throw new Error('Need to provide a file payload object to HomdnaMetaData constructor');
    }
    this.payload = homdnaMetaDataPayload;
}
var proto = HomdnaMetaData.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The ID of the Homdna to which this HomdnaMetaData object refers.
 *
 * @name HomdnaMetaData#id
 * @type {String}
 */
proxyProperty('id');

/**
 * The ID of the Home to which this HomdnaMetaData object refers.
 *
 * @name HomdnaMetaData#homeId
 * @type {String}
 */
proxyProperty('homeId');

/**
 * The latest version of the Homdna
 *
 * @name HomdnaMetaData#currentVersion
 * @type {Number}
 */
proxyProperty('currentVersion');

/**
 * Whether or not the current version was created by Ops.
 *
 * @name HomdnaMetaData#officialVersion
 * @type {Boolean}
 */
proxyProperty('officialVersion');

/**
 * Whether or not this Homdna is a demo home.
 *
 * @name HomdnaMetaData#isDemo
 * @type {String}
 */
proxyProperty('isDemo');

/**
 * The Homdna's package ID.
 *
 * @name HomdnaMetaData#id
 * @type {String}
 */
proxyProperty('homdnaPackageId');

/**
 * The Homdna's HomdnaWorkflow object.
 * 
 * @name HomdnaMetaData#workflow
 * @type {HomdnaWorkflow}
 */
propDef.readOnlyProperty('workflow', function () {
    return new HomdnaWorkflowModel(this.payload.workflow);
});

return HomdnaMetaData;

}

angular.module('HomeEditor.Models')
    .factory('HomdnaMetaDataModel', HomdnaMetaDataDefinition);

})(angular, _);