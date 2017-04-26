export default class {

    constructor(data) {
        this.data = data;
        this.availableLanguages = ['de', 'fr', 'it', 'en', 'rm'];
        this.displayLanguage = 'en';
    }

    /**
     * Return the Canton Abbreviation
     * @return {stirng}
     */
    getAbbreviation() {
        return this.data.abbreviation;
    }

    /**
     * Return Canton Name in defined display language
     * @return {string}
     */
    getName() {
        return this.data.name[this.displayLanguage];
    }

    /**
     * Set display language
     * @param {string} displayLanguage
     */
    setLanguage(displayLanguage) {
        displayLanguage = displayLanguage.toLowerCase();

        if (this.availableLanguages.indexOf(displayLanguage)) {
            throw new Error(`Language ${displayLanguage} is not supported`);
        }

        this.displayLanguage = displayLanguage;
    }

    /**
     * Return currently active display language
     * @return {string}
     */
    getLanguage() {
        return this.displayLanguage;
    }

}