import CantonSearch from './Searcher/CantonSearch.js';

export default class {
    /**
     * Find Canton by its abbreviation
     * @param  {string} abbreviation
     * @return {Canton}
     */
    getByAbbreviation(abbreviation) {
        const search = new CantonSearch();
        return search.findByAbbreviation(abbreviation);
    }

    /**
     * Find Canton by its name
     * @param  {string} name
     * @return {Canton}
     */
    getByName(name) {
        const search = new CantonSearch();
        return search.findByName(name);
    }

    /**
     * Find Canton by its name, abbreviation or other property
     * @param  {string} value
     * @return {Canton}
     */
    getByAnything(value) {
        const search = new CantonSearch();

        try {
            return search.findByAbbreviation(value);
        } catch {
            return search.findByName(value);
        }
    }
}
