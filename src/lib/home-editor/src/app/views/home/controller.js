(function (angular) {
'use strict';

function HomeController (rHomes) {
    this.homesList = rHomes;
}

angular.module('HomeEditor.Views.Home').
    controller('HomeController', HomeController);

})(angular);