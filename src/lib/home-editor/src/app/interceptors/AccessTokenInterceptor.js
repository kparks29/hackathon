(function (angular) {
'use strict';
function AccessTokenInterceptor ($q, UserSessionService) {

    function onResponseError (response) {
        if (response.status === 401) {
            // TODO Perform Log out
        }
        $q.reject(response);
    }

    function isTrustedUrl (url) {
        return url.indexOf('.homdna.com') > -1 || url.indexOf('//localhost') > -1;
    }

    function onRequest (config) {
        if (isTrustedUrl(config.url)) {
            return UserSessionService.getAccessToken().
                then(function (accessToken) {
                    config.headers = config.headers || {};
                    config.headers['Access-Token'] = accessToken;
                    return config;
                });
        }
        return config;
    }

    return {
        'responseError': onResponseError,
        'request': onRequest
    };
}

angular.module('HomeEditor.Interceptors')
    .factory('AccessTokenInterceptor', AccessTokenInterceptor);

})(angular);