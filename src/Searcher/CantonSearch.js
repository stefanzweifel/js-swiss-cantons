import cantons from './../data/cantons.js';
import canton from './../Canton.js';

export default class {

    /**
     * Find Canton by it abbreviation
     * @param  {string} abbreviation
     * @return {Canton}
     */
    findByAppreviation(abbreviation) {
        let result = cantons.filter((value) => {
            return value.abbreviation === abbreviation.toUpperCase();
        });

        if (result.length == 0) {
            throw new Error(`No canton found for abbreviation ${abbreviation}`);
        }

        return new canton(result[0]);
    }

    findByName() {

    }

}