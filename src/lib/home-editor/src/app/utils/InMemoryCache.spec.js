(function () {
'use strict';

describe('Utility: InMemoryCache', function () {
    var InMemoryCache,  
        memoryCache;

    beforeEach(module('HomeEditor.Utils'));
    beforeEach(inject(function ($injector) {
        InMemoryCache = $injector.get('InMemoryCache');
    }));

    describe('get', function () {
        it('returns undefined if key has not been set', function () {
            var mockKey = 'test';
            expect(InMemoryCache.get(mockKey)).toBeUndefined();
        });
    });

    describe('set', function () {
        it('throws an error if less than 2 arguments are given', function () {
            expect(function () {
                InMemoryCache.set(1);
            }).toThrow();
        });
        it('sets a key to the value', function () {
            var mockKey = 'testKey',
                mockValue = {};
            expect(InMemoryCache.get(mockKey)).toBeUndefined();
            InMemoryCache.set(mockKey, mockValue);
            expect(InMemoryCache.get(mockKey)).toEqual(mockValue);
        });
    });

    describe('clear', function () {
        it('clears out the cache', function () {
            var mockKey = 'testKey',
                mockValue = {};
            InMemoryCache.set(mockKey, mockValue);
            expect(InMemoryCache.get(mockKey)).not.toBeUndefined();
            InMemoryCache.clear();
            expect(InMemoryCache.get(mockKey)).toBeUndefined();
        });
    });
});
})();