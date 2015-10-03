(function (_) {
'use strict';

describe('Interceptor: CamelCaseInterceptor', function () {
    var CamelCaseInterceptor;

    beforeEach(module('HomeEditor.Interceptors'));

    beforeEach(inject(function (_CamelCaseInterceptor_) {
        CamelCaseInterceptor = _CamelCaseInterceptor_;
    }));    

    describe('response', function () {
        var jsonObject = {
                string_prop: 'this is a string',
                array_prop: [{ prop_1: 'string', my_other_prop: 'string' }],
                object_prop: {
                    nested_array_prop: [{ prop1: 'testing' }]
                },
                int_prop: 1
            },
            jsonArray = [{ my_prop: 'test' }],
            result;

        beforeEach(function () {
            result = CamelCaseInterceptor.response({ data: jsonObject });
        });

        // TODO Break this out into separate tests
        // TODO converts all first-level property names
        // TODO converts all property names of objects nested in array
        // TODO converts all property names of objects nested in object
        it('updates all properties and assigns correct values', function () {
            _.forIn(jsonObject, function (value, key) {
                expect(result.data[_.camelCase(key)]).toBeDefined();
            });
            expect(jsonObject.object_prop.nested_array_prop[0].prop1).toEqual(result.data.objectProp.nestedArrayProp[0].prop1);
            expect(jsonObject.array_prop[0].my_other_prop).toEqual(result.data.arrayProp[0].myOtherProp);
        });

        // TODO handles an Object response
        // TODO handles an Array response
        // TODO handles a String response
        it('handles types of JSON objects/arrays', function () {
            expect(angular.isObject(result.data)).toEqual(true);
            expect(angular.isArray(CamelCaseInterceptor.response({ data: jsonArray}).data)).toEqual(true);
            expect(angular.isString(CamelCaseInterceptor.response({ data: 'string' }).data)).toEqual(true);
        });
    });

    describe('request', function () {
        var jsonObject = {
                stringProp: 'this is a string',
                arrayProp: [{ prop1: 'string', myOtherProp: 'string' }],
                objectProp: {
                    nestedArrayProp: [{ prop1: 'testing' }]
                },
                intProp: 1
            },
            result;

        beforeEach(function () {
            result = CamelCaseInterceptor.request({ url: 'homdna.com', data: jsonObject });
        });
        afterEach(function () {
            result = undefined;
        });

        // TODO Break this out into separate tests similar to the tests in the response test suite
        it('updates all keys and assigns correct values', function () {
            _.forIn(jsonObject, function (value, key) {
                expect(result.data[_.snakeCase(key)]).toBeDefined();
            });
            expect(result.data.object_prop.nested_array_prop[0].prop_1).toEqual(jsonObject.objectProp.nestedArrayProp[0].prop1);
            expect(result.data.array_prop[0].my_other_prop).toEqual(jsonObject.arrayProp[0].myOtherProp);
        });
        it('handles types of JSON objects/arrays', function () {
            expect(angular.isObject(result.data)).toEqual(true);
            expect(angular.isArray(CamelCaseInterceptor.request({ url: 'homdna.com', data: [{ my_prop_1: 'testing' }] }).data)).toEqual(true);
            expect(angular.isString(CamelCaseInterceptor.request({ url: 'homdna.com', data: 'string' }).data)).toEqual(true);
        });
        it('does not remove $$ properties', function () {
            expect(CamelCaseInterceptor.request({ url: 'homdna.com', data: { $$angular: true }}).data.$$angular).toBeDefined();
        });
    });
});

})(_);