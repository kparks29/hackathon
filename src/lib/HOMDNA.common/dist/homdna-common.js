(function () {
'use strict';

//returns the location of the document, indexes of the arrays, a array of the location, and the docId  all in an object
function FindLocationOfDocument (PullDocsFromArray, FindIdOfApplianceOrFeature) {
    return function (json, docId) {
        var array = [];
        var indexes = {};
        var location = '';
    
        if (_.contains(PullDocsFromArray(json.lot.appliances), docId)) {
            location = 'lot.appliance';
            array = json.lot.appliances;
        }
        else if (_.contains(PullDocsFromArray(json.lot.features), docId)){
            location = 'lot.feature';
            array = json.lot.features;
        }
        else {
            for (var i=0; i<json.structures.length; i++) {
                if (_.contains(PullDocsFromArray(json.structures[i].appliances), docId)){
                    location = 'structure.appliance';
                    array = json.structures[i].appliances;
                    indexes = {structureIndex: i};
                }
                else if (_.contains(PullDocsFromArray(json.structures[i].features), docId)){
                    location = 'structure.feature';
                    array = json.structures[i].features;
                    indexes = {structureIndex: i};
                }
                else {
                    for (var j=0; j<json.structures[i].rooms.length; j++) {
                        if (_.contains(PullDocsFromArray(json.structures[i].rooms[j].appliances), docId)){
                            location = 'room.appliance';
                            array = json.structures[i].rooms[j].appliances;
                            indexes = {structureIndex: i, roomIndex: j};
                        }
                        else if (_.contains(PullDocsFromArray(json.structures[i].rooms[j].features), docId)){
                            location = 'room.feature';
                            array = json.structures[i].rooms[j].features;
                            indexes = {structureIndex: i, roomIndex: j};
                        }
                        else {
                            location = 'not found';
                        }
                    }
                }
            }  
        }
        indexes = angular.extend({}, indexes, FindIdOfApplianceOrFeature(array, docId));
        return {location: location, indexes: indexes, array: array, docId: docId}
    }
}
FindLocationOfDocument.$inject = ["PullDocsFromArray", "FindIdOfApplianceOrFeature"];



//returns an array of docs
function PullDocsFromArray () {
    return function (array) {
        var docs = []
        for (var i=0; i<array.length; i++){
            if (array[i].documents) {
                docs = docs.concat(array[i].documents)
            }
        }
        return docs
    }
}




//loops through an array to find the array index and the document index of the location of the document
function FindIdOfApplianceOrFeature () {
    return function (array, docId) {
        for (var i=0; i<array.length; i++) {
            var index = array[i].documents.indexOf(docId);
            if (index != -1) {
                return {arrayIndex: i, documentIndex: array[i].documents.indexOf(docId)}
            }
            else {
                console.log('document id not found')
            }
        }
    }
}




//removes the document from a passed in json and returns a new json to be submitted to server
function RemoveFromJSON () {
    return function (json, location, indexes) {
        switch (location) {
            case 'lot.appliance':
                json.lot.appliances[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'lot.feature':
                json.lot.features[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'structure.appliance':
                json.structures[indexes.structureIndex].appliances[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'structure.feature':
                json.structures[indexes.structureIndex].features[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'room.appliance':
                json.structures[indexes.structureIndex].rooms[indexes.roomIndex].appliances[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'room.feature':
                json.structures[indexes.structureIndex].rooms[indexes.roomIndex].features[indexes.arrayIndex].documents.splice(indexes.documentIndex, 1);
                break;
            case 'not found':
                console.log('not in json')
                break;
            default: 
                console.log('error');
                break;
        }
        return {address: json.address, images: json.images, lot: json.lot, structures: json.structures}
    }
}


//prepares the json to be submitted to the server
function ConvertJson (prepareJSON, generateUUID) {
    return function (data, currentVersion) {
        return {
            md5: prepareJSON.getMD5(data),
            file: data,
            headers: _.extend(prepareJSON.getVersionUpdateHeaders(data, currentVersion), {
                'X-FILE-UUID': generateUUID()
            })
        };
    }
}
ConvertJson.$inject = ["prepareJSON", "generateUUID"];

angular.module('HOMDNA.common.documents', ['HOMDNA.common.utils'])
    .factory('FindLocationOfDocument', FindLocationOfDocument)
    .factory('PullDocsFromArray', PullDocsFromArray)
    .factory('FindIdOfApplianceOrFeature', FindIdOfApplianceOrFeature)
    .factory('RemoveFromJSON', RemoveFromJSON)
    .factory('ConvertJson', ConvertJson);

})();
(function () {
'use strict';

function localStorage ($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	};
}
localStorage.$inject = ["$window"];

function prepareJSON () {
	return {
		getMD5: function (data) {
			return _(data)
				.thru(angular.toJson)
				.thru(CryptoJS.MD5)
				.thru(function (value) {
					return value.toString();
				})
				.thru(btoa)
				.value();
		},
		getVersionUpdateHeaders: function (data, currentVersion) {
			return {
				'Content-MD5': this.getMD5(data),
				'X-Homdna-Version': (parseInt(currentVersion) + 1).toString(),
				'X-Homdna-Modified-Version': currentVersion.toString()
			};
		}
	};
}

function generateUUID () {
	return function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
		});
		return uuid;
	};
}

// =============ConvertFile README==================
// this service allows you to pass ConvertFile() a file object
// it will return an object that has the headers for Content-Type and Content-MD5
// and return a file the is also base64 encoded
// example {headers: {'Content-Type': '', 'Content-MD5': 'VM234ASF62356ASFMXC'}, file: "91723498BNBSA987CRN109752917NMX2X1N23904XMY2092NX402..."}
// this is the format the server looks for when sumbitting your files
// ***** currently only supports pdf and image(png, jpg, etc.) file types

// TO DO: use prepareJSON.getMD5 to create the headers, remove from this code
// TO DO: use only CryptoJS or SparkMD5
function convertFile ($q) {
	return function(file) {
		var reader = new FileReader(),
			d = $q.defer();

		function getMD5Hash(file) {
			var deferred = $q.defer(),
				reader = new FileReader();

			reader.onloadend = function(e){
				var md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
				md5 = btoa(md5.toString());
				deferred.resolve(md5);
			};

			reader.readAsArrayBuffer(file);
			return deferred.promise;
		}

		reader.onloadend = function(){
			var fileArray  = reader.result.split(';base64,'),
				fileData = fileArray[1],
				fileType =  fileArray[0].split(':')[1];

			getMD5Hash(file).then(function(result){
				d.resolve({
					file: fileData,
					headers: {
						'Content-Type': fileType,
						'Content-MD5': result
					}
				});
			});
		};

		reader.readAsDataURL(file);

		return d.promise;
	};
}
convertFile.$inject = ["$q"];

angular.module('HOMDNA.common.utils', [])
	// TODO: convert to $homdna namespace
	.factory('$localStorage', localStorage)
	.factory('prepareJSON', prepareJSON)
	.factory('generateUUID', generateUUID)
	.factory('convertFile', convertFile);

})();