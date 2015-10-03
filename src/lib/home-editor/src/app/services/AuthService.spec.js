(function () {
'use strict';

describe('Service: AuthService', function () {
    var AuthService,
        $httpBackend,
        API_URL;

    beforeEach(module('HomeEditor.Services'));

    beforeEach(inject(function ($injector) {
        AuthService  = $injector.get('AuthService');
        $httpBackend = $injector.get('$httpBackend');
        API_URL      = $injector.get('API_URL');
    }));

    describe('login', function () {
        var credentialsObject,
            responseObject,
            LOGIN_ENDPOINT_URL;
        beforeEach(function () {
            credentialsObject = {
                login : 'login123',
                password : 'password123'
            };
            responseObject = {
                accessToken : 'hello'
            };
            LOGIN_ENDPOINT_URL = API_URL.CORE + '/login';
        });
        it('returns a thenable object (promise)', function () {
            var output = AuthService.login(credentialsObject);
            expect(output.then).toBeDefined();
            expect(output.catch).toBeDefined();
        });
        it('makes a POST request to /login endpoint', function () {
            $httpBackend.expectPOST(LOGIN_ENDPOINT_URL).
                respond(responseObject);
            AuthService.login(credentialsObject);
            $httpBackend.flush();
        });
        it('resolves the promise with the server\'s response', function (done) {
            $httpBackend.expectPOST(LOGIN_ENDPOINT_URL).
                respond(responseObject);
            AuthService.login(credentialsObject).
                then(function (response) {
                    expect(response.accessToken).toEqual(responseObject.accessToken);
                }).
                catch(function (error) {
                    expect(error).toBeUndefined();
                }).finally(done);
            // Need to call flush to resolve the promise
            $httpBackend.flush();
        });
    });
});
})();