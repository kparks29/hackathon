(function (_) {
'use strict';

var MOCK_PAYLOAD = {
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
};

describe('Model: HomdnaMetaData', function () {
    var HomdnaMetaData, HomdnaWorkflow, mockPayload;
    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        HomdnaMetaData = $injector.get('HomdnaMetaDataModel');
        HomdnaWorkflow = $injector.get('HomdnaWorkflowModel');
        mockPayload = _.cloneDeep(MOCK_PAYLOAD);
    }));

    describe('constructor', function () {
        it('throws an error if no payload is given', function () {
            expect(function () {
                new HomdnaMetaData();
            }).toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new HomdnaMetaData({});
            }).not.toThrow();
        });
    });

    describe('properties', function () {
        var h, mockPayload;
        beforeEach(function () {
            mockPayload = _.cloneDeep(MOCK_PAYLOAD);
            h = new HomdnaMetaData(mockPayload);
        });

        describe('payload', function () {
            it('points to the same object given in the constructor', function () {
                expect(h.payload).toEqual(mockPayload);
            });
        });

        describe('id', function () { 
            it('accesses the id property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.id = EXPECTED_VALUE;
                expect(h.id).toEqual(h.payload.id);
                expect(h.id).toEqual(EXPECTED_VALUE);
            });
            it('modifies the id property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.id = EXPECTED_VALUE;
                expect(h.payload.id).toEqual(h.id);
                expect(h.payload.id).toEqual(EXPECTED_VALUE);
            });
        });

        describe('homeId', function () { 
            it('accesses the homeId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.homeId = EXPECTED_VALUE;
                expect(h.homeId).toEqual(h.payload.homeId);
                expect(h.homeId).toEqual(EXPECTED_VALUE);
            });
            it('modifies the homeId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.homeId = EXPECTED_VALUE;
                expect(h.payload.homeId).toEqual(h.homeId);
                expect(h.payload.homeId).toEqual(EXPECTED_VALUE);
            });
        });

        describe('workflow', function () {
            it('returns a HomdnaWorkflow object', function () {
                expect(h.workflow instanceof HomdnaWorkflow).toEqual(true);
            });
            it('points to the same workflow object given in the HomdnaMetaData constructor', function () {
                expect(h.workflow.payload).toEqual(h.payload.workflow);
            });
        });
    });

});


})(_);