import test from 'ava';
import CantonManager from '../src/CantonManager.js';

test('it_returns_canton_by_abbreviation', t => {
    let manager = new CantonManager();
    let result = manager.getByAbbreviation('NW');

    t.is(result.getAbbreviation(), 'NW');
    t.is(result.setLanguage('de').getName(), 'Nidwalden');
});

test('it_returns_canton_by_one_if_its_names', t => {
    let manager = new CantonManager();
    let result = manager.getByName('Schaffusa');

    t.is(result.getAbbreviation(), 'SH');
    t.is(result.setLanguage('fr').getName(), 'Schaffhouse');
});

test('it_finds_canton_through_a_single_method', t => {
    let manager = new CantonManager();
    let result = manager.getByAnything('Schaffusa');

    t.is(result.getAbbreviation(), 'SH');
    t.is(result.setLanguage('fr').getName(), 'Schaffhouse');
});
