class stateManager {
  constructor(store) {
    if (!stateManager.instance) {
      stateManager.instance = this;
      this.store = store;
      this._currentForm = {};
    }
    return stateManager.instance;
  }
  get states() {
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

  dispatch(key, value) {
    this.store.dispatch({
      type: "default",
      key: key,
      value: value
    });
  }
  registerFormState(form, stateObject) {
    if (stateObject == undefined) stateObject = {};
    this.dispatch(form.props.name, stateObject);
    this.dispatch(form.props.name + "_validation", {});
    this._currentForm = form;
    return this.states[this._currentForm.props.name];
  }
  bindComponentToForm(component) {
    let formContent = this.states[this._currentForm.props.name];
    formContent[component] = null;
    this.dispatch(this._currentForm.props.name, formContent);
  }
  setValue(component, value) {
    let formContent = this.states[this._currentForm.props.name];
    formContent[component] = value;
    this.dispatch(this._currentForm.props.name, formContent);
  }
  get currentForm() {
    return this._currentForm;
  }
  setDirty(component, value) {
    let formContent = this.states[this._currentForm.props.name + "_validation"];
    if (value) formContent[component] = value;
    else delete formContent[component];
    if (Object.keys(formContent).length > 0)
      this.dispatch(this._currentForm.props.name + "_validation", formContent);
  }
  isDirty() {
    let formContent = this.states[this._currentForm.props.name + "_validation"];
    if (Object.keys(formContent).length > 0) return true;
    return false;
  }
  get lastState() {
    return this.states[this._currentForm.props.name];
  }
}

export default stateManager;
