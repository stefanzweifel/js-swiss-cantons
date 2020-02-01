import test from 'ava';
import CantonSearch from '../../src/Searcher/CantonSearch.js';

test('it_finds_canton_by_abbreviation', t => {
    let search = new CantonSearch();
    let canton = search.findByAbbreviation('SH');

    t.is(canton.getAbbreviation(), 'SH');
});

test('it_throws_error_if_no_canton_can_be_found_for_abbreviation', t => {
    let search = new CantonSearch();

    const error = t.throws(
        () => {
            search.findByAbbreviation('FOO-BAR');
        },
        { instanceOf: Error }
    );

    t.is(error.message, 'No canton found for abbreviation FOO-BAR');
});

test('it_set_abbreviation_to_uppercase', t => {
    let search = new CantonSearch();
    let canton = search.findByAbbreviation('gl');

    t.is(canton.getAbbreviation(), 'GL');
});

test('it_finds_canton_by_name', t => {
    let search = new CantonSearch();
    let canton = search.findByName('Zürich');
    t.is(canton.getAbbreviation(), 'ZH');

    canton = search.findByName('Glaris');
    t.is(canton.getAbbreviation(), 'GL');

    canton = search.findByName('Appenzell Rhodes-Intérieures');
    t.is(canton.getAbbreviation(), 'AI');
});

test('it_throws_error_if_no_canton_can_be_found_for_name', t => {
    let search = new CantonSearch();

    const error = t.throws(
        () => {
            search.findByName('FOO-BAR');
        },
        { instanceOf: Error }
    );

    t.is(error.message, 'No canton found for name FOO-BAR');
});
