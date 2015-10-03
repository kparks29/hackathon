(function (angular) {
'use strict';
function CamelCaseInterceptor ($q) {

    // recursively convert object keys with passed in function (e.g. to convert from snake_case to camelCase and back)
    function transformKeysDeep (data, keyTransformFunc) {

        function transformKeys (obj, v, k) {
            obj[keyTransformFunc(k)] = _.isObject(v) ? transformKeysDeep(v, keyTransformFunc) : v;
        }

        function transform (data) {
            return !_.isString(data) && !_.isNumber(data) ? _.transform(data, transformKeys) : data;
        }

        return _.isArray(data) ? _.map(data, transform) : transform(data);
    }

    function parseKey (func, key) {
        // ignore $$ properties, which are defined by Angular or used internally and are removed by angular.toJson
        if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
            return key;
        } else {
            return func(key);
        }
    }

    function onResponse (response) {
        return response && response.data ? _.extend(response, { data: transformKeysDeep(response.data, _.camelCase) }) : response;
    }

    function onRequest (config) {
        if (!config.data) {
            return config;
        }
        config.data = config.data ? transformKeysDeep(config.data, _.wrap(_.snakeCase, parseKey)) : config.data;
        return config;
    }

    return {
        'response': onResponse,
        'request': onRequest
    };
}

angular.module('HomeEditor.Interceptors')
    .factory('CamelCaseInterceptor', CamelCaseInterceptor);

})(angular);