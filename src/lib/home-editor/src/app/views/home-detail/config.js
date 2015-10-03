(function (angular) {
'use strict';

function configuration ($stateProvider) {
    $stateProvider.state('root.home.detail', {
        url: '/home/:id',
        controller: 'HomeDetailController as HomeDetailCtrl',
        templateUrl: 'app/views/home-detail/template.html',
    });
}

angular.module('Home.Views.HomeDetail').
    config(configuration);

})(angular);