(function (angular) {
'use strict';

function configuration ($stateProvider) {
    $stateProvider.state('root', {
        abstract: true,
        controller: 'RootController as RootCtrl',
        templateUrl: 'app/views/root/template.html',
        resolve: {
            rLogin: function (AuthService, UserSessionService) {
                return AuthService.login({
                    login: 'ops@homdna.com',
                    password: 'homdna123'
                }).then(function (loginPayload) {
                    return UserSessionService.setAccessToken(loginPayload.accessToken);
                });
            }
        }
    });
}

angular.module('HomeEditor.Views.Root').
    config(configuration);

})(angular);