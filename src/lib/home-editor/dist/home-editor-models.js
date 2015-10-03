/**
 * Bootstraps the HomeEditor.Utils module
 */
(function (angular) {
'use strict';

angular.module('HomeEditor.Utils', []);

})(angular);
/**
 * PropertyDefiner
 *
 * Provides utilities for defining properties for objects. Allows you to define
 * - properties with custom get/set handlers
 * - read only properties
 * - proxy properties
 * 
 * @module PropertyDefiner
 */
(function (angular) {
'use strict';

function PropertyDefinerDefinition () {

/**
 * Creates a PropertyDefiner object that provides property defining 
 * functions for the specified prototype object
 * @param {[type]} targetObject [description]
 * @constructor
 */
function PropertyDefiner (targetObject) {
    if (!(targetObject instanceof Object)) {
        throw new Error('Target prototype must be an object. Type received: ' + (typeof targetObject));
    }
    this._targetObject = targetObject;
}
var proto = PropertyDefiner.prototype;

/**
 * Defines a getter/setter for the targeted prototype
 * @param {string} propertyName The name of the new property
 * @param {function} getter       Function to run when accessing the property
 * @param {function} setter       Function to run when setting the property
 */
function property (propertyName, getter, setter) {
    var setGet = {};
    if (getter) {
        setGet.get = getter;
    }
    if (setter) {
        setGet.set = setter;
    }
    Object.defineProperty(this._targetObject, propertyName, setGet);
}
proto.property = property;

/**
 * Defines a getter for the targeted prototype. Throws an error if you try to write 
 * to this property.
 * @param  {string} propertyName The name of the new property
 * @param  {function} getter       Function to run when accessing the property
 */
function readOnlyProperty (propertyName, getter) {
    this.property(propertyName, getter, function () {
        throw new Error('Cannot modify read only property: ' + propertyName);
    });
}
proto.readOnlyProperty = readOnlyProperty;

/**
 * Defines a proxy property for the target object
 *
 * A 'proxy property' is a property whose get/set actions affect the
 * property of the object referenced by the 'payload' property
 *
 * For example, assume a proxy property called `lot` is defined on the 
 * Homdna object whose source property is the `lot` property on the payload object.
 * - Assigning a value to Homdna.lot will assign the value to Homdna.payload.lot.
 * - Reading a value from Homdna.lot will return the value from Homdna.payload.lot.
 *
 * A proxy property should still work if the source property name is not defined on
 * the source object. In this situation, the proxy property will return undefined upon
 * read and will define the source property on the source object upon assignment.
 *
 * A proxy property will always reference the object being referenced by the 'payload' property.
 * For example, assuming the following:
 *   - Homdna.payload is assigned to Object A, 
 *   - A proxy property 'homeId' is defined
 *     - Thus, Homdna.homeId points to A.homeId
 * If Homdna.payload is set to Object B, Homdna.homeId will now refer to B.homeId.
 *
 * If you're familiar with pointers, you can think of a proxy property as a pointer to a pointer.
 * 
 * @param  {string} propertyName       Name of the proxy property being defined
 * @param  {string} sourcePropertyName The property name that this proxy property will reference
 */
function proxyProperty (propertyName, sourcePropertyName) {
    if (!sourcePropertyName) {
        sourcePropertyName = propertyName;
    }
    this.property(propertyName, function get () {
        return this.payload[sourcePropertyName];
    }, function set (newValue) {
        this.payload[sourcePropertyName] = newValue;
    });
}
proto.proxyProperty = proxyProperty;

return PropertyDefiner;

}
angular.module('HomeEditor.Utils').
    factory('PropertyDefiner', PropertyDefinerDefinition);

})(angular);
(function (angular) {
'use strict';

function InMemoryCache () {

    var IN_MEMORY_CACHE = {};

    function get (key) {
        return IN_MEMORY_CACHE[key];
    }
    function set (key, value) {
        if (arguments.length < 2) {
            throw new Error('InMemoryCache.set requires 2 arguments. Only received ' + arguments.length);
        }
        IN_MEMORY_CACHE[key] = value;
    }

    function clear () {
        IN_MEMORY_CACHE = {};
    }

    return {
        'get'   : get,
        'set'   : set,
        'clear' : clear
    };
}

angular.module('HomeEditor.Utils').
    service('InMemoryCache', InMemoryCache);

})(angular);
/**
 * @ngdoc overview
 * @name  HomeEditor.Models
 * @description
 *
 * # HomeEditor.Models
 *
 * This module contains all of the models used in HomeEditor. 
 */
(function (angular) {
'use strict';

var dependencies = [
    'HomeEditor.Utils'
];

angular.module('HomeEditor.Models', dependencies);

})(angular);
/*
BaseModel
- internal object (the object that stores the true values)
- Internal object is needed to delineate which data that belongs to the model and which properties have been attached by users of the model
- get(string or path)
 - returns data based on string from payload
- set(string)
 - if string is a property, sets that property on the payload
- set(object)
 - adds those properties to the payload, if any of the properties already exist, then the value from the new object will overwrite the value on the payload

In the context of a Model Object being sent to the server, whatever is set on the internal object will be used
 */

(function (angular, _) {
'use strict';
function BaseModelDefinition () {

function BaseModel (obj) {
  this.internal = obj || {};
}

BaseModel.prototype.get = function (path) {
  return _.get(this.internal, path);
};

BaseModel.prototype.set = function (firstArg, value) {
  // If the first arg is a path, set that path to the given value
  // If the first arg is an object, merge the properties with the internal object.
  // The given object's properties should overwrite the internal object's properties.
  if (typeof(firstArg) === 'string') {
    if (_.isUndefined(value)) {
      throw new Error('BaseModel.set requires 2nd argument to be defined if the 1st argument is a string');
    }
    _.set(this.internal, firstArg, value);
  } else if (typeof(firstArg) === 'object') {
    _.assign(this.internal, firstArg);
  } else {
    throw new Error('BaseModel.set requires first argument to be either a string or object');
  }
}

return BaseModel;
}

angular.module('HomeEditor.Models')
    .factory('BaseModel', BaseModelDefinition);

})(angular, _);

