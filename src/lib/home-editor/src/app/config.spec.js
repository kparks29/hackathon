(function () {
'use strict';

describe('Config: HomeEditor Config', function () {
    var httpProvider;

    beforeEach(module('HomeEditor', function ($httpProvider) {
        httpProvider = $httpProvider;
    }));

    it('should add CamelCaseInterceptor as an HTTP interceptor', inject(function () {
        expect(httpProvider.interceptors).toContain('CamelCaseInterceptor');
    }));

    it('should add AccessTokenInterceptor as an HTTP interceptor', inject(function () {
        expect(httpProvider.interceptors).toContain('AccessTokenInterceptor');
    }));
});

})();