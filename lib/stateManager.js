class stateManager {
    constructor(store) {
        if (!stateManager.instance) {
            stateManager.instance = this;
            this.store = store;
            this.currentForm = {};
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

    bindComponentToForm(component) {
        this.store.dispatch({
            type: "default",
            key: this.currentForm.props.name,
            value: {
                ...value,
                component
            }
        });
    }
    get currentForm() {
        return this.currentForm;
    }
    registerFormState(form) {
        this.store.dispatch({
            type: "default",
            key: form.props.name,
            value: {
                isValidForm: false
            }
        });
        this.currentForm = form;
        return this.appState[form.props.name];
    }
}

export default stateManager;
