import assert from 'node:assert/strict';
import test from 'node:test';
import { cantons, type Language } from '../src/data/cantons.ts';
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

test('name lookup is case-sensitive (unlike abbreviation lookup)', () => {
    // Documents an intentional asymmetry: abbreviations are matched
    // case-insensitively, names must match exactly.
    assert.equal(getCantonByName('Zürich')?.abbreviation, 'ZH');
    assert.equal(getCantonByName('zürich'), undefined);
});

test('returned cantons are frozen and cannot corrupt shared state', () => {
    const canton = getCantonByAbbreviation('BE');

    // Attempting to mutate a returned canton throws instead of silently
    // poisoning the module-level data for every other caller.
    assert.throws(() => {
        // biome-ignore lint/suspicious/noExplicitAny: intentionally bypassing readonly to prove the runtime freeze
        (canton as any).names.de = 'HACKED';
    }, TypeError);
    assert.throws(() => {
        // biome-ignore lint/suspicious/noExplicitAny: intentionally bypassing readonly to prove the runtime freeze
        (getAllCantons()[0] as any).abbreviation = 'XX';
    }, TypeError);

    assert.equal(getCantonByAbbreviation('BE')?.names.de, 'Bern');
    assert.equal(getAllCantons()[0]?.abbreviation, 'AG');
});

test('data integrity: 26 cantons with unique, well-formed abbreviations', () => {
    assert.equal(cantons.length, 26);

    const abbreviations = cantons.map((canton) => canton.abbreviation);
    assert.equal(new Set(abbreviations).size, 26, 'abbreviations must be unique');

    for (const abbreviation of abbreviations) {
        assert.match(abbreviation, /^[A-Z]{2}$/, `malformed abbreviation: ${abbreviation}`);
    }
});

test('data integrity: every canton has a non-empty name in all 7 languages', () => {
    const languages: Language[] = ['de', 'fr', 'it', 'en', 'rm', 'es', 'pt'];

    for (const canton of cantons) {
        assert.deepEqual(
            Object.keys(canton.names).sort(),
            [...languages].sort(),
            `${canton.abbreviation} is missing a language`
        );
        for (const language of languages) {
            assert.ok(
                canton.names[language]?.length > 0,
                `${canton.abbreviation}.${language} is empty`
            );
        }
    }
});
