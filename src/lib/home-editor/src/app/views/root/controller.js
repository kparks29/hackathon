(function (angular) {
'use strict';

function RootController ($scope, HomeService) {
    HomeService.getHomes().then(function (homes) {
        $scope.homes = homes;
    });
}

angular.module('HomeEditor.Views.Root').
    controller('RootController', RootController);

})(angular);