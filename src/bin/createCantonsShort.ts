// Dev-only script: regenerates src/data/cantonsShort.json from
// src/data/zipcodesSimple.json. Not part of the published package.
// Run with: node src/bin/createCantonsShort.ts
import { writeFileSync } from 'node:fs';
import zipcodesSimple from '../data/zipcodesSimple.json' with { type: 'json' };

// Abbreviation -> full name. Only the key order matters here: it defines the
// numeric index each canton abbreviation is compressed to.
const CANTONS = {
    AG: 'Aargau',
    AR: 'Appenzell Ausserrhoden',
    AI: 'Appenzell Innerrhoden',
    BL: 'Basel-Land',
    BS: 'Basel-Stadt',
    BE: 'Bern',
    FR: 'Fribourg',
    GE: 'Genève',
    GL: 'Glarus',
    GR: 'Graubünden',
    JU: 'Jura',
    LU: 'Luzern',
    NE: 'Neuchâtel',
    NW: 'Nidwalden',
    OW: 'Obwalden',
    SG: 'St. Gallen',
    SH: 'Schaffhausen',
    SZ: 'Schwyz',
    SO: 'Solothurn',
    TG: 'Thurgau',
    TI: 'Ticino',
    UR: 'Uri',
    VD: 'Vaud',
    VS: 'Valais',
    ZG: 'Zug',
    ZH: 'Zürich',
    LI: 'Liechtenstein',
};

const shortCantons = Object.keys(CANTONS);
const source = zipcodesSimple as Record<string, string>;
const keys = Object.keys(source);

const output: Record<string, number> = {};
keys.forEach((key, index) => {
    const prevKey = index > 0 ? keys[index - 1] : '';
    if (source[key] !== source[prevKey]) {
        output[key] = shortCantons.indexOf(source[key]);
    }
});

writeFileSync(new URL('../data/cantonsShort.json', import.meta.url), JSON.stringify(output));
