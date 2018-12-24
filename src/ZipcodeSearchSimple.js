import zipcodes from './data/cantonsShort.json';

// Cantons are stored as a number in the dataset, if the same canton appears
// multiple times after each other for a range of zipcodes, only the first
// zipcode is kept
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
  'LI'
];

export default class ZipcodeSearchSimple {
  constructor() {
    this.data = zipcodes;
  }

  /**
   * Find a locality by zipcode
   * @param  {string | number} zipcode
   * @return {mixed} Returns a short form canton if found
   */
  findbyZipcode(zipcode) {
    let result;

    if (zipcode > 9999 || zipcode < 1000) {
      return null;
    }

    Object.keys(zipcodes).some(code => {
      if (zipcode >= code) {
        result = code;
        return false;
      }
      return true;
    });

    const cantonIndex = zipcodes[result];

    const canton = CANTONS[cantonIndex];
    return canton;
  }
}
