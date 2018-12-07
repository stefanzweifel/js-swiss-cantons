import zipcodes from './data/zipcodes.json';

export default class ZipcodeSearch {
  constructor() {
    this.data = zipcodes;
  }

  /**
   * Find a locality by zipcode
   * @param  {string | number} zipcode
   * @return {mixed} Returns an object or null if no result was found
   */
  findbyZipcode(zipcode) {
    const result = this.data[zipcode];

    return result;
  }

  getDataSet() {
    return this.data;
  }
}
