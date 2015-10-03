(function (_) {
'use strict';

var MOCK_PAYLOAD = {
    'completionPercentage': 10,
    'stateId':              'HOMDNA Active',
    'inspectorId':          null,
    'realtorId':            'c0099777-33c9-4d13-bcf0-a8c8989413e6',
    'primaryHomeOwnerId':   '99abbdb5-531d-4f75-84cd-aed6098873ec',
    'secondaryHomeOwnerId': null,
    'realtorMessage':       null,
    'scheduleDate':         null,
    'slotIndex':            null,
    'submittedOn':          '2015-05-04T15:50:00.205228Z',
    'reviewStartedOn':      null,
    'publishedOn':          '2015-05-04T15:50:00.205228Z',
    'scheduleNotes':        null,
    'createdOn':            '2015-05-04T15:50:00.205228Z',
    'modifiedOn':           '2015-05-06T01:39:56.356186Z',
    'activatedOn':          '2015-05-06T01:39:56.360708Z',
    'registrationToken':    null,
    'realtorStateId':       'Requested'
};

describe('Model: HomdnaWorkflow', function () {
    var HomdnaWorkflow, mockHomdnaWorkflowPayload;
    beforeEach(module('HomeEditor.Models'));
    beforeEach(inject(function ($injector) {
        HomdnaWorkflow = $injector.get('HomdnaWorkflowModel');
        mockHomdnaWorkflowPayload = _.cloneDeep(MOCK_PAYLOAD);
    }));

    describe('constructor', function () {
        it('throws an error if no payload is given', function () {
            expect(function () {
                new HomdnaWorkflow();
            }).toThrow();
        });

        it('does not throw an error if given a payload', function () {
            expect(function () {
                new HomdnaWorkflow({});
            }).not.toThrow();
        });
    });

    describe('properties', function () {
        var h, mockPayload;
        beforeEach(function () {
            mockPayload = {};
            h = new HomdnaWorkflow(mockPayload);
        });

        describe('payload', function () {
            it('points to the same object given in the constructor', function () {
                expect(h.payload).toEqual(mockPayload);
            });
        });

        describe('completionPercentage', function () { 
            it('accesses the completionPercentage property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.completionPercentage = EXPECTED_VALUE;
                expect(h.completionPercentage).toEqual(h.payload.completionPercentage);
                expect(h.completionPercentage).toEqual(EXPECTED_VALUE);
            });
            it('modifies the completionPercentage property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.completionPercentage = EXPECTED_VALUE;
                expect(h.payload.completionPercentage).toEqual(h.completionPercentage);
                expect(h.payload.completionPercentage).toEqual(EXPECTED_VALUE);
            });
        });

        describe('stateId', function () { 
            it('accesses the stateId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.payload.stateId = EXPECTED_VALUE;
                expect(h.stateId).toEqual(h.payload.stateId);
                expect(h.stateId).toEqual(EXPECTED_VALUE);
            });
            it('modifies the stateId property on the payload', function () {
                var EXPECTED_VALUE = {};
                h.stateId = EXPECTED_VALUE;
                expect(h.payload.stateId).toEqual(h.stateId);
                expect(h.payload.stateId).toEqual(EXPECTED_VALUE);
            });
        });
    });

});


})(_);