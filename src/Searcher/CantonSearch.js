import cantons from './../data/cantons.js';
import canton from './../Canton.js';

export default class {

    /**
     * Find Canton by it abbreviation
     * @param  {string} abbreviation
     * @return {Canton}
     */
    findByAbbreviation(abbreviation) {
        let result = cantons.filter((value) => {
            return value.abbreviation === abbreviation.toUpperCase();
        });

        if (result.length == 0) {
            throw new Error(`No canton found for abbreviation ${abbreviation}`);
        }

        return new canton(result[0]);
    }

    /**
     * Find Canton by one of its names
     * @param  {string} name
     * @return {Canton}
     */
    findByName(name) {

        let result = cantons.filter((value) => {
            return Object.values(value.name).indexOf(name) !== -1;
        });

        if (result.length == 0) {
            throw new Error(`No canton found for name ${name}`);
        }

        return new canton(result[0]);
    }

}