import CantonSearch from './Searcher/CantonSearch.js';

export default class {

    /**
     * Find Canton by its abbreviation
     * @param  {string} abbreviation
     * @return {Canton}
     */
    getByAbbreviation(abbreviation) {
        let search = new CantonSearch;
        return search.findByAbbreviation(abbreviation);
    }

    /**
     * Find Canton by its name
     * @param  {string} name
     * @return {Canton}
     */
    getByName(name) {
        let search = new CantonSearch;
        return search.findByName(name);
    }

    /**
     * Find Canton by its name, abbreviation or other property
     * @param  {string} value
     * @return {Canton}
     */
    getByAnything(value) {
        let search = new CantonSearch;

        try {
            return search.findByAbbreviation(value);
        }
        catch (e) {
            return search.findByName(value);
        }
    }
}