/*
SpaceModel
- implements Imageable and Documentable
- getFeature/Appliance(uuid)
  - returns a Feature object whose .internal property points to the feature object in the space’s internal object
- getFeatures/Appliances()
  - returns all features/appliances as Feature/Appliance model objects
- addFeature/Appliance
  - takes in some object? or should the user have to do .addFeature(new Feature({some object}))
- removeFeature/Appliance

- TODO
  - how does set behave when you do this.set(‘features’, a value that isn’t a valid features array)? Override set?
  - get(‘features’) vs getFeatures might get confusing
*/
(function (angular, _, chance) {
'use strict';

function SpaceModelDefinition (BaseModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Constructs the SpaceModel
 * @class SpaceModel
 * @classdesc
 * The class that defines the methods and properties of all spaces (e.g. Lot, Structure, Room, etc.).
 * This class is a child of the BaseModel class.
 */
function SpaceModel (params) {
  // Calling the superclass' constructor
  BaseModel.call(this, params);
  this.initializeDocuments();
  this.initializeImages();
  this.initializeProperties();
}

// Extending the BaseModel Class
SpaceModel.prototype = Object.create(BaseModel.prototype);
SpaceModel.prototype.constructor = SpaceModel;
var proto = SpaceModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
    /**
     * The Space model's instance ID.
     * @name SpaceModel#id
     * @type {String}
     */
    this.set('id', this.get('id') || chance.guid());

    /**
     * @name SpaceModel#features
     * @type {Array<Object>}
     */
    this.set('features', this.get('features') || []);

    /**
     * @name SpaceModel#appliances
     * @type {Array<Object>}
     */
    this.set('appliances', this.get('appliances') || []);

    /**
     * @name SpaceModel#notes
     * @type {String}
     */
    this.set('notes', this.get('notes') || '');

    this.features = buildFeatureModels(this.get('features'));
    var self = this;
    _.each(this.features, function (featureModel) {
        featureModel.location = self;
    });

    this.appliances = buildApplianceModels(this.get('appliances'));
    _.each(this.appliances, function (applianceModel) {
        applianceModel.location = self;
    });
}

/**
 * Adds the new feature to internal features and external features.
 * @param {Object} featureParams Feature parameters
 */
proto.addFeature = function (featureParams) {
  var newFeature = new FeatureModel(featureParams);
  newFeature.location = this;
  this.features.push(newFeature);
  this.get('features').push(newFeature.internal);
  return newFeature;
};

/**
 * Adds the new appliance to internal appliances and external appliances
 * @param {Object} applianceParams Properties for new Appliance
 */
proto.addAppliance = function (applianceParams) {
  var newAppliance = new ApplianceModel(applianceParams);
  newAppliance.location = this;
  this.appliances.push(newAppliance);
  this.get('appliances').push(newAppliance.internal);
  return newAppliance;
};

/**
 * Removes the feature with the given instance ID from the SpaceModel.
 * Removes from both internal and external features properties.
 * @param  {featureId} featureId Instance ID of the feature to remove
 */
proto.removeFeature = function (featureId) {
  _.remove(this.get('features'), function (feature) {
    return feature.id === featureId;
  });
  _.remove(this.features, function (featureModel) {
    featureModel.location = null;
    return featureModel.get('id') === featureId;
  });
};

/**
 * Removes the appliance with the given instance ID from the SpaceModel.
 * Removes from both internal and external appliances properties.
 * @param  {applianceId} applianceId Instance ID of the appliance to remove
 */
proto.removeAppliance = function (applianceId) {
  _.remove(this.get('appliances'), function (appliance) {
    return appliance.id === applianceId;
  });
  _.remove(this.appliances, function (applianceModel) {
    applianceModel.location = null;
    return applianceModel.get('id') === applianceId;
  });
};

/**
 * Ensures that the internal features and appliances properties
 * match up with the models stored on the external features/appliances.
 */
proto.rebuildSpaceModelInternal = function () {
  this.set('features', buildFeatureInternals(this.features));
  this.set('appliances', buildApplianceInternals(this.appliances));
};

function buildFeatureModels (internalArray) {
  return _.map(internalArray, function (feature) {
    return new FeatureModel(feature);
  });
}

function buildFeatureInternals (featureModels) {
  return _.pluck(featureModels, 'internal');
}

/**
 * Given an array of objects, returns an array of ApplianceModel objects.
 * @param  {Array<Object>} internalArray Array of objects
 * @return {Array<Feature>}              Array of ApplianceModels built from the given object array
 */
function buildApplianceModels (internalArray) {
  return _.map(internalArray, function (appliance) {
    return new ApplianceModel(appliance);
  });
}

function buildApplianceInternals (applianceModels) {
  return _.pluck(applianceModels, 'internal');
}

return SpaceModel;

}
SpaceModelDefinition.$inject = ["BaseModel", "ImageableModel", "DocumentableModel", "FeatureModel", "ApplianceModel"];

angular.module('HomeEditor.Models')
  .factory('SpaceModel', SpaceModelDefinition);

})(angular, _, chance);

