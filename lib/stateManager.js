import { setGlobal } from "reactn";
let stateManager = (function () {
  let _instance;
  let _currentForm;
  let _store;

  setGlobal({});

  function _updateState(key, value) {
    setGlobal({
      [key]: value
    });
  }

  function _getState(cmp, key) {
    return cmp["global"] ? cmp["global"][key] : {};
  }

  function _getStateByKey(key) {
    return _currentForm["global"] ? _currentForm["global"][key] : {};
  }
  function _registerFormState(form, stateObject) {
    if (stateObject == undefined) stateObject = {};
    const key = form.props.name ? form.props.name : form.props.componentId;
    _updateState(key, stateObject);
    _updateState(key + "_validation", {});
    return _getState(form, key);
  }
  function _bindComponentToForm(component) {
    const key = _currentForm.props.name
      ? _currentForm.props.name
      : _currentForm.props.componentId;

    let formContent = _getState(_currentForm, key);
    formContent[component] = null;
    _updateState(key, formContent);
  }
  function _setValue(component, value) {
    const key = _currentForm.props.name
      ? _currentForm.props.name
      : _currentForm.props.componentId;
    let formContent = _getState(_currentForm, key);
    formContent[component] = value;
    _updateState(key, formContent);
  }
  function _getCurrentForm() {
    return _currentForm;
  }
  function _setDirty(component, value) {
    const key = _currentForm.props.name
      ? _currentForm.props.name
      : _currentForm.props.componentId;

    let formContent = _getState(_currentForm, key + "_validation");
    if (value) formContent[component] = value;
    else delete formContent[component];
    if (Object.keys(formContent).length > 0)
      _updateState(key + "_validation", formContent);
  }
  function _isDirty() {
    const key = _currentForm.props.name
      ? _currentForm.props.name
      : _currentForm.props.componentId;
    let formContent = _getState(_currentForm, key + "_validation");
    if (Object.keys(formContent).length > 0) return true;
    return false;
  }
  function _lastState() {
    const key = _currentForm.props.name
      ? _currentForm.props.name
      : _currentForm.props.componentId;
    return _getState(_currentForm, key);
  }
  return {
    instance: function () {
      if (!_instance) {
        _instance = this;
      }
      return _instance;
    },
    getState: _getState,
    getStateByKey: _getStateByKey,
    updateState: _updateState,
    registerFormState: _registerFormState,
    bindComponentToForm: _bindComponentToForm,
    setValue: _setValue,
    currentForm: _getCurrentForm,
    setCurrentForm: function (form) {
      _currentForm = form;
    },
    setDirty: _setDirty,
    isDirty: _isDirty,
    lastState: _lastState
  };
})();
export default stateManager;
