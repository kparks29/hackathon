/**
 * UserSessionService
 *
 * Stores all data related to the current user session.
 * For now, this is just a place to store the user's access token.
 * 
 * TODO Store token in persistent memory to reuse the same token between browser refreshes
 * 
 */
(function (angular) {
'use strict';

function UserSessionService ($q) {

    // TODO Read access token from persistent memory when UserSessionService is loaded
    //      and set this variable to the value retrieved from persistent memory.
    var accessToken = null;

    /**
     * Sets current the access token to the given token
     * @param {string} newAccessToken Access token to use
     * @return {Promise<String|null>} Returns a promise that resolves with the given access token
     */
    function setAccessToken (newAccessToken) {
        accessToken = newAccessToken;
        // TODO Write to persistent memory and resolve a promise when the write is complete
        return $q.when(accessToken);
    }

    /**
     * Returns a promise that resolves with the access token.
     * The promise resolves with null if the access token has not been set.
     * @return {Promise<String|null>} Promise that resolves with the access token or null
     *                                if it hasn't been set.
     */
    function getAccessToken () {
        // TODO Read from persistent memory and resolve a promise when the read is complete
        return $q.when(accessToken);
    }

    return {
        'setAccessToken' : setAccessToken,
        'getAccessToken' : getAccessToken
    };
}

angular.module('HomeEditor.Services').
    service('UserSessionService', UserSessionService);

})(angular);