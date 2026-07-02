import assert from 'node:assert/strict';
import test from 'node:test';
import ZipcodeSearch from '../src/ZipcodeSearch.js';

test('it_returns_dataset_as_object', () => {
    const search = new ZipcodeSearch();
    const result = search.getDataSet();

    assert.equal(typeof result, 'object');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_string', () => {
    const search = new ZipcodeSearch();
    const result = search.findbyZipcode('1201');

    assert.equal(result.canton, 'GE');
    assert.equal(result.city_name, 'Genève');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_number', () => {
    const search = new ZipcodeSearch();
    const result = search.findbyZipcode(1000);

    assert.equal(result.canton, 'VD');
    assert.equal(result.city_name, 'Lausanne 27');
});

test('it_does_not_find_result_for_not_available_zipcode', () => {
    const search = new ZipcodeSearch();
    const result = search.findbyZipcode(99999);

    assert.equal(result, undefined);
});

test('it_finds_lichtenstein_zipcodes', () => {
    const search = new ZipcodeSearch();
    const result = search.findbyZipcode(9494);

    assert.equal(result.canton, 'LI');
});
