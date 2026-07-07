import { type Canton, cantons, type Language } from './data/cantons.ts';

export type { Canton, Language };

/**
 * Find a canton by its two-letter abbreviation (case-insensitive).
 *
 * @example
 * getCantonByAbbreviation('sh')?.names.de // 'Schaffhausen'
 */
export function getCantonByAbbreviation(abbreviation: string): Canton | undefined {
    const target = abbreviation.toUpperCase();
    return cantons.find((canton) => canton.abbreviation === target);
}

/**
 * Find a canton by one of its names, in any supported language (exact match).
 *
 * @example
 * getCantonByName('Schaffhouse')?.abbreviation // 'SH'
 */
export function getCantonByName(name: string): Canton | undefined {
    return cantons.find((canton) => Object.values(canton.names).includes(name));
}

/**
 * Find a canton by its abbreviation or, failing that, by any of its names.
 *
 * @example
 * getCanton('ZH')?.names.en        // 'Zurich'
 * getCanton('Schaffhouse')?.abbreviation // 'SH'
 */
export function getCanton(value: string): Canton | undefined {
    return getCantonByAbbreviation(value) ?? getCantonByName(value);
}

/** Return every canton. */
export function getAllCantons(): Canton[] {
    return [...cantons];
}