(function (angular, _) {
'use strict';
function ImageableModelDefinition (BaseModel, FileModel) {

var ImageableModel = {
  /**
   * Initializes the images and primaryImage property on the internal object of the base model.
   */
  initializeImages: function () {
    if (!(this instanceof BaseModel)) {
      throw new Error('ImageableModel can only be applied to a BaseModel object');
    }
    this.set('images', this.get('images') || []);
    this.set('primaryImage', this.get('primaryImage') || null);
    this.images = [];
  },

  /**
   * Returns the primary image ID or null if it hasn't been set.
   * @return {String|null} The primary image ID or null
   */
  getPrimaryImage: function () {
    return this.get('primaryImage');
  },

  /**
   * Sets the primary image to the image ID given. This function throws an error
   * if the given image ID is not contained in the images array.
   * @param {String} imageId Image ID to set as the primary image
   */
  setPrimaryImage: function (imageId) {
    if (imageId !== null && !_.includes(this.get('images'), imageId)) {
      throw new Error('Primary image can only be set to image contained in the images array');
    }
    this.set('primaryImage', imageId);
  },

  addImage: function (fileParams) {
    var newFileModel = new FileModel(fileParams);
    this.get('images').push(newFileModel.get('id'));
    this.images.push(newFileModel);
    return newFileModel;
  },

  removeImage: function (targetFileId) {
    _.remove(this.get('images'), function (imageId) {
      return imageId === targetFileId;
    });
    _.remove(this.images, function (fileModel) {
      return fileModel.get('id') === targetFileId;
    });
  },

  /**
   * Returns a clone of the images array that contains FileModels
   * @return {Array<FileModels>} An array of FileModels
   */
  cloneImages: function () {
    // Extract an array of the file models internals
    // for each model internal. create a new FileModel from them and add them to an array?
    return _.map(this.images, function (fileModel) {
      // TODO We could implement a FileModel.clone function but
      // right now it would only consist of the line below. If the FileModel ever needs to
      // clone an external property, we would implement it then. But for now this will do.
      return new FileModel(_.cloneDeep(fileModel.internal));
    });
  }
};

return ImageableModel;

}
ImageableModelDefinition.$inject = ["BaseModel", "FileModel"];

angular.module('HomeEditor.Models')
  .factory('ImageableModel', ImageableModelDefinition);

})(angular, _);

/*
- TODO
  - How do I ensure that there is a documents property on the internal object? How to run initialization code on upon mixin?
  - Make an actual Document object and have DocumentableModel accept it?
*/
(function (angular, _) {
'use strict';
function DocumentableModelDefinition (BaseModel, DocumentModel) {

var DocumentableModel = {
  /**
   * Initializes the documents property on the internal object of the base model.
   */
  initializeDocuments : function () {
    if (!(this instanceof BaseModel)) {
      throw new Error('DocumentableModel can only be applied to a BaseModel object');
    }
    this.set('documents', this.get('documents') || []);
    this.documents = [];
  },

  addDocument : function (documentParams) {
    var newDocument = new DocumentModel(documentParams);
    this.get('documents').push(newDocument.internal.id);
    this.documents.push(newDocument);
    return newDocument;
  },

  removeDocument : function (targetDocumentId) {
    _.remove(this.get('documents'), function (documentId) {
      return documentId === targetDocumentId;
    });
    _.remove(this.documents, function (documentModel) {
      return documentModel.get('id') === targetDocumentId;
    });
  }
};

return DocumentableModel;
}
DocumentableModelDefinition.$inject = ["BaseModel", "DocumentModel"];

angular.module('HomeEditor.Models')
    .factory('DocumentableModel', DocumentableModelDefinition);

})(angular, _);

/**
 * @fileoverview Defines the Address Model
 */
(function (angular, _, chance) {
'use strict';
function AddressDefinition (PropertyDefiner) {

/**
 * Creates a new Address with the given payload.
 *
 * @class Address
 * @classdesc
 * This is a wrapper object for the Address payload received from the server.
 * This wrapper object provides basic read/write access to the Address payload.
 * 
 * @param {Object} addressPayload - Payload object from server
 */
function Address(addressPayload) {
    this.payload = addressPayload || getNewAddressPayload();
}
var proto = Address.prototype;


var propDef          = new PropertyDefiner(proto);
var proxyProperty    = _.bind(propDef.proxyProperty, propDef);


/**
 * The address's postal code
 *
 * @name Address#postalCode
 * @type {String}
 */
proxyProperty('postalCode');

/**
 * The address's state
 *
 * @name Address#state
 * @type {String}
 */
proxyProperty('state');

/**
 * The address's street
 *
 * @name Address#street
 * @type {String}
 */
proxyProperty('street');

/**
 * The address's city
 *
 * @name Address#city
 * @type {String}
 */
proxyProperty('city');

/**
 * The address's unit
 *
 * @name Address#unit
 * @type {String}
 */
proxyProperty('unit');


var DEFAULT_ADDRESS_PAYLOAD = {
    'postalCode': '',
    'state':      '',
    'city':       '',
    'street':     '',
    'unit':       ''
};

function getNewAddressPayload() {
    var newPayload = _.cloneDeep(DEFAULT_ADDRESS_PAYLOAD);
    return newPayload;
}

return Address;
}
AddressDefinition.$inject = ["PropertyDefiner"];

angular.module('HomeEditor.Models')
    .factory('AddressModel', AddressDefinition);

})(angular, _, chance);
(function (angular, _, chance) {
'use strict';
function LotModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Creates a new LotModel with the given payload.
 *
 * @class LotModel
 * @classdesc
 * This is a wrapper object for the LotModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the LotModel payload.
 *
 * @param {object} params - Payload object from server
 */
function LotModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeLotModelProperties();
}

// Extending the SpaceModel Class
LotModel.prototype = Object.create(SpaceModel.prototype);
LotModel.prototype.constructor = LotModel;
var proto = LotModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeLotModelProperties = function () {
  /**
   * The lot's size in square feet.
   *
   * @name LotModel#lotSize
   * @type {Number}
   */
  this.set('lotSize', this.get('lotSize') || 0);

  this.modelType = 'LotModel';
}

return LotModel;
}
LotModelDefinition.$inject = ["SpaceModel", "ImageableModel", "DocumentableModel", "FeatureModel", "ApplianceModel"];

angular.module('HomeEditor.Models')
    .factory('LotModel', LotModelDefinition);

})(angular, _);

/**
 * @fileoverview Defines the Structure Model
 */
(function (angular, _) {
'use strict';
function StructureModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel, RoomModel) {

/**
 * Creates a new StructureModel with the given payload.
 *
 * @class StructureModel
 * @classdesc
 * This is a wrapper object for the StructureModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the StructureModel payload.
 *
 * @param {Object} params - Payload object from server
 */
function StructureModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeStructureModelProperties();
}

// Extending the SpaceModel Class
StructureModel.prototype = Object.create(SpaceModel.prototype);
StructureModel.prototype.constructor = StructureModel;
var proto = StructureModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);


