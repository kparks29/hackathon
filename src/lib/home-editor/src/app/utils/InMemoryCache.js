(function (angular) {
'use strict';

function InMemoryCache () {

    var IN_MEMORY_CACHE = {};

    function get (key) {
        return IN_MEMORY_CACHE[key];
    }
    function set (key, value) {
        if (arguments.length < 2) {
            throw new Error('InMemoryCache.set requires 2 arguments. Only received ' + arguments.length);
        }
        IN_MEMORY_CACHE[key] = value;
    }

    function clear () {
        IN_MEMORY_CACHE = {};
    }

    return {
        'get'   : get,
        'set'   : set,
        'clear' : clear
    };
}

angular.module('HomeEditor.Utils').
    service('InMemoryCache', InMemoryCache);

})(angular);