(function (angular, _) {
'use strict';

function HomdnaWorkflowDefinition (PropertyDefiner) {

/** @todo Implement default homdna workflow payload */
var DEFAULT_HOMDNA_WORKFLOW_PAYLOAD = {

};

/**
 * Creates a new HomdnaWorkflow with the given payload.
 * 
 * @class HomdnaWorkflow
 * @classdesc
 * This is a wrapper object for the HomdnaWorkflow payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the HomdnaWorkflow payload. 
 * 
 * @param {Object} homdnaWorkflowPayload - Payload object from server
 */
function HomdnaWorkflow(homdnaWorkflowPayload) {
    if (!homdnaWorkflowPayload) {
        throw new Error('Need to provide a payload object to HomdnaWorkflow constructor');
    }
    this.payload = homdnaWorkflowPayload;
}
var proto = HomdnaWorkflow.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The HomdnaWorkflow's completion percentage.
 *
 * @name HomdnaWorkflow#completionPercentage
 * @type {Number}
 */
proxyProperty('completionPercentage');

/**
 * The HomdnaWorkflow's state.
 *
 * @name HomdnaWorkflow#stateId
 * @type {String}
 */
proxyProperty('stateId');

/**
 * The UUID of the inspector for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#inspectorId
 * @type {String}
 */
proxyProperty('inspectorId');

/**
 * The UUID of the realtor for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#realtorId
 * @type {String}
 */
proxyProperty('realtorId');

/**
 * The UUID of the primary homeowner for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#primaryHomeOwnerId
 * @type {String}
 */
proxyProperty('primaryHomeOwnerId');

/**
 * The UUID of the secondary homeowner for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#secondaryHomeOwnerId
 * @type {(String|null)}
 */
proxyProperty('secondaryHomeOwnerId');

/**
 * The HomdnaWorkflow's realtor message for the homeowner.
 *
 * @name HomdnaWorkflow#realtorMessage
 * @type {(String|null)}
 */
proxyProperty('realtorMessage');

/**
 * The HomdnaWorkflow's scheduled date.
 *
 * @name HomdnaWorkflow#scheduleDate
 * @type {String}
 */
proxyProperty('scheduleDate');

/**
 * The HomdnaWorkflow's slot index.
 *
 * @name HomdnaWorkflow#slotIndex
 * @type {String}
 */
proxyProperty('slotIndex');

/**
 * The HomdnaWorkflow's submitted on date in UTC Format.
 *
 * @name HomdnaWorkflow#submittedOn
 * @type {String}
 */
proxyProperty('submittedOn');

/**
 * The HomdnaWorkflow's review started on date in UTC Format.
 *
 * @name HomdnaWorkflow#reviewStartedOn
 * @type {String}
 */
proxyProperty('reviewStartedOn');

/**
 * The HomdnaWorkflow's published on date in UTC format.
 *
 * @name HomdnaWorkflow#publishedOn
 * @type {String}
 */
proxyProperty('publishedOn');

/**
 * The HomdnaWorkflow's schedule notes.
 *
 * @name HomdnaWorkflow#scheduleNotes
 * @type {String}
 */
proxyProperty('scheduleNotes');

/**
 * The HomdnaWorkflow's created on date in UTC format.
 *
 * @name HomdnaWorkflow#createdOn
 * @type {String}
 */
proxyProperty('createdOn');

/**
 * The HomdnaWorkflow's modified on date in UTC format.
 *
 * @name HomdnaWorkflow#modifiedOn
 * @type {String}
 */
proxyProperty('modifiedOn');

/**
 * The HomdnaWorkflow's activated on date in UTC format.
 *
 * @name HomdnaWorkflow#activatedOn
 * @type {String}
 */
proxyProperty('activatedOn');

/**
 * The HomdnaWorkflow's registration token.
 *
 * @name HomdnaWorkflow#registrationToken
 * @type {String}
 */
proxyProperty('registrationToken');

/**
 * The HomdnaWorkflow's realtor state ID.
 *
 * @name HomdnaWorkflow#realtorStateId
 * @type {String}
 */
proxyProperty('realtorStateId');

return HomdnaWorkflow;

}

angular.module('HomeEditor.Models')
    .factory('HomdnaWorkflowModel', HomdnaWorkflowDefinition);

})(angular, _);