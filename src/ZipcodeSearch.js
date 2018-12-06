import zipcodes from './data/zipcodes.json';

export default class ZipcodeSearch {
  constructor() {
    this.data = zipcodes;
  }

  /**
   * Find Canton by its name, abbreviation or other property
   * @param  {string | number} zipcode
   * @return {Canton} mixed Returns an object or null if no result was found
   */
  findbyZipcode(zipcode) {
    const result = this.data[zipcode];

    return result;
  }

  getDataSet() {
    return this.data;
  }
}