/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeStructureModelProperties = function () {
  /**
   * The structure's name
   *
   * @name StructureModel#name
   * @type {String}
   */
  this.set('name', this.get('name') || '');

  /**
   * The structure's structureType
   *
   * @name StructureModel#structureType
   * @type {String}
   */
  this.set('structureType', this.get('structureType') || '');

  /**
   * The structure's size in square feet
   *
   * @name StructureModel#size
   * @type {Number}
   */
  this.set('size', this.get('size') || 0);

  /**
   * The structure's levels
   *
   * @name StructureModel#levels
   * @type {Number}
   */
  this.set('levels', this.get('levels') || 1);

  /**
   * An array of Room objects associated with the structure
   *
   * @name StructureModel#rooms
   * @type {Array<Room>}
   */
  this.set('rooms', this.get('rooms') || []);

  this.rooms = buildRoomModels(this.get('rooms'));
  var self = this;
  _.each(this.rooms, function (roomModel) {
      roomModel.location = self;
  });

  this.modelType = 'StructureModel';
}

function buildRoomModels (internalArray) {
  return _.map(internalArray, function (room) {
    return new RoomModel(room);
  });
}

function buildRoomInternals (roomModels) {
  return _.pluck(roomModels, 'internal');
}

/**
 * Adds a new room to the structure
 *
 * @method StructureModel#addRoom
 * @param {Object} roomParams RoomModel object that will be added
 */
proto.addRoom = function (roomParams) {
    var newRoom = new RoomModel(roomParams);
    newRoom.location = this;
    this.rooms.push(newRoom);
    this.get('rooms').push(newRoom.internal);
    return newRoom;
};

/**
 * Removes the room with the given instance ID from the structure
 *
 * @method StructureModel#removeRoom
 * @param {String} roomId Instance ID of the room to remove
 */
proto.removeRoom = function (roomId) {
    _.remove(this.get('rooms'), function (room) {
        return room.id === roomId;
    });
    _.remove(this.rooms, function (roomModel) {
        roomModel.location = null;
        return roomModel.get('id') === roomId;
    });
};

/**
 * Ensures that the internal rooms, features, and appliances properties
 * match up with the models stored on the external features/appliances/rooms.
 */
proto.rebuildStructureModelInternal = function () {
    this.rebuildSpaceModelInternal();
    this.set('rooms', buildRoomInternals(this.rooms));
};

return StructureModel;
}
StructureModelDefinition.$inject = ["SpaceModel", "ImageableModel", "DocumentableModel", "FeatureModel", "ApplianceModel", "RoomModel"];

angular.module('HomeEditor.Models')
    .factory('StructureModel', StructureModelDefinition);

})(angular, _);

(function (angular, _) {
'use strict';
function RoomModelDefinition (SpaceModel, ImageableModel, DocumentableModel, FeatureModel, ApplianceModel) {

/**
 * Creates a new RoomModel object based on homdna payload from the server.
 *
 * @class RoomModel
 * @classdesc
 * This is a wrapper object for the RoomModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the RoomModel payload.
 *
 * @param {Object} roomPayload - Payload object from server
 */
function RoomModel(params) {
    SpaceModel.call(this, params);
    this.initializeDocuments();
    this.initializeImages();
    this.initializeRoomModelProperties();
}

// Extending the SpaceModel Class
RoomModel.prototype = Object.create(SpaceModel.prototype);
RoomModel.prototype.constructor = RoomModel;
var proto = RoomModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeRoomModelProperties = function () {
    /**
     * The room's name.
     *
     * @name RoomModel#name
     * @type {String}
     */
    this.set('name', this.get('name') || '');

    /**
     * The room's room type.
     *
     * @name RoomModel#roomType
     * @type {String}
     */
    this.set('roomType', this.get('roomType') || '');

    /**
     * The floor level on which this room is located within its structure.
     *
     * @name RoomModel#level
     * @type {String}
     */
    this.set('level', this.get('level') || 1);

    /**
     * The room's size in square feet.
     *
     * @name RoomModel#size
     * @type {String}
     */
    this.set('size', this.get('size') || 0);

    this.modelType = 'RoomModel';
}

/**
 * The location that contains this RoomModel.
 * This property can only be set to a location that actually contains this RoomModel.
 *
 * @name RoomModel#location
 * @type {Structure}
 */
proto.location = null;

return RoomModel;
}
RoomModelDefinition.$inject = ["SpaceModel", "ImageableModel", "DocumentableModel", "FeatureModel", "ApplianceModel"];

angular.module('HomeEditor.Models')
    .factory('RoomModel', RoomModelDefinition);

})(angular, _);

(function (angular, _, chance) {
'use strict';
function ApplianceModelDefinition (BaseModel, ImageableModel, DocumentableModel) {

/**
 * Creates a new ApplianceModel with the given payload.
 *
 * @class ApplianceModel
 * @classdesc
 * This is a wrapper object for the ApplianceModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the ApplianceModel payload.
 *
 * @param {Object} appliancePayload - Payload object from server
 */
function ApplianceModel(appliancePayload) {
    BaseModel.call(this, appliancePayload);
    this.initializeImages();
    this.initializeDocuments();
    this.initializeProperties();
}

// Extending the BaseModel Class
ApplianceModel.prototype = Object.create(BaseModel.prototype);
ApplianceModel.prototype.constructor = ApplianceModel;
var proto = ApplianceModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
  /**
   * The appliance's instance ID.
   *
   * @name ApplianceModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The appliance's name
   *
   * @name ApplianceModel#name
   * @type {String}
   */
  this.set('name', this.get('name') || '');

  /**
   * The appliance's appliance ID.
   *
   * @name ApplianceModel#applianceId
   * @type {String}
   */
  this.set('applianceId', this.get('applianceId') || '');

  this.modelType = 'ApplianceModel';
}

/**
 * The location that contains this ApplianceModel.
 *
 * @name ApplianceModel#location
 * @type {(Lot|Structure|Room|null)}
 */
proto.location = null;

return ApplianceModel;
}
ApplianceModelDefinition.$inject = ["BaseModel", "ImageableModel", "DocumentableModel"];

angular.module('HomeEditor.Models')
    .factory('ApplianceModel', ApplianceModelDefinition);

})(angular, _, chance);

