import test from 'ava';
import ZipcodeSearchSimple from '../src/ZipcodeSearchSimple.js';

test('it_finds_canton_if_zipcode_is_passed_as_a_string', t => {
    let search = new ZipcodeSearchSimple();
    let result = search.findbyZipcode('1201');

    t.is(result, 'GE');
});

test('it_finds_canton_if_zipcode_is_passed_as_a_number', t => {
    let search = new ZipcodeSearchSimple();
    let result = search.findbyZipcode(1000);

    t.is(result, 'VD');
});

test('it_does_not_find_result_for_not_available_zipcode', t => {
    let search = new ZipcodeSearchSimple();
    let result = search.findbyZipcode(99999);

    t.is(result, null);
});

test('it_finds_a_canton_for_non_existent_postal_codes', t => {
    let search = new ZipcodeSearchSimple();
    let result = search.findbyZipcode(5800);

    t.is(result, 'SO');
});

test('it_finds_lichtenstein_zipcodes', t => {
    let search = new ZipcodeSearchSimple();
    let result = search.findbyZipcode(9494);

    t.is(result, 'LI');
});
