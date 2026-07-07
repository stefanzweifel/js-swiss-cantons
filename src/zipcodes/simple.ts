import cantonsShort from '../data/cantonsShort.json' with { type: 'json' };

// The compact dataset (cantonsShort.json) maps a zipcode to a *canton index* —
// a position in the CANTONS array below — instead of repeating the two-letter
// string thousands of times. That indirection is the first size win.
//
// The second size win is range compression: only the FIRST zipcode of each
// run of consecutive zipcodes belonging to the same canton is stored. So a
// contiguous block like 8001..8108 (all Zürich) collapses to a single
// { "8001": 25 } entry. To resolve an arbitrary zipcode we therefore look up
// the nearest stored zipcode at or below it — the start of the range it falls
// into — and read that entry's canton.
//
// Example slice of the dataset (key -> index -> canton):
//   "8001": 25  -> ZH   (Zürich range begins here)
//   "8109": 0   -> AG   (a small Aargau pocket begins)
//   "8112": 25  -> ZH   (back to Zürich)
//   "8200": 16  -> SH   (Schaffhausen begins)
// A lookup of 8050 has no exact entry, so it resolves to the nearest lower
// start (8001) and returns ZH.
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
    // Accept both '8001' and 8001; anything that isn't a Swiss zipcode
    // (NaN, or outside the 1000–9999 four-digit range) has no answer.
    const zip = Number(zipcode);

    if (Number.isNaN(zip) || zip < 1000 || zip > 9999) {
        return undefined;
    }

    // Walk the stored range-starts to find the largest one that is <= zip:
    // that is the beginning of the range our zipcode falls into.
    //
    // This relies on the keys being visited in ascending numeric order. That
    // is guaranteed here (not just luck): JavaScript always iterates integer
    // index-like string keys in ascending order, and every key in this dataset
    // is such a key. Because they are sorted, we keep overwriting `matched`
    // while entries are still <= zip and can stop (`break`) at the first entry
    // that overshoots — no need to scan the rest.
    let matched: string | undefined;
    for (const code of Object.keys(data)) {
        if (zip >= Number(code)) {
            matched = code;
        } else {
            break;
        }
    }

    // Only possible if `data` were empty; the range guard above already
    // rejects zipcodes below the very first entry (1000).
    if (matched === undefined) {
        return undefined;
    }

    // matched -> canton index -> two-letter canton.
    return CANTONS[data[matched]];
}
