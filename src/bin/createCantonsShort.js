// TO BE REMOVED

var fs = require('fs');
var cants = require('./../data/zipcodesSimple.json');

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
  LI: 'Liechtenstein'
};

const shortCantons = Object.keys(CANTONS);

const main = () => {
  let obj = {};
  Object.keys(cants).forEach((key, index) => {
    let prevKey = '';
    if (index > 0) {
      prevKey = Object.keys(cants)[index - 1];
    }

    if (cants[key] !== cants[prevKey]) {
      obj[key] = shortCantons.indexOf(cants[key]);
    }
  });

  fs.writeFileSync('./cantonsShort.json', JSON.stringify(obj));
};

main();
