(function () {
'use strict';

describe('Interceptor: AccessTokenInterceptor', function () {

    var AccessTokenInterceptor,
        UserSessionService,
        $http,
        $httpBackend,
        API_URL;

    beforeEach(module('HomeEditor.Interceptors', function ($httpProvider) {
        $httpProvider.interceptors.push('AccessTokenInterceptor');
    }));
    beforeEach(module('HomeEditor.Constants'));

    beforeEach(inject(function ($injector) {
        AccessTokenInterceptor = $injector.get('AccessTokenInterceptor');
        UserSessionService     = $injector.get('UserSessionService');
        $http                  = $injector.get('$http');
        $httpBackend           = $injector.get('$httpBackend');
        API_URL                = $injector.get('API_URL');
    }));

    describe('request', function () {
        it('attaches the access token if UserSessionService has one', function (done) {
            var mockAccessToken = '123';
            var homesUrl = API_URL.CORE + '/homes';
            $httpBackend.expect('GET', homesUrl, undefined, function (headers) {
                return headers['Access-Token'] === mockAccessToken;
            }).respond(200, []);

            UserSessionService.setAccessToken(mockAccessToken).
                then(function () {
                    return $http.get(homesUrl);
                }).finally(done);
            $httpBackend.flush();
        });

        it('does not attach the access token if the url is not trusted', function (done) {
            var mockAccessToken = '123';
            var untrustedUrl = 'http://www.nothomdna.com';
            $httpBackend.expect('GET', untrustedUrl, undefined, function (headers) {
                return !headers['Access-Token'];
            }).respond(200, []);

            UserSessionService.setAccessToken(mockAccessToken).
                then(function () {
                    return $http.get(untrustedUrl);
                }).finally(done);
            $httpBackend.flush();
        });
    });

});


})();