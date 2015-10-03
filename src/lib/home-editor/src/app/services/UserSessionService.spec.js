(function () {
'use strict';

describe('Service: UserSessionService', function () {

    var UserSessionService,
        $rootScope;

    beforeEach(module('HomeEditor.Services'));

    beforeEach(inject(function ($injector) {
        UserSessionService = $injector.get('UserSessionService');
        $rootScope = $injector.get('$rootScope');
    }));

    describe('setAccessToken', function () {    
        it('returns a promise that resolves with the access token', function (done) {
            var mockAccessToken = '123';
            UserSessionService.setAccessToken(mockAccessToken).
                then(function (accessToken) {
                    expect(accessToken).toEqual(mockAccessToken);
                }).catch(function (error) {
                    expect(error).toBeUndefined();
                }).finally(done);
            // Need to trigger digest loop so that promises get resolved
            $rootScope.$apply();
        });
    });

    describe('getAccessToken', function () {
        it('returns a promise with null if no access token has been set', function (done) {
            UserSessionService.getAccessToken().
                then(function (accessToken) {
                    expect(accessToken).toBeNull();
                }).catch(function (error) {
                    expect(error).toBeUndefined();
                }).finally(done);
            $rootScope.$apply();
        });
        it('returns a promise with that resolves with the correct access token', function (done) {
            var mockAccessToken = '123';
            UserSessionService.setAccessToken(mockAccessToken).
                then(function (accessToken) {
                    return UserSessionService.getAccessToken();
                }).
                then(function (accessToken) {
                    expect(accessToken).toEqual(mockAccessToken);
                }).catch(function (error) {
                    expect(error).toBeUndefined();
                }).finally(done);
            $rootScope.$apply();
        });
    });

});


})();