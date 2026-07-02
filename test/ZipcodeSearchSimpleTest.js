import assert from 'node:assert/strict';
import test from 'node:test';
import ZipcodeSearchSimple from '../src/ZipcodeSearchSimple.js';

test('it_finds_canton_if_zipcode_is_passed_as_a_string', () => {
    const search = new ZipcodeSearchSimple();
    const result = search.findbyZipcode('1201');

    assert.equal(result, 'GE');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_number', () => {
    const search = new ZipcodeSearchSimple();
    const result = search.findbyZipcode(1000);

    assert.equal(result, 'VD');
});

test('it_does_not_find_result_for_not_available_zipcode', () => {
    const search = new ZipcodeSearchSimple();
    const result = search.findbyZipcode(99999);

    assert.equal(result, null);
});

test('it_finds_a_canton_for_non_existent_postal_codes', () => {
    const search = new ZipcodeSearchSimple();
    const result = search.findbyZipcode(5800);

    assert.equal(result, 'SO');
});

test('it_finds_lichtenstein_zipcodes', () => {
    const search = new ZipcodeSearchSimple();
    const result = search.findbyZipcode(9494);

    assert.equal(result, 'LI');
});
