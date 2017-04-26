import test from 'ava';
import Canton from '../src/Canton.js';

test('it instatiates correctly', t => {

    let data = {
        "abbreviation": "GL",
        "name": {
            "de": "Glarus",
            "fr": "Glaris",
            "it": "Glarona",
            "rm": "Glaruna",
            "en": "Glaris"
        }
    };

    let instance = new Canton(data);

    t.is(instance.data, data);

});

test('it returns correct abbreviation', t => {

    let data = {
        "abbreviation": "GL",
        "name": {
            "de": "Glarus",
            "fr": "Glaris",
            "it": "Glarona",
            "rm": "Glaruna",
            "en": "Glaris"
        }
    };

    let instance = new Canton(data);

    t.is(instance.getAbbreviation(), 'GL');

});

test('it returns name for default language', t => {

    let data = {
        "abbreviation": "GL",
        "name": {
            "de": "Glarus",
            "fr": "Glaris",
            "it": "Glarona",
            "rm": "Glaruna",
            "en": "Glaris"
        }
    };

    let instance = new Canton(data);

    t.is(instance.getName(), 'Glaris');

});

test('it sets language correctly', t => {

    let instance = new Canton({});

    instance.setLanguage('de');

    t.is(instance.getLanguage(), 'de');

})

test('it returns correct name of canton for set language', t => {

     let data = {
        "abbreviation": "GL",
        "name": {
            "de": "Glarus",
            "fr": "Glaris",
            "it": "Glarona",
            "rm": "Glaruna",
            "en": "Glaris"
        }
    };

    let instance = new Canton(data);
    instance.setLanguage('de');

    t.is(instance.getName(), 'Glarus');

})

test('it throws an error if display language does not exist', t => {

    let instance = new Canton({});

    const error = t.throws(() => {
        instance.setLanguage('foobar');
    }, Error);

    t.is(error.message, 'Language foobar is not supported');

});

test('it lowercases passed language', t => {

    let instance = new Canton({});
    instance.setLanguage('DE');

    t.is(instance.getLanguage(), 'de');

})