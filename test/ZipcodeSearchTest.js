import test from 'ava';
import ZipcodeSearch from '../src/ZipcodeSearch.js';

test('it_returns_dataset_as_object', t => {
    let search = new ZipcodeSearch();
    let result = search.getDataSet();

    t.is(typeof result, 'object');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_string', t => {
    let search = new ZipcodeSearch();
    let result = search.findbyZipcode('1201');

    t.is(result.canton, 'GE');
    t.is(result.city_name, 'Genève');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_number', t => {
    let search = new ZipcodeSearch();
    let result = search.findbyZipcode(1000);

    t.is(result.canton, 'VD');
    t.is(result.city_name, 'Lausanne 27');
});

test('it_does_not_find_result_for_not_available_zipcode', t => {
    let search = new ZipcodeSearch();
    let result = search.findbyZipcode(99999);

    t.is(result, undefined);
});

test('it_finds_lichtenstein_zipcodes', t => {
    let search = new ZipcodeSearch();
    let result = search.findbyZipcode(9494);

    t.is(result.canton, 'LI');
});
