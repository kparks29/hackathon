(function (angular) {
'use strict';

function ApiUrlConstant (RUNTIME_ENVIRONMENT) {
    // LOCAL ENVIRONMENT
    var API_URL = {
        CORE:         'http://localhost:9000',
        APPLIANCE:    'http://localhost:9001',
        NOTIFICATION: 'http://localhost:9002',
        WEB:          'http://localhost:8200'
    };

    if (RUNTIME_ENVIRONMENT === 'dev') {
        // DEV SERVER
        API_URL = {
            CORE:         getBaseUrl('dev'),
            APPLIANCE:    getBaseUrl('appliance-dev'),
            NOTIFICATION: getBaseUrl('notification-dev'),
            WEB:          getBaseUrl('dev')
        };
    } else if (RUNTIME_ENVIRONMENT === 'staging') {
        // STAGING SERVER
        API_URL = {
            CORE:         getBaseUrl('staging'),
            APPLIANCE:    getBaseUrl('appliance-staging'),
            NOTIFICATION: getBaseUrl('notification-staging'),
            WEB:          'http://www.homdna.xyz'
        };
    } else if (RUNTIME_ENVIRONMENT === 'production') {
        // PRODUCTION SERVER
        API_URL = {
            CORE:         getBaseUrl('api'),
            APPLIANCE:    getBaseUrl('appliance'),
            NOTIFICATION: getBaseUrl('notification'),
            WEB:          getBaseUrl('www')
        };
    }

    return API_URL;
}

function getBaseUrl (subdomain) {
    return 'https://' + subdomain + '.homdna.com';
}

angular.module('HomeEditor.Constants').
    factory('API_URL', ApiUrlConstant);

})(angular);