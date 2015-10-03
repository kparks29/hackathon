(function (angular) {
'use strict';

function configuration ($stateProvider) {
    $stateProvider.state('root.home', {
        url: '/',
        controller: 'HomeController as HomeCtrl',
        templateUrl: 'app/views/home/template.html',
        resolve: {
            rHomes: function (HomeService, rLogin) {
                return HomeService.getHomes();
            }
        }
    });
}

angular.module('HomeEditor.Views.Home').
    config(configuration);

})(angular);