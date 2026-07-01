import assert from 'node:assert/strict';
import test from 'node:test';
import {
    getAllCantons,
    getCanton,
    getCantonByAbbreviation,
    getCantonByName,
} from '../src/index.ts';

test('getCantonByAbbreviation finds a canton (case-insensitive)', () => {
    assert.equal(getCantonByAbbreviation('NW')?.abbreviation, 'NW');
    assert.equal(getCantonByAbbreviation('nw')?.names.de, 'Nidwalden');
});

test('getCantonByName matches any language variant', () => {
    assert.equal(getCantonByName('Schaffusa')?.abbreviation, 'SH');
    assert.equal(getCantonByName('Zürich')?.abbreviation, 'ZH');
    assert.equal(getCantonByName('Appenzell Rhodes-Intérieures')?.abbreviation, 'AI');
});

test('getCanton resolves by abbreviation or name', () => {
    assert.equal(getCanton('SH')?.abbreviation, 'SH');
    assert.equal(getCanton('Schaffusa')?.names.fr, 'Schaffhouse');
});

test('lookups return undefined when nothing matches', () => {
    assert.equal(getCantonByAbbreviation('FOO-BAR'), undefined);
    assert.equal(getCantonByName('FOO-BAR'), undefined);
    assert.equal(getCanton('FOO-BAR'), undefined);
});

test('getAllCantons returns all 26 cantons as a fresh array', () => {
    const all = getAllCantons();
    assert.equal(all.length, 26);

    // Mutating the returned array must not affect internal state.
    all.pop();
    assert.equal(getAllCantons().length, 26);
});

test('canton names expose every supported language', () => {
    assert.deepEqual(getCantonByAbbreviation('GL')?.names, {
        de: 'Glarus',
        fr: 'Glaris',
        it: 'Glarona',
        rm: 'Glaruna',
        en: 'Glaris',
        es: 'Glaris',
        pt: 'Glarus',
    });
});
