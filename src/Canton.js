export default class {

    constructor(data) {
        this.data = data;
        this.availableLanguages = ['de', 'fr', 'it', 'en', 'rm', 'es', 'pt'];
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

        if (this.availableLanguages.indexOf(displayLanguage) === -1) {
            throw new Error(`Language ${displayLanguage} is not supported`);
        }

        this.displayLanguage = displayLanguage;

        return this;
    }

    /**
     * Return currently active display language
     * @return {string}
     */
    getLanguage() {
        return this.displayLanguage;
    }

}
