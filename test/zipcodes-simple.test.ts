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

test('resolves the range boundaries', () => {
    assert.equal(findCantonByZipcode(1000), 'VD'); // first entry
    assert.equal(findCantonByZipcode(9999), 'BE'); // last resolvable zipcode
});

test('returns undefined for non-numeric input', () => {
    assert.equal(findCantonByZipcode('abc'), undefined);
    assert.equal(findCantonByZipcode(''), undefined);
    // @ts-expect-error — guarding runtime behaviour for plain-JS callers
    assert.equal(findCantonByZipcode(null), undefined);
});
