(function (_) {
'use strict';

describe('Utility: PropertyDefiner', function () {
    var PropertyDefiner;

    beforeEach(module('HomeEditor.Utils'));
    beforeEach(inject(function ($injector) {
        PropertyDefiner = $injector.get('PropertyDefiner');
    }));

    describe('constructor', function () {
        it('throws an error if no argument is passed in', function () {
            expect(function () {
                new PropertyDefiner();
            }).toThrow();
        });

        it('throws an error if the first argument is not an object', function () {
            expect(function () {
                new PropertyDefiner(1);
            }).toThrow();
        });

        it('succeeds if the first argument is an object', function () {
            expect(function () {
                new PropertyDefiner({});
            }).not.toThrow();
        });
    });

    describe('method', function () {
        var targetObject, propDef;
        beforeEach(function () {
            targetObject = {};
            propDef = new PropertyDefiner(targetObject);
        });

        describe('property', function () {
            var getSet;

            beforeEach(function () {
                getSet = {
                    getter : function () { return 5; },
                    setter : function () {}
                };
            });

            it('defines the property on the target object', function () {
                expect(targetObject.hello).toBeUndefined();
                propDef.property('hello', getSet.getter, getSet.setter);
                expect(targetObject.hello).toBeDefined();
            });

            it('calls the getter function when the property is being read', function () {
                spyOn(getSet, 'getter');

                propDef.property('hello', getSet.getter, getSet.setter);

                expect(getSet.getter).not.toHaveBeenCalled();
                var temp = targetObject.hello;
                expect(getSet.getter).toHaveBeenCalled();
            });

            it('calls the setter function when the property is being set', function () {
                spyOn(getSet, 'setter');

                propDef.property('hello', getSet.getter, getSet.setter);

                expect(getSet.setter).not.toHaveBeenCalled();
                targetObject.hello = 5;
                expect(getSet.setter).toHaveBeenCalled();
            });
        });

        describe('readOnlyProperty', function () {
            var getSet;

            beforeEach(function () {
                getSet = {
                    getter : function () { return 5; },
                    setter : function () {}
                };
            });

            it('defines the property on the target object', function (){
                expect(targetObject.hello).toBeUndefined();
                propDef.readOnlyProperty('hello', getSet.getter);
                expect(targetObject.hello).toBeDefined();
            });

            it('calls the getter function when the property is being read', function () {
                spyOn(getSet, 'getter');

                propDef.readOnlyProperty('hello', getSet.getter);
                expect(getSet.getter).not.toHaveBeenCalled();
                var temp = targetObject.hello;
                expect(getSet.getter).toHaveBeenCalled();
            });

            it('throws an error if the property is being set', function () {
                propDef.readOnlyProperty('hello', getSet.getter);

                expect(function () {
                    targetObject.hello = 5;
                }).toThrow();
            });
        });

        describe('proxyProperty', function () {
            var sourceObject;
            beforeEach(function () {
                sourceObject = { hello: 5 };
                targetObject.payload = sourceObject;
            });

            it('defines the property', function () {
                expect(targetObject.hello).not.toBeDefined();
                propDef.proxyProperty('hello');
                expect(targetObject.hello).toBeDefined();
            });

            it('defines a property that returns the value referenced by the source property', function () {
                sourceObject.hello = 5;
                propDef.proxyProperty('hello');
                expect(targetObject.hello).toEqual(sourceObject.hello);
                sourceObject.hello = {};
                expect(targetObject.hello).toEqual(sourceObject.hello);
            });

            it('defines a property such that assigning the property changes the value referenced by the source property', function () {
                sourceObject.hello = 5;
                propDef.proxyProperty('hello');
                expect(sourceObject.hello).toEqual(5);
                targetObject.hello = 'foo';
                expect(sourceObject.hello).toEqual('foo');
            });
        });
    });
});


})(_);