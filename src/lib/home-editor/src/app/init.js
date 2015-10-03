(function (angular) {
'use strict';

var dependencies = [
    'ngMaterial',
    'ui.router',
    'HomeEditor.Constants',
    'HomeEditor.Utils',
    'HomeEditor.Services',
    'HomeEditor.Models',
    'HomeEditor.Interceptors',
    'HomeEditor.Views'
];

angular.module('HomeEditor', dependencies);

})(angular);