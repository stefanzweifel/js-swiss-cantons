import assert from 'node:assert/strict';
import test from 'node:test';
import CantonManager from '../src/CantonManager.js';

test('it_returns_canton_by_abbreviation', () => {
    const manager = new CantonManager();
    const result = manager.getByAbbreviation('NW');

    assert.equal(result.getAbbreviation(), 'NW');
    assert.equal(result.setLanguage('de').getName(), 'Nidwalden');
});

test('it_returns_canton_by_one_if_its_names', () => {
    const manager = new CantonManager();
    const result = manager.getByName('Schaffusa');

    assert.equal(result.getAbbreviation(), 'SH');
    assert.equal(result.setLanguage('fr').getName(), 'Schaffhouse');
});

test('it_finds_canton_through_a_single_method', () => {
    const manager = new CantonManager();
    const result = manager.getByAnything('Schaffusa');

    assert.equal(result.getAbbreviation(), 'SH');
    assert.equal(result.setLanguage('fr').getName(), 'Schaffhouse');
});
