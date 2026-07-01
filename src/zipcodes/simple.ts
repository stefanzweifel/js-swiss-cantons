import cantonsShort from '../data/cantonsShort.json' with { type: 'json' };

// Cantons are stored as an index into this array in the dataset. When the same
// canton spans a range of consecutive zipcodes, only the first zipcode of the
// range is kept, which is why lookups scan for the nearest lower zipcode.
const CANTONS = [
    'AG',
    'AR',
    'AI',
    'BL',
    'BS',
    'BE',
    'FR',
    'GE',
    'GL',
    'GR',
    'JU',
    'LU',
    'NE',
    'NW',
    'OW',
    'SG',
    'SH',
    'SZ',
    'SO',
    'TG',
    'TI',
    'UR',
    'VD',
    'VS',
    'ZG',
    'ZH',
    'LI',
] as const;

const data = cantonsShort as Record<string, number>;

/**
 * Resolve the canton for a Swiss zipcode using the compact dataset.
 *
 * Trades precision for size: it returns a canton for any zipcode in the
 * 1000–9999 range, including gaps that do not map to a real locality.
 *
 * @example
 * findCantonByZipcode(8001) // 'ZH'
 *
 * @returns the two-letter canton, or `undefined` if the zipcode is out of range.
 */
export function findCantonByZipcode(zipcode: string | number): string | undefined {
    const zip = Number(zipcode);

    if (Number.isNaN(zip) || zip < 1000 || zip > 9999) {
        return undefined;
    }

    let matched: string | undefined;
    for (const code of Object.keys(data)) {
        if (zip >= Number(code)) {
            matched = code;
        } else {
            break;
        }
    }

    if (matched === undefined) {
        return undefined;
    }

    return CANTONS[data[matched]];
}
