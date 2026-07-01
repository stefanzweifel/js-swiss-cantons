import assert from 'node:assert/strict';
import test from 'node:test';
import Canton from '../src/Canton.js';

test('it instantiates correctly', () => {
    const data = {
        abbreviation: 'GL',
        name: {
            de: 'Glarus',
            fr: 'Glaris',
            it: 'Glarona',
            rm: 'Glaruna',
            en: 'Glaris',
        },
    };

    const instance = new Canton(data);

    assert.equal(instance.data, data);
});

test('it returns correct abbreviation', () => {
    const data = {
        abbreviation: 'GL',
        name: {
            de: 'Glarus',
            fr: 'Glaris',
            it: 'Glarona',
            rm: 'Glaruna',
            en: 'Glaris',
        },
    };

    const instance = new Canton(data);

    assert.equal(instance.getAbbreviation(), 'GL');
});

test('it returns name for default language', () => {
    const data = {
        abbreviation: 'GL',
        name: {
            de: 'Glarus',
            fr: 'Glaris',
            it: 'Glarona',
            rm: 'Glaruna',
            en: 'Glaris',
        },
    };

    const instance = new Canton(data);

    assert.equal(instance.getName(), 'Glaris');
});

test('it sets language correctly', () => {
    const instance = new Canton({});

    instance.setLanguage('de');

    assert.equal(instance.getLanguage(), 'de');
});

test('it returns correct name of canton for set language', () => {
    const data = {
        abbreviation: 'GL',
        name: {
            de: 'Glarus',
            fr: 'Glaris',
            it: 'Glarona',
            rm: 'Glaruna',
            en: 'Glaris',
            es: 'Glaris',
            pt: 'Glarus',
        },
    };

    const instance = new Canton(data);

    instance.setLanguage('de');
    assert.equal(instance.getName(), 'Glarus');

    instance.setLanguage('fr');
    assert.equal(instance.getName(), 'Glaris');

    instance.setLanguage('it');
    assert.equal(instance.getName(), 'Glarona');

    instance.setLanguage('rm');
    assert.equal(instance.getName(), 'Glaruna');

    instance.setLanguage('en');
    assert.equal(instance.getName(), 'Glaris');

    instance.setLanguage('es');
    assert.equal(instance.getName(), 'Glaris');

    instance.setLanguage('pt');
    assert.equal(instance.getName(), 'Glarus');
});

test('it throws an error if display language does not exist', () => {
    const instance = new Canton({});

    assert.throws(() => instance.setLanguage('foobar'), {
        message: 'Language foobar is not supported',
    });
});

test('it lowercases passed language', () => {
    const instance = new Canton({});
    instance.setLanguage('DE');

    assert.equal(instance.getLanguage(), 'de');
});
