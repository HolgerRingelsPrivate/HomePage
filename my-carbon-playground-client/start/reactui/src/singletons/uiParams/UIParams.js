import he from 'he'
class UIParams {
    constructor() {
        if (UIParams.instance) {
            return UIParams.instance;
        }

        this.data = {}; 

        // Singleton-specific logic
        UIParams.instance = this;
    }

    init() {

    }

    setUiParams(uiParams) {
        this.data['uiParams'] = uiParams;
    }

    getUiParams() {
        return this.data['uiParams'];
    }

    static getInstance() {
        if (!UIParams.instance) {
            UIParams.instance = new UIParams();
        }
        return UIParams.instance;
    }
}

// Verwendung des Singletons
const uiParams = UIParams.getInstance();
Object.freeze(uiParams);
export default uiParams;
