import assert from 'node:assert/strict';
import test from 'node:test';
import { findCantonByZipcode } from '../src/zipcodes/simple.ts';

test('finds a canton when the zipcode is a string', () => {
    assert.equal(findCantonByZipcode('1201'), 'GE');
});

test('finds a canton when the zipcode is a number', () => {
    assert.equal(findCantonByZipcode(1000), 'VD');
});

test('returns undefined for out-of-range zipcodes', () => {
    assert.equal(findCantonByZipcode(99999), undefined);
    assert.equal(findCantonByZipcode(999), undefined);
});

test('returns a canton for non-existent postal codes within range', () => {
    assert.equal(findCantonByZipcode(5800), 'SO');
});

test('finds Liechtenstein zipcodes', () => {
    assert.equal(findCantonByZipcode(9494), 'LI');
});
