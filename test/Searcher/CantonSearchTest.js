import test from 'ava';
import CantonSearch from '../../src/Searcher/CantonSearch.js';

test('it finds canton by abbreviation', t => {
    let search = new CantonSearch;
    let canton = search.findByAppreviation('SH');

    t.is(canton.getAbbreviation(), 'SH');
})

test('it_throws_error_if_no_canton_can_be_found_for_abbreviation', t => {
    let search = new CantonSearch;

    const error = t.throws(() => {
        search.findByAppreviation('FOO-BAR');
    }, Error);

    t.is(error.message, 'No canton found for abbreviation FOO-BAR');
});

test('it_set_abbreviation_to_uppercase', t => {
    let search = new CantonSearch;
    let canton = search.findByAppreviation('gl');

    t.is(canton.getAbbreviation(), 'GL');
});