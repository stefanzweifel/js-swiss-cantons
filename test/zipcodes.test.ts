import assert from 'node:assert/strict';
import test from 'node:test';
import { findLocalityByZipcode } from '../src/zipcodes/index.ts';

test('finds a locality when the zipcode is a string', () => {
    const result = findLocalityByZipcode('1201');
    assert.equal(result?.canton, 'GE');
    assert.equal(result?.cityName, 'Genève');
});

test('finds a locality when the zipcode is a number', () => {
    const result = findLocalityByZipcode(1000);
    assert.equal(result?.canton, 'VD');
    assert.equal(result?.cityName, 'Lausanne 27');
});

test('exposes camelCased fields', () => {
    const result = findLocalityByZipcode(8001);
    assert.deepEqual(Object.keys(result ?? {}).sort(), [
        'canton',
        'cityName',
        'communityName',
        'zipcode',
    ]);
});

test('returns undefined for an unknown zipcode', () => {
    assert.equal(findLocalityByZipcode(99999), undefined);
});

test('finds Liechtenstein zipcodes', () => {
    assert.equal(findLocalityByZipcode(9494)?.canton, 'LI');
});
