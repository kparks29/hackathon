/**
 * Bootstrapping the HomdnaEditor.Services module
 * 
 */
(function (angular) {
'use strict';

var dependencies = [
    'HomeEditor.Constants',
    'HomeEditor.Models'
];

angular.module('HomeEditor.Services', dependencies);

})(angular);