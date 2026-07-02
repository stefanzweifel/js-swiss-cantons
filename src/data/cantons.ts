export type Language = 'de' | 'fr' | 'it' | 'en' | 'rm' | 'es' | 'pt';

export interface Canton {
    /** Two-letter canton abbreviation, e.g. `ZH`. */
    readonly abbreviation: string;
    /** Canton name in each supported language. */
    readonly names: Readonly<Record<Language, string>>;
}

// Freeze the data so a consumer that mutates a returned canton cannot corrupt
// this shared, module-level singleton for the rest of the process. The
// `readonly` types above give TypeScript callers the same guarantee at compile
// time; the freeze enforces it at runtime for plain-JS callers.
function deepFreeze(list: Canton[]): readonly Canton[] {
    for (const canton of list) {
        Object.freeze(canton.names);
        Object.freeze(canton);
    }
    return Object.freeze(list);
}

export const cantons: readonly Canton[] = deepFreeze([
    {
        abbreviation: 'AG',
        names: {
            de: 'Aargau',
            fr: 'Argovie',
            it: 'Argovia',
            rm: 'Argovia',
            en: 'Argovia',
            es: 'Argovia',
            pt: 'Argóvia',
        },
    },
    {
        abbreviation: 'AI',
        names: {
            de: 'Appenzell Innerrhoden',
            fr: 'Appenzell Rhodes-Intérieures',
            it: 'Appenzello Interno',
            rm: 'Appenzell dadens',
            en: 'Appenzell Inner-Rhodes',
            es: 'Appenzell Rodas Interior',
            pt: 'Appenzell Interior',
        },
    },
    {
        abbreviation: 'AR',
        names: {
            de: 'Appenzell Ausserrhoden',
            fr: 'Appenzell Rhodes-Extérieures',
            it: 'Appenzello Esterno',
            rm: 'Appenzell dador',
            en: 'Appenzell Outer-Rhodes',
            es: 'Appenzell Rodas Exterior',
            pt: 'Appenzell Exterior',
        },
    },
    {
        abbreviation: 'BE',
        names: {
            de: 'Bern',
            fr: 'Berne',
            it: 'Berna',
            rm: 'Berna',
            en: 'Berne',
            es: 'Berna',
            pt: 'Berna',
        },
    },
    {
        abbreviation: 'BL',
        names: {
            de: 'Basel-Landschaft',
            fr: 'Bâle-Campagne',
            it: 'Basilea Campagna',
            rm: 'Basilea-Champagna',
            en: 'Basel-Country',
            es: 'Basilea-Campiña',
            pt: 'Basileia-Campo',
        },
    },
    {
        abbreviation: 'BS',
        names: {
            de: 'Basel-Stadt',
            fr: 'Bâle-Ville',
            it: 'Basilea Città',
            rm: 'Basilea-Citad',
            en: 'Basel-City',
            es: 'Basilea-Ciudad',
            pt: 'Basileia-Cidade',
        },
    },
    {
        abbreviation: 'FR',
        names: {
            de: 'Freiburg',
            fr: 'Fribourg',
            it: 'Friburgo',
            rm: 'Friburg',
            en: 'Friburg',
            es: 'Friburgo',
            pt: 'Friburgo',
        },
    },
    {
        abbreviation: 'GE',
        names: {
            de: 'Genf',
            fr: 'Genève',
            it: 'Ginevra',
            rm: 'Genevra',
            en: 'Geneva',
            es: 'Ginebra',
            pt: 'Genebra',
        },
    },
    {
        abbreviation: 'GL',
        names: {
            de: 'Glarus',
            fr: 'Glaris',
            it: 'Glarona',
            rm: 'Glaruna',
            en: 'Glaris',
            es: 'Glaris',
            pt: 'Glarus',
        },
    },
    {
        abbreviation: 'GR',
        names: {
            de: 'Graubünden',
            fr: 'Grisons',
            it: 'Grigioni',
            rm: 'Grischun',
            en: 'Grisons',
            es: 'Grisones',
            pt: 'Grisões',
        },
    },
    {
        abbreviation: 'JU',
        names: {
            de: 'Jura',
            fr: 'Jura',
            it: 'Giura',
            rm: 'Giura',
            en: 'Jura',
            es: 'Jura',
            pt: 'Jura',
        },
    },
    {
        abbreviation: 'LU',
        names: {
            de: 'Luzern',
            fr: 'Lucerne',
            it: 'Lucerna',
            rm: 'Lucerna',
            en: 'Lucerne',
            es: 'Lucerna',
            pt: 'Lucerna',
        },
    },
    {
        abbreviation: 'NE',
        names: {
            de: 'Neuenburg',
            fr: 'Neuchâtel',
            it: 'Neuchâtel',
            rm: 'Neuchâtel',
            en: 'Neuchâtel',
            es: 'Neuchâtel',
            pt: 'Neuchâtel',
        },
    },
    {
        abbreviation: 'NW',
        names: {
            de: 'Nidwalden',
            fr: 'Nidwald',
            it: 'Nidvaldo',
            rm: 'Sutsilvania',
            en: 'Nidwald',
            es: 'Nidwalden',
            pt: 'Nidwalden',
        },
    },
    {
        abbreviation: 'OW',
        names: {
            de: 'Obwalden',
            fr: 'Obwald',
            it: 'Obvaldo',
            rm: 'Sursilvania',
            en: 'Obwald',
            es: 'Obwalden',
            pt: 'Obwalden',
        },
    },
    {
        abbreviation: 'SG',
        names: {
            de: 'St. Gallen',
            fr: 'Saint-Gall',
            it: 'San Gallo',
            rm: 'Son Gagl',
            en: 'St. Gall',
            es: 'San Galo',
            pt: 'São Galo',
        },
    },
    {
        abbreviation: 'SH',
        names: {
            de: 'Schaffhausen',
            fr: 'Schaffhouse',
            it: 'Sciaffusa',
            rm: 'Schaffusa',
            en: 'Schaffhouse',
            es: 'Schaffhausen',
            pt: 'Schaffhausen',
        },
    },
    {
        abbreviation: 'SO',
        names: {
            de: 'Solothurn',
            fr: 'Soleure',
            it: 'Soletta',
            rm: 'Soloturn',
            en: 'Soleure',
            es: 'Soleura',
            pt: 'Soleura',
        },
    },
    {
        abbreviation: 'SZ',
        names: {
            de: 'Schwyz',
            fr: 'Schwytz',
            it: 'Svitto',
            rm: 'Sviz',
            en: 'Schwyz',
            es: 'Schwyz',
            pt: 'Schwyz',
        },
    },
    {
        abbreviation: 'TG',
        names: {
            de: 'Thurgau',
            fr: 'Thurgovie',
            it: 'Turgovia',
            rm: 'Turgovia',
            en: 'Thurgovia',
            es: 'Turgovia',
            pt: 'Turgóvia',
        },
    },
    {
        abbreviation: 'TI',
        names: {
            de: 'Tessin',
            fr: 'Tessin',
            it: 'Ticino',
            rm: 'Tessin',
            en: 'Ticino',
            es: 'Tesino',
            pt: 'Ticino',
        },
    },
    {
        abbreviation: 'UR',
        names: {
            de: 'Uri',
            fr: 'Uri',
            it: 'Uri',
            rm: 'Uri',
            en: 'Uri',
            es: 'Uri',
            pt: 'Uri',
        },
    },
    {
        abbreviation: 'VD',
        names: {
            de: 'Waadt',
            fr: 'Vaud',
            it: 'Vaud',
            rm: 'Vad',
            en: 'Vaud',
            es: 'Vaud',
            pt: 'Vaud',
        },
    },
    {
        abbreviation: 'VS',
        names: {
            de: 'Wallis',
            fr: 'Valais',
            it: 'Vallese',
            rm: 'Vallais',
            en: 'Valais',
            es: 'Valais',
            pt: 'Valais',
        },
    },
    {
        abbreviation: 'ZG',
        names: {
            de: 'Zug',
            fr: 'Zoug',
            it: 'Zugo',
            rm: 'Zug',
            en: 'Zug',
            es: 'Zug',
            pt: 'Zug',
        },
    },
    {
        abbreviation: 'ZH',
        names: {
            de: 'Zürich',
            fr: 'Zurich',
            it: 'Zurigo',
            rm: 'Turitg',
            en: 'Zurich',
            es: 'Zúrich',
            pt: 'Zurique',
        },
    },
]);
