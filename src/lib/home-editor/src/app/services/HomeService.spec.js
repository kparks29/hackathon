(function () {
'use strict';

var MOCK_PAYLOAD = {
    "id": "26df8645-d369-490e-af18-a54a9382510b",
    "mlsId": "654bac4f-2b52-4922-beb8-637a32248d39",
    "streetAddress": "123 Demo Street",
    "unitAddress": null,
    "city": "Newport Beach",
    "state": "CA",
    "postalCode": "92660",
    "country": null,
    "latitude": null,
    "longitude": null,
    "primaryPhotoUrl": null,
    "primaryThumbnailUrl": null,
    "primaryLargeThumbnailUrl": null,
    "mapPhotoUrl": null,
    "streetPhotoUrl": null,
    "activeHomdna": {
        "id": "3fb13077-efc5-4b74-bcc6-4f2232d70628",
        "homeId": "26df8645-d369-490e-af18-a54a9382510b",
        "currentVersion": 4,
        "officialVersion": false,
        "isDemo": true,
        "homdnaPackageId": null,
        "workflow":     {
            "completionPercentage": 10,
            "stateId": "HOMDNA Active",
            "inspectorId": null,
            "realtorId": "c0099777-33c9-4d13-bcf0-a8c8989413e6",
            "primaryHomeOwnerId": "99abbdb5-531d-4f75-84cd-aed6098873ec",
            "secondaryHomeOwnerId": null,
            "realtorMessage": null,
            "scheduleDate": null,
            "slotIndex": null,
            "submittedOn": "2015-05-04T15:50:00.205228Z",
            "reviewStartedOn": null,
            "publishedOn": "2015-05-04T15:50:00.205228Z",
            "scheduleNotes": null,
            "createdOn": "2015-05-04T15:50:00.205228Z",
            "modifiedOn": "2015-05-06T01:39:56.356186Z",
            "activatedOn": "2015-05-06T01:39:56.360708Z",
            "registrationToken": null,
            "realtorStateId": "Requested"
        }
    }
};

describe('Service: HomeService', function () {
    var HomeService,
        $httpBackend,
        Home,
        URL_ENDPOINT_HOMES;

    beforeEach(module('HomeEditor.Services'));
    beforeEach(module('HomeEditor.Constants'));
    beforeEach(inject(function ($injector) {
        HomeService        = $injector.get('HomeService');
        $httpBackend       = $injector.get('$httpBackend');
        Home               = $injector.get('HomeModel');
        var API_URL        = $injector.get('API_URL');
        URL_ENDPOINT_HOMES = API_URL.CORE + '/homes';
    }));

    describe('getHomes', function () {
        it('returns a promise that resolves with Home objects', function (done) {
            var mockServerResponse = [MOCK_PAYLOAD, MOCK_PAYLOAD];
            $httpBackend.expectGET(URL_ENDPOINT_HOMES).respond(200, mockServerResponse);
            HomeService.getHomes().then(function (homes) {
                expect(homes.length).toBe(2);
                expect(homes[0] instanceof Home).toBe(true);
                expect(homes[1] instanceof Home).toBe(true);
            }).catch(function (error) {
                expect(error).toBeUndefined();
            }).finally(done);
            $httpBackend.flush();
        });
    });
});

})();