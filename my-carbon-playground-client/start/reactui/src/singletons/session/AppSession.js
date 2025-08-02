import * as AppSessionData from "./AppSessionData"

class AppSession {
    constructor() {
        if (AppSession.instance) {
            return AppSession.instance;
        }
        this.data = {}; // Example state or data


        AppSession.instance = this;
        return this;
    }


    /**
     * 
     * @returns This method complete session data for Overview
     */
    getSessionOverview() {
        return this.data;
    }

    /**
     * This method delivers a session object based on a key. It delives *undefined*, if the data could not be identified
     * @param {*} key 
     * @returns 
     */
    getObject(key) {
        let json = this.data[key];
        let obj = undefined;
        try {
            obj = JSON.parse(json);
        } catch (error) {
            obj = undefined;
        }
        return obj;
    }

    /**
     * This method deletes an a session object based on a key (this means: the values is set to *undefined*).
     * **Note:** Use AppSessionData.OBJECT_DEF.[xyz] as key 
     * @param {*} key 
     */
    deleteData(key) {
        this.data[key] = undefined;
    }

    /**
     * This method sets a key in session, which holds the object
     * @param {*} key 
     * @param {*} object 
     */
    setData(key, object) {
        let json = JSON.stringify(object);
        this.data[key] = json;
    }
}


const appSessionDataStore = new AppSession();
Object.freeze(appSessionDataStore);


export default appSessionDataStore;