(function (angular) {
'use strict';

function configuration ($urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('CamelCaseInterceptor');
    $httpProvider.interceptors.push('AccessTokenInterceptor');
    $urlRouterProvider.otherwise('/');
}

angular.module('HomeEditor').
    config(configuration);

})(angular);