(function (angular, _, chance) {
'use strict';
function FeatureModelDefinition (BaseModel, ImageableModel, DocumentableModel) {

/**
 * Creates a new FeatureModel object based on homdna payload from the server. If no payload
 * is supplied, then a new feature payload is generated.
 *
 * @class FeatureModel
 * @classdesc
 * This is a wrapper object for the FeatureModel payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the FeatureModel payload.
 *
 * @param {Object} params FeatureModel parameters
 */
function FeatureModel(params) {
    BaseModel.call(this, params);
    this.initializeImages();
    this.initializeDocuments();
    this.initializeProperties();
}

// Extending the BaseModel Class
FeatureModel.prototype = Object.create(BaseModel.prototype);
FeatureModel.prototype.constructor = FeatureModel;
var proto = FeatureModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the FeatureModels exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeProperties = function () {
    /**
     * The feature's instance ID. Cannot be modified after being created.
     *
     * @name FeatureModel#id
     * @type {String}
     * @description Read only
     */
    this.set('id', this.get('id') || chance.guid());

    /**
     * The feature's name.
     *
     * @name FeatureModel#name
     * @type {String}
     */
    this.set('name', this.get('name') || '');

    /**
     * The feature's feature type.
     *
     * @name FeatureModel#featureType
     * @type {String}
     */
    this.set('featureType', this.get('featureType') || '');

    this.modelType = 'FeatureModel';
}

/**
 * The location that contains this FeatureModel.
 *
 * @todo Need to check if the location is a valid location
 * @name FeatureModel#location
 * @type {(Lot|Structure|Room|null)}
 */
proto.location = null;


return FeatureModel;
}
FeatureModelDefinition.$inject = ["BaseModel", "ImageableModel", "DocumentableModel"];

angular.module('HomeEditor.Models')
    .factory('FeatureModel', FeatureModelDefinition);

})(angular, _, chance);

(function (angular, _) {
'use strict';

function HomdnaModelDefinition (BaseModel, ImageableModel, DocumentableModel, AddressModel, LotModel, StructureModel) {

/**
 * Creates a new HomdnaModel object based on homdna payload from the server. If no payload
 * is supplied, then a new feature payload is generated.
 *
 * @class HomdnaModel
 * @classdesc
 * This is a wrapper object for the HomdnaModel payload received from the server. <br />
 * This wrapper object provides basic read/write access to the HomdnaModel payload
 * as well as some utility properties/methods that are useful for client-side
 * applications.
 *
 * @param {Object} params HomdnaModel payload object from server
 */
function HomdnaModel (params) {
    BaseModel.call(this, params);

    this.initializeHomdnaModelProperties();
    this.initializeDocuments();
    this.initializeImages();
}

// Extending the BaseModel Class
HomdnaModel.prototype = Object.create(BaseModel.prototype);
HomdnaModel.prototype.constructor = HomdnaModel;
var proto = HomdnaModel.prototype;

// Implements Imageable and Documentable
_.extend(proto, ImageableModel);
_.extend(proto, DocumentableModel);

/**
 * Ensures that the required properties of the Features exist on the internal object.
 * If any of the required properties do not exist, they will be given a default value.
 */
proto.initializeHomdnaModelProperties = function () {
    /**
     * The HomdnaModel's Lot
     *
     * @name HomdnaModel#lot
     * @type {Lot}
     */
    var newLot = new LotModel(this.get('lot'));
    this.set('lot', newLot.internal);
    this.lot = newLot;

    /**
     * The HomdnaModel's structures
     *
     * @name HomdnaModel#structures
     * @type {Array<Structure>}
     */
    this.set('structures', this.get('structures') || []);
    this.structures = buildStructureModels(this.get('structures'));

    /**
     * The HomdnaModel's notes
     *
     * @name HomdnaModel#notes
     * @type {String}
     */
    this.set('notes', this.get('notes') || '');
};

function buildStructureModels (internalArray) {
    return _.map(internalArray, function (structure) {
        return new StructureModel(structure);
    });
}

function buildStructureInternals (structureModels) {
    return _.pluck(structureModels, 'internal');
}

/**
 * Removes the structure whose instance ID matches the given ID.
 *
 * @method HomdnaModel#removeStructure
 * @param  {String} structureId The ID of the structure to remove
 */
proto.removeStructure = function (structureId) {
    _.remove(this.get('structures'), function (structure) {
      return structure.id === structureId;
    });
    _.remove(this.structures, function (structureModel) {
      return structureModel.get('id') === structureId;
    });
};

/**
 * Adds a new structure object to the structures array.
 *
 * @method HomdnaModel#addStructure
 * @param  {String} name Structure's name
 * @param  {String} structureType Structure's type
 * @param  {Number} sizeSqft The structure's size in square feet
 * @return {StructureModel} The StructureModel object that was added
 */
proto.addStructure = function (structureParams) {
    var newStructure = new StructureModel(structureParams);
    this.structures.push(newStructure);
    this.get('structures').push(newStructure.internal);
    return newStructure;
};

/**
 * Sets the HomdnaModel's lot. This adds the lot to both external/internal lot properties.
 * @param {Object} lotParams Lot model properties
 * @return {LotModel} The LotModel object that was added
 */
proto.setLot = function (lotParams) {
    var newLot = new LotModel(lotParams);
    this.lot = newLot;
    this.set('lot', newLot.internal);
    return newLot;
};

proto.rebuildHomdnaModelInternal = function () {
    // Ensure that the structures internal data is up to date
    _.each(this.structures, function (structureModel) {
        structureModel.rebuildStructureModelInternal();
    });
    this.set('structures', buildStructureInternals(this.structures));
    this.set('lot', this.lot.internal);
    // TODO: Address Model too?
};

/**
 * Returns an array of all of this HomdnaModel's Room objects associated with their structures
 *
 * @name HomdnaModel#getAllRooms
 * @type {Array<Room>}
 */
proto.getAllRooms = function () {
    // Go through each structure and add all the rooms together
    return _(this.structures).
        pluck('rooms').
        flatten().
        value();
};

/**
 * Returns an array of all of this HomdnaModel's Lot, Structure, and Room objects
 *
 * @name HomdnaModel#getAllSpaces
 * @type {Array<SpaceModel>}
 */

proto.getAllSpaces = function () {
    return _.union([this.lot],
                    this.structures,
                    this.getAllRooms());
};

/**
 * Returns an array of all of this HomdnaModel's Features
 *
 * @name HomdnaModel#getAllFeatures
 * @type {Array<Feature>}
 */
proto.getAllFeatures = function () {
    return _(this.getAllSpaces()).
        pluck('features').
        flatten().
        compact().
        value();
};

/**
 * Returns an array of all of this HomdnaModel's Appliances
 *
 * @name HomdnaModel#getAllAppliances
 * @type {Array<Appliance>}
 */
proto.getAllAppliances = function () {
    return _(this.getAllSpaces()).
        pluck('appliances').
        flatten().
        compact().
        value();
};

proto.getAllDocumentables = function () {
    return _.union([this],
      this.getAllSpaces(),
      this.getAllFeatures(),
      this.getAllAppliances());
};

/**
 * Returns an array of all document IDs in the payload
 *
 * @name HomdnaModel#getAllDocuments
 * @type {Array<String>}
 */
proto.getAllDocuments = function () {
    return _(this.getAllDocumentables()).
        map(function (documentableModel) {
            return documentableModel.get('documents');
        }).
        flatten().
        compact().
        value();
};

proto.getAllSpacesAndElements = function () {
    return _.union(this.getAllSpaces(),
      this.getAllFeatures(),
      this.getAllAppliances());
};

/**
 * Returns the location of the given document ID
 *
 * @method HomdnaModel#getDocumentLocation
 * @param  {String} documentId The document ID to search
 * @return {DocumentableModel}    The DocumentableModel object that contains the document with the given document ID
 */
proto.getDocumentLocation = function (documentId) {
    return _.find(this.getAllDocumentables(), function (documentableModel) {
        return _.contains(documentableModel.get('documents'), documentId);
    });
};

return HomdnaModel;

}
HomdnaModelDefinition.$inject = ["BaseModel", "ImageableModel", "DocumentableModel", "AddressModel", "LotModel", "StructureModel"];
angular.module('HomeEditor.Models')
    .factory('HomdnaModel', HomdnaModelDefinition);
})(angular, _);

(function (angular, _) {
'use strict';

function HomdnaMetaDataDefinition (PropertyDefiner, HomdnaWorkflowModel) {

/** @todo Implement default homdna meta data payload */
var DEFAULT_HOMDNA_META_DATA_PAYLOAD = {};

/**
 * Creates a new HomdnaMetaData with the given payload.
 * 
 * @class HomdnaMetaData
 * @classdesc
 * This is a wrapper object for the HomdnaMetaData payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the HomdnaMetaData payload. 
 * 
 * @param {Object} homdnaWorkflowPayload - Payload object from server
 */
function HomdnaMetaData(homdnaMetaDataPayload) {
    if (!homdnaMetaDataPayload) {
        throw new Error('Need to provide a file payload object to HomdnaMetaData constructor');
    }
    this.payload = homdnaMetaDataPayload;
}
var proto = HomdnaMetaData.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The ID of the Homdna to which this HomdnaMetaData object refers.
 *
 * @name HomdnaMetaData#id
 * @type {String}
 */
proxyProperty('id');

/**
 * The ID of the Home to which this HomdnaMetaData object refers.
 *
 * @name HomdnaMetaData#homeId
 * @type {String}
 */
proxyProperty('homeId');

/**
 * The latest version of the Homdna
 *
 * @name HomdnaMetaData#currentVersion
 * @type {Number}
 */
proxyProperty('currentVersion');

/**
 * Whether or not the current version was created by Ops.
 *
 * @name HomdnaMetaData#officialVersion
 * @type {Boolean}
 */
proxyProperty('officialVersion');

/**
 * Whether or not this Homdna is a demo home.
 *
 * @name HomdnaMetaData#isDemo
 * @type {String}
 */
proxyProperty('isDemo');

/**
 * The Homdna's package ID.
 *
 * @name HomdnaMetaData#id
 * @type {String}
 */
proxyProperty('homdnaPackageId');

/**
 * The Homdna's HomdnaWorkflow object.
 * 
 * @name HomdnaMetaData#workflow
 * @type {HomdnaWorkflow}
 */
propDef.readOnlyProperty('workflow', function () {
    return new HomdnaWorkflowModel(this.payload.workflow);
});

return HomdnaMetaData;

}
HomdnaMetaDataDefinition.$inject = ["PropertyDefiner", "HomdnaWorkflowModel"];

angular.module('HomeEditor.Models')
    .factory('HomdnaMetaDataModel', HomdnaMetaDataDefinition);

})(angular, _);
(function (angular, _) {
'use strict';

function HomdnaWorkflowDefinition (PropertyDefiner) {

/** @todo Implement default homdna workflow payload */
var DEFAULT_HOMDNA_WORKFLOW_PAYLOAD = {

};

/**
 * Creates a new HomdnaWorkflow with the given payload.
 * 
 * @class HomdnaWorkflow
 * @classdesc
 * This is a wrapper object for the HomdnaWorkflow payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the HomdnaWorkflow payload. 
 * 
 * @param {Object} homdnaWorkflowPayload - Payload object from server
 */
function HomdnaWorkflow(homdnaWorkflowPayload) {
    if (!homdnaWorkflowPayload) {
        throw new Error('Need to provide a payload object to HomdnaWorkflow constructor');
    }
    this.payload = homdnaWorkflowPayload;
}
var proto = HomdnaWorkflow.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The HomdnaWorkflow's completion percentage.
 *
 * @name HomdnaWorkflow#completionPercentage
 * @type {Number}
 */
proxyProperty('completionPercentage');

/**
 * The HomdnaWorkflow's state.
 *
 * @name HomdnaWorkflow#stateId
 * @type {String}
 */
proxyProperty('stateId');

/**
 * The UUID of the inspector for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#inspectorId
 * @type {String}
 */
proxyProperty('inspectorId');

/**
 * The UUID of the realtor for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#realtorId
 * @type {String}
 */
proxyProperty('realtorId');

/**
 * The UUID of the primary homeowner for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#primaryHomeOwnerId
 * @type {String}
 */
proxyProperty('primaryHomeOwnerId');

/**
 * The UUID of the secondary homeowner for this HomdnaWorkflow.
 *
 * @name HomdnaWorkflow#secondaryHomeOwnerId
 * @type {(String|null)}
 */
proxyProperty('secondaryHomeOwnerId');

/**
 * The HomdnaWorkflow's realtor message for the homeowner.
 *
 * @name HomdnaWorkflow#realtorMessage
 * @type {(String|null)}
 */
proxyProperty('realtorMessage');

/**
 * The HomdnaWorkflow's scheduled date.
 *
 * @name HomdnaWorkflow#scheduleDate
 * @type {String}
 */
proxyProperty('scheduleDate');

/**
 * The HomdnaWorkflow's slot index.
 *
 * @name HomdnaWorkflow#slotIndex
 * @type {String}
 */
proxyProperty('slotIndex');

/**
 * The HomdnaWorkflow's submitted on date in UTC Format.
 *
 * @name HomdnaWorkflow#submittedOn
 * @type {String}
 */
proxyProperty('submittedOn');

/**
 * The HomdnaWorkflow's review started on date in UTC Format.
 *
 * @name HomdnaWorkflow#reviewStartedOn
 * @type {String}
 */
proxyProperty('reviewStartedOn');

/**
 * The HomdnaWorkflow's published on date in UTC format.
 *
 * @name HomdnaWorkflow#publishedOn
 * @type {String}
 */
proxyProperty('publishedOn');

/**
 * The HomdnaWorkflow's schedule notes.
 *
 * @name HomdnaWorkflow#scheduleNotes
 * @type {String}
 */
proxyProperty('scheduleNotes');

/**
 * The HomdnaWorkflow's created on date in UTC format.
 *
 * @name HomdnaWorkflow#createdOn
 * @type {String}
 */
proxyProperty('createdOn');

/**
 * The HomdnaWorkflow's modified on date in UTC format.
 *
 * @name HomdnaWorkflow#modifiedOn
 * @type {String}
 */
proxyProperty('modifiedOn');

/**
 * The HomdnaWorkflow's activated on date in UTC format.
 *
 * @name HomdnaWorkflow#activatedOn
 * @type {String}
 */
proxyProperty('activatedOn');

/**
 * The HomdnaWorkflow's registration token.
 *
 * @name HomdnaWorkflow#registrationToken
 * @type {String}
 */
proxyProperty('registrationToken');

/**
 * The HomdnaWorkflow's realtor state ID.
 *
 * @name HomdnaWorkflow#realtorStateId
 * @type {String}
 */
proxyProperty('realtorStateId');

return HomdnaWorkflow;

}
HomdnaWorkflowDefinition.$inject = ["PropertyDefiner"];

angular.module('HomeEditor.Models')
    .factory('HomdnaWorkflowModel', HomdnaWorkflowDefinition);

})(angular, _);
(function (angular, _) {
'use strict';
function HomeDefinition (PropertyDefiner, HomdnaMetaDataModel) {

var DEFAULT_HOME_PAYLOAD = {};

/**
 * Creates a new Home with the given payload.
 * 
 * @class Home
 * @classdesc
 * This is a wrapper object for the Home payload received from the server.<br/>
 * This wrapper object provides basic read/write access to the Home payload. 
 * 
 * @param {Object} homePayload - Payload object from server
 */
function Home(homePayload) {
    /** @todo Create a new default payload if no payload is given */
    if (!homePayload) {
        throw new Error('Need to provide a home payload object to Home constructor');
    }
    this.payload = homePayload;
    /** @todo convert activeHomdna into HomdnaMetaData object */
}
var proto = Home.prototype;


var propDef       = new PropertyDefiner(proto);
var proxyProperty = _.bind(propDef.proxyProperty, propDef);


/**
 * The Home's name
 *
 * @name Home#name
 * @type {String}
 */
proxyProperty('name');

/**
 * UUID of the MLS for this Home
 *
 * @name Home#mlsId
 * @type {String}
 */
proxyProperty('mlsId');

/**
 * The Home's street address
 *
 * @name Home#streetAddress
 * @type {String}
 */
proxyProperty('streetAddress');

/**
 * The Home's unit address
 *
 * @name Home#unitAddress
 * @type {String}
 */
proxyProperty('unitAddress');

/**
 * The Home's city
 *
 * @name Home#city
 * @type {String}
 */
proxyProperty('city');

/**
 * The Home's state
 *
 * @name Home#state
 * @type {String}
 */
proxyProperty('state');

/**
 * The Home's postal code
 *
 * @name Home#postalCode
 * @type {String}
 */
proxyProperty('postalCode');

/**
 * The Home's country
 *
 * @name Home#country
 * @type {String}
 */
proxyProperty('country');

/**
 * The Home's latitude
 *
 * @name Home#latitude
 * @type {Number}
 */
proxyProperty('latitude');

/**
 * The Home's longitude
 *
 * @name Home#longitude
 * @type {Number}
 */
proxyProperty('longitude');

/**
 * The Home's primary photo URL
 *
 * @name Home#primaryPhotoUrl
 * @type {String}
 */
proxyProperty('primaryPhotoUrl');

/**
 * The Home's primary thumbnail URL.
 *
 * @name Home#primaryThumbnailUrl
 * @type {String}
 */
proxyProperty('primaryThumbnailUrl');

/**
 * The Home's primary large thumbnail URL.
 *
 * @name Home#primaryLargeThumbnailUrl
 * @type {String}
 */
proxyProperty('primaryLargeThumbnailUrl');

/**
 * The Home's map photo URL.
 *
 * @name Home#mapPhotoUrl
 * @type {String}
 */
proxyProperty('mapPhotoUrl');

/**
 * The Home's street photo URL.
 *
 * @name Home#streetPhotoUrl
 * @type {String}
 */
proxyProperty('streetPhotoUrl');

/**
 * The Home's active homdna.
 *
 * @name Home#activeHomdna
 * @type {HomdnaMetaData}
 */
propDef.readOnlyProperty('activeHomdna', function () {
    return new HomdnaMetaDataModel(this.payload.activeHomdna);
});

return Home;

}
HomeDefinition.$inject = ["PropertyDefiner", "HomdnaMetaDataModel"];

angular.module('HomeEditor.Models')
    .factory('HomeModel', HomeDefinition);

})(angular, _);
(function (angular, _, chance) {
'use strict';

function FileModelDefinition (BaseModel) {

function FileModel (params) {
  BaseModel.call(this, params);

  // initialize own properties
  initProps.call(this);
}

// Extending the BaseModel Class
FileModel.prototype = Object.create(BaseModel.prototype);
FileModel.prototype.constructor = FileModel;
var proto = FileModel.prototype;

function initProps () {
  /**
   * The FileModel's uuid
   *
   * @name FileModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The UUID of the homdna to which this FileModel is associated.
   *
   * @name FileModel#homdnaId
   * @type {String|null}
   */
  this.set('homdnaId', this.get('homdnaId') || null);

  /**
   * The FileModel's checksum
   *
   * @name FileModel#checksum
   * @type {String}
   */
  this.set('checksum', this.get('checksum') || '');

  /**
   * The FileModel's url
   *
   * @name FileModel#url
   * @type {String}
   */
  this.set('url', this.get('url') || '');

  /**
   * The FileModel's thumbnailUrl
   *
   * @name FileModel#thumbnailUrl
   * @type {String}
   */
  this.set('thumbnailUrl', this.get('thumbnailUrl') || '');

  /**
   * The FileModel's largeThumbnailUrl
   *
   * @name FileModel#largeThumbnailUrl
   * @type {String}
   */
  this.set('largeThumbnailUrl', this.get('largeThumbnailUrl') || '');

  /**
   * The FileModel's MIME type.
   *
   * @name FileModel#mimeType
   * @type {String}
   */
  this.set('mimeType', this.get('mimeType') || '');
}

return FileModel;

}
FileModelDefinition.$inject = ["BaseModel"];

angular.module('HomeEditor.Models')
  .factory('FileModel', FileModelDefinition);

})(angular, _, chance);

(function (angular, _, chance) {
'use strict';

function DocumentModelDefinition (BaseModel, FileModel) {

function DocumentModel (params) {
  BaseModel.call(this, params);

  // initialize own properties
  initProps.call(this);
}

// Extending the BaseModel Class
DocumentModel.prototype = Object.create(BaseModel.prototype);
DocumentModel.prototype.constructor = DocumentModel;
var proto = DocumentModel.prototype;

function initProps () {
  /**
   * The DocumentModel's uuid
   *
   * @name DocumentModel#id
   * @type {String}
   */
  this.set('id', this.get('id') || chance.guid());

  /**
   * The UUID of the homdna to which this DocumentModel is associated.
   *
   * @name DocumentModel#homdnaId
   * @type {String|null}
   */
  this.set('homdnaId', this.get('homdnaId') || null);

  /**
   * The DocumentModel's documentType
   *
   * @name DocumentModel#documentType
   * @type {String}
   */
  this.set('documentType', this.get('documentType') || '');

  /**
   * The DocumentModel's document name
   *
   * @name DocumentModel#documentName
   * @type {String}
   */
  this.set('documentName', this.get('documentName') || '');

  /**
   * The DocumentModel's description
   *
   * @name DocumentModel#description
   * @type {String}
   */
  this.set('description', this.get('description') || '');

  /**
   * The DocumentModel's company
   *
   * @name DocumentModel#company
   * @type {String}
   */
  this.set('company', this.get('company') || '');

  /**
   * The DocumentModel's associated dollar amount. This is
   * used for documents that are receipts.
   *
   * @name DocumentModel#amount
   * @type {Number}
   */
  this.set('amount', this.get('amount') || 0);

  /**
   * The DocumentModel's capitalExpediture.
   *
   * @name DocumentModel#capitalExpediture
   * @type {Boolean}
   */
  this.set('capitalExpediture', this.get('capitalExpediture') || false);

  /**
   * The DocumentModel's fileIds. An array containing the uuids of files
   * associated with this document.
   *
   * @name DocumentModel#fileIds
   * @type {Array<String>}
   */
  this.set('fileIds', this.get('fileIds') || []);

  /**
   * An array of file model objects associated with the DocumentModel
   *
   * @name DocumentModel#files
   */
  this.files = [];
}

/**
 * Adds a new file to the document
 *
 * @method DocumentModel#addFile
 * @param {Object} fileParams FileModel object that will be added
 */
proto.addFile = function (fileParams) {
  var newFile = new FileModel(fileParams);
  this.files.push(newFile);
  this.get('fileIds').push(newFile.get('id'));
  return newFile;
};

/**
 * Removes the file with the given instance ID from the document
 *
 * @method DocumentModel#removeFile
 * @param {String} fileId Instance ID of the file to remove
 */
proto.removeFile = function (targetFileId) {
  _.remove(this.get('fileIds'), function (fileId) {
    return fileId === targetFileId;
  });
  _.remove(this.files, function (fileModel) {
    return fileModel.get('id') === targetFileId;
  });
};

return DocumentModel;

}
DocumentModelDefinition.$inject = ["BaseModel", "FileModel"];

angular.module('HomeEditor.Models')
  .factory('DocumentModel', DocumentModelDefinition);

})(angular, _, chance);
