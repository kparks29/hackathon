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

angular.module('HOMDNA.common.utils', [])
	// TODO: convert to $homdna namespace
	.factory('$localStorage', localStorage)
	.factory('prepareJSON', prepareJSON)
	.factory('generateUUID', generateUUID)
	.factory('convertFile', convertFile);

})();