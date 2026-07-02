import assert from 'node:assert/strict';
import test from 'node:test';
import CantonSearch from '../../src/Searcher/CantonSearch.js';

test('it_finds_canton_by_abbreviation', () => {
    const search = new CantonSearch();
    const canton = search.findByAbbreviation('SH');

    assert.equal(canton.getAbbreviation(), 'SH');
});

test('it_throws_error_if_no_canton_can_be_found_for_abbreviation', () => {
    const search = new CantonSearch();

    assert.throws(() => search.findByAbbreviation('FOO-BAR'), {
        message: 'No canton found for abbreviation FOO-BAR',
    });
});

test('it_set_abbreviation_to_uppercase', () => {
    const search = new CantonSearch();
    const canton = search.findByAbbreviation('gl');

    assert.equal(canton.getAbbreviation(), 'GL');
});

test('it_finds_canton_by_name', () => {
    const search = new CantonSearch();
    let canton = search.findByName('Zürich');
    assert.equal(canton.getAbbreviation(), 'ZH');

    canton = search.findByName('Glaris');
    assert.equal(canton.getAbbreviation(), 'GL');

    canton = search.findByName('Appenzell Rhodes-Intérieures');
    assert.equal(canton.getAbbreviation(), 'AI');
});

test('it_throws_error_if_no_canton_can_be_found_for_name', () => {
    const search = new CantonSearch();

    assert.throws(() => search.findByName('FOO-BAR'), {
        message: 'No canton found for name FOO-BAR',
    });
});
