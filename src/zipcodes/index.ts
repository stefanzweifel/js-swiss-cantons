import zipcodes from '../data/zipcodes.json' with { type: 'json' };

interface RawLocality {
    city_name: string;
    zipcode: number;
    community_name: string;
    canton: string;
}

/** A Swiss locality resolved from a zipcode. */
export interface Locality {
    zipcode: number;
    cityName: string;
    communityName: string;
    /** Two-letter canton abbreviation, e.g. `ZH`. */
    canton: string;
}

const data = zipcodes as Record<string, RawLocality>;

/**
 * Resolve the precise locality for a Swiss zipcode.
 *
 * @example
 * findLocalityByZipcode(8001)?.canton // 'ZH'
 *
 * @returns the locality, or `undefined` if the zipcode is unknown.
 */
export function findLocalityByZipcode(zipcode: string | number): Locality | undefined {
    const raw = data[String(zipcode)];

    if (raw === undefined) {
        return undefined;
    }

    return {
        zipcode: raw.zipcode,
        cityName: raw.city_name,
        communityName: raw.community_name,
        canton: raw.canton,
    };
}
