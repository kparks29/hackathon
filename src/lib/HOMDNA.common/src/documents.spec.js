'use strict';

describe('documents', function() {

	var $q,
		FindLocationOfDocument,
		PullDocsFromArray,
		FindIdOfApplianceOrFeature,
		RemoveFromJSON,
		ConvertJson,
		json;

	beforeEach(module('HOMDNA.common.documents'));

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');
		FindLocationOfDocument = $injector.get('FindLocationOfDocument');
		PullDocsFromArray = $injector.get('PullDocsFromArray');
		FindIdOfApplianceOrFeature = $injector.get('FindIdOfApplianceOrFeature');
		RemoveFromJSON = $injector.get('RemoveFromJSON');
		ConvertJson = $injector.get('ConvertJson');
		json = {
			lot: {
				appliances: [{
					documents: [1]
				}],
				features: [{
					documents: [2]
				}]
			},
			structures: [{
				appliances: [{
					documents: [3]
				}],
				features: [{
					documents: [4]
				}],
				rooms: [{
					appliances: [{
						documents: [5]
					}],
					features: [{
						documents: [6]
					}]
				}]
			}]
		};
	}));

	describe('FindLocationOfDocument', function () {

		it('returns the location of the document, indexes of the arrays, a array of the location, and the docId all in an object', function () {
			var test = FindLocationOfDocument(json, 1);
			expect(typeof test).toEqual('object');
			expect(test.location).toBeDefined();
			expect(test.indexes).toBeDefined();
			expect(test.array).toBeDefined();
			expect(test.docId).toEqual(1);

			expect(FindLocationOfDocument(json, 2).location).toEqual('lot.feature');
			expect(FindLocationOfDocument(json, 2).array).toEqual(json.lot.features);

			expect(FindLocationOfDocument(json, 3).location).toEqual('structure.appliance');
			expect(FindLocationOfDocument(json, 3).array).toEqual(json.structures[0].appliances);

			expect(FindLocationOfDocument(json, 4).location).toEqual('structure.feature');
			expect(FindLocationOfDocument(json, 4).array).toEqual(json.structures[0].features);

			expect(FindLocationOfDocument(json, 5).location).toEqual('room.appliance');
			expect(FindLocationOfDocument(json, 5).array).toEqual(json.structures[0].rooms[0].appliances);

			expect(FindLocationOfDocument(json, 6).location).toEqual('room.feature');
			expect(FindLocationOfDocument(json, 6).array).toEqual(json.structures[0].rooms[0].features);

			expect(FindLocationOfDocument(json, 7).location).toEqual('not found');
		});

		it('is a defined function', function () {
			expect(FindLocationOfDocument).toBeDefined();
			expect(typeof FindLocationOfDocument).toEqual('function');
		});
	});

	describe('PullDocsFromArray', function () {

		it('is a defined function', function () {
			expect(PullDocsFromArray).toBeDefined();
			expect(typeof PullDocsFromArray).toEqual('function');
		});
	});

	describe('FindIdOfApplianceOrFeature', function () {

		it('is a defined function', function () {
			expect(FindIdOfApplianceOrFeature).toBeDefined();
			expect(typeof FindIdOfApplianceOrFeature).toEqual('function');
		});
	});

	describe('RemoveFromJSON', function () {

		it('is a defined function', function () {
			expect(RemoveFromJSON).toBeDefined();
			expect(typeof RemoveFromJSON).toEqual('function');
		});

		it('removes the document from a passed in json and returns a new json to be submitted to server', function () {
			var indexes = { arrayIndex: 0, documentIndex: 0, structureIndex: 0, roomIndex: 0 };
			json.address = '1235 Street';
			json.images = [];
			expect(typeof RemoveFromJSON(json, 'lot.appliance', indexes)).toEqual('object');
			expect(RemoveFromJSON(json, 'lot.appliance', indexes).address).toEqual(json.address);
			expect(RemoveFromJSON(json, 'lot.appliance', indexes).images).toEqual(json.images);
			expect(RemoveFromJSON(json, 'lot.appliance', indexes).lot).toBeDefined();
			expect(RemoveFromJSON(json, 'lot.appliance', indexes).structures).toBeDefined();

			json.lot.features[indexes.arrayIndex].documents[indexes.documentIndex] = true;
			expect(RemoveFromJSON(json, 'lot.feature', indexes).lot.features[indexes.arrayIndex].documents[indexes.documentIndex]).not.toBeDefined();

			json.structures[indexes.structureIndex].appliances[indexes.arrayIndex].documents[indexes.documentIndex] = true;
			expect(RemoveFromJSON(json, 'lot.appliance', indexes).structures[indexes.structureIndex].appliances[indexes.arrayIndex].documents[indexes.documentIndex]).toBeDefined();
			expect(RemoveFromJSON(json, 'structure.appliance', indexes).structures[indexes.structureIndex].appliances[indexes.arrayIndex].documents[indexes.documentIndex]).not.toBeDefined();

			json.structures[indexes.structureIndex].features[indexes.arrayIndex].documents[indexes.documentIndex] = true;
			expect(RemoveFromJSON(json, 'structure.feature', indexes).structures[indexes.structureIndex].features[indexes.arrayIndex].documents[indexes.documentIndex]).not.toBeDefined();

			json.structures[indexes.structureIndex].rooms[indexes.roomIndex].features[indexes.arrayIndex].documents[indexes.documentIndex] = true;
			expect(RemoveFromJSON(json, 'room.feature', indexes).structures[indexes.structureIndex].rooms[indexes.roomIndex].features[indexes.arrayIndex].documents[indexes.documentIndex]).not.toBeDefined();

			json.structures[indexes.structureIndex].rooms[indexes.roomIndex].appliances[indexes.arrayIndex].documents[indexes.documentIndex] = true;
			expect(RemoveFromJSON(json, 'room.appliance', indexes).structures[indexes.structureIndex].rooms[indexes.roomIndex].appliances[indexes.arrayIndex].documents[indexes.documentIndex]).not.toBeDefined();

			expect(RemoveFromJSON(json, 'not found').lot).toEqual(json.lot);
			expect(RemoveFromJSON(json, 'not found').structures).toEqual(json.structures);

			expect(RemoveFromJSON(json, 'default').lot).toEqual(json.lot);
			expect(RemoveFromJSON(json, 'default').structures).toEqual(json.structures);
		});
	});

	describe('ConvertJson', function () {

		it('is a defined function', function () {
			expect(ConvertJson).toBeDefined();
			expect(typeof ConvertJson).toEqual('function');
		});

		it('prepares the json to be submitted to the server', function () {
			var resp = ConvertJson(json, 1);
			expect(typeof resp).toEqual('object');
			expect(resp.md5).toBeDefined();
			expect(resp.file).toBeDefined();
			expect(typeof resp.headers).toEqual('object');
			expect(resp.headers['X-FILE-UUID']).toBeDefined();
		});
	});

});