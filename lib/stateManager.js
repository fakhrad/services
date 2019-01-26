class stateManager {
    constructor(store) {
        if (!stateManager.instance) {
            stateManager.instance = this;
            this.store = store;
        }
        return stateManager.instance;
    }
    get appState() {
        if (this.store != null) return this.store.getState().appReducer;
        return null;
    }

    updateState(key, value) {
        this.store.dispatch({
            type: "default",
            key: key,
            value: value
        });
    }
}

export default stateManager;