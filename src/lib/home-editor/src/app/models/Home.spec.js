(function (_) {
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

describe('Model: Home', function () {
    var Home, HomdnaMetaData;
    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        Home = $injector.get('HomeModel');
        HomdnaMetaData = $injector.get('HomdnaMetaDataModel');
    }));

    describe('constructor', function () {
        it('throws an error if no payload is given', function () {
            expect(function () {
                new Home();
            }).toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new Home({});
            }).not.toThrow();
        });
    });

    describe('properties', function () {
        var h, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            h = new Home(mockPayload);
        });

        describe('payload', function () {
            it('points to the same object given in the constructor', function () {
                expect(h.payload).toEqual(mockPayload);
            });
        });

        describe('name', function () { 
            it('accesses the name property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.name = EXPECTED_VALUE;
                expect(h.name).toEqual(h.payload.name);
                expect(h.name).toEqual(EXPECTED_VALUE);
            });
            it('modifies the name property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.name = EXPECTED_VALUE;
                expect(h.payload.name).toEqual(h.name);
                expect(h.payload.name).toEqual(EXPECTED_VALUE);
            });
        });

        describe('mlsId', function () { 
            it('accesses the mlsId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.mlsId = EXPECTED_VALUE;
                expect(h.mlsId).toEqual(h.payload.mlsId);
                expect(h.mlsId).toEqual(EXPECTED_VALUE);
            });
            it('modifies the mlsId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.mlsId = EXPECTED_VALUE;
                expect(h.payload.mlsId).toEqual(h.mlsId);
                expect(h.payload.mlsId).toEqual(EXPECTED_VALUE);
            });
        });

        describe('activeHomdna', function () {
            it('returns a HomdnaMetaData object', function () {
                expect(h.activeHomdna instanceof HomdnaMetaData).toEqual(true);
            });
            it('points to the same activeHomdna object given in the HomdnaMetaData constructor', function () {
                expect(h.activeHomdna.payload).toEqual(h.payload.activeHomdna);
            });
        });
    });
});
})(_);