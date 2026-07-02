import assert from 'node:assert/strict';
import test from 'node:test';
import { cantons } from '../src/data/cantons.ts';
import cantonsShort from '../src/data/cantonsShort.json' with { type: 'json' };
import zipcodes from '../src/data/zipcodes.json' with { type: 'json' };
import { findLocalityByZipcode } from '../src/zipcodes/index.ts';
import { findCantonByZipcode } from '../src/zipcodes/simple.ts';

// The zipcode datasets cover Liechtenstein (LI) too, since it shares the Swiss
// postal system. LI is intentionally NOT one of the 26 Swiss cantons, so the
// set of codes valid for a *zipcode* is the cantons plus LI.
const zipcodeCantonCodes = new Set([...cantons.map((canton) => canton.abbreviation), 'LI']);

test('every canton referenced by a zipcode is a known canton or Liechtenstein', () => {
    const localities = Object.values(zipcodes as Record<string, { canton: string }>);
    for (const { canton } of localities) {
        assert.ok(
            zipcodeCantonCodes.has(canton),
            `zipcodes.json references unknown code: ${canton}`
        );
    }
});

test('every compact-dataset entry maps to a valid, known code', () => {
    for (const [zip, index] of Object.entries(cantonsShort as Record<string, number>)) {
        const canton = findCantonByZipcode(zip);
        assert.ok(canton !== undefined, `entry ${zip} (index ${index}) did not resolve`);
        assert.ok(
            zipcodeCantonCodes.has(canton),
            `entry ${zip} resolved to unknown code: ${canton}`
        );
    }
});

test('precise and simple datasets agree on the canton for every real zipcode', () => {
    const realZipcodes = Object.keys(zipcodes as Record<string, unknown>);
    const mismatches = realZipcodes.filter(
        (zip) => findLocalityByZipcode(zip)?.canton !== findCantonByZipcode(zip)
    );

    assert.deepEqual(
        mismatches,
        [],
        `precise/simple canton disagreement on ${mismatches.length} zipcode(s)`
    );
});
