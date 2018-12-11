import zipcodes from './data/cantonsShort.json';

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
    const result = this.data[zipcode];
    const canton = CANTONS.indexOf(result);

    return canton || null;
  }
}
