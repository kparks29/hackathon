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

angular.module('HOMDNA.common.documents', ['HOMDNA.common.utils'])
    .factory('FindLocationOfDocument', FindLocationOfDocument)
    .factory('PullDocsFromArray', PullDocsFromArray)
    .factory('FindIdOfApplianceOrFeature', FindIdOfApplianceOrFeature)
    .factory('RemoveFromJSON', RemoveFromJSON)
    .factory('ConvertJson', ConvertJson);

})();