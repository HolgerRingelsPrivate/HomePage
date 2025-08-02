import he from 'he'
class I18n {
    constructor() {
        if (I18n.instance) {
            return I18n.instance;
        }

        this.data = {}; 

        // Singleton-specific logic
        I18n.instance = this;
    }

    init() {

    }

    setLocaleToUse(locale) {
        this.data['defaultLocale'] = locale;
    }

    getLocaleInUse() {
        return this.data['defaultLocale'];
    }

    setLocalesInUse(locales) {
        this.data['localesInUse'] = locales;
    }

    /**
     * This method delivers a i18n value by key
     * @param {*} identifiyer 
     * @returns 
     */
    t(identifiyer) {
        let locale = null;
        let candidates = null;
        try {
            let s = this.data;
            locale = this.data['defaultLocale'];
            candidates = this.data['localesInUse'];
        } catch (error) {
            return identifiyer;            
        }
        try {
            for (let i = 0; i < candidates.val.length; i++) {
                let currentCandidate = candidates.val[i];
                if (currentCandidate.key === locale) {
                    let translationCandidates = currentCandidate.val;
                    for (let j = 0; j < translationCandidates.length; j++) {
                        let translationCandidate = translationCandidates[j];
                        if (translationCandidate.key === identifiyer) {
                            let s = he.decode(translationCandidate.val);
                            return s;
                        }
                    }
                }
            }
            return identifiyer;            
        } catch (error) {
            return identifiyer;            
        }
    }



    getAvailableLocales() {
        let locale = null;
        let candidates = null;
        try {
            let s = this.data;
            locale = this.data['defaultLocale'];
            candidates = this.data['localesInUse'];
        } catch (error) {
            return ["en"];            
        }

        let stringArray = ["en"];
        try {
            for (let i = 0; i < candidates.val.length; i++) {
                let currentLanguage = candidates.val[i].key;
                if (currentLanguage !== "en") {
                    stringArray.push(currentLanguage);
                }
            }
        } catch (error) {
            return ["en"];            
        }
        return stringArray;
    }

    static getInstance() {
        if (!I18n.instance) {
            I18n.instance = new I18n();
        }
        return I18n.instance;
    }
}

// Verwendung des Singletons
const i18n = I18n.getInstance();
Object.freeze(i18n);
export default i18n;
