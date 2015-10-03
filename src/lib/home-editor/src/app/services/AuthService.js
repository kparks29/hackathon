/**
 * AuthService
 *
 * Handles user authentication process. This is mainly used to retrieve a token from the server.
 * 
 * @module AuthService
 */
(function (angular) {
'use strict';

function AuthService ($http, $q, API_URL) {

    /**
     * Sends the 
     * @param  {Object} credentialsObject An object that contains two properties:
     *                                    - login : The public credential (username)
     *                                    - password : The private credential (password)
     * @return {Promise<Response>}        Promise that resolves with the response from
     *                                    the server.
     */
    function login (credentialsObject) {
        if (!credentialsObject.login || !credentialsObject.password) {
            var errMsg = 'credentialsObject must contain both "login" and "password" properties found: ';
            errMsg += credentialsObject;
            return $q.reject(new Error(errMsg));
        }

        return $http.post(API_URL.CORE + '/login', credentialsObject).
            then(function onSuccess (response) {
                return response.data;
            });
    }

    return {
        'login' : login
    };
}

angular.module('HomeEditor.Services')
    .service('AuthService', AuthService);

})(angular);