class apiManager {
  constructor() {
    if (!apiManager.instance) {
      apiManager.instance = this;
      this._apiList = {};
    }
    return apiManager.instance;
  }

  registerApis(apiList) {
    for (const key in apiList) {
      this.registerApi(key, apiList[key]);
    }
  }

  get apiList() {
    return this._apiList;
  }

  registerApi(key, apiInstance) {
    if (!this._apiList.hasOwnProperty(key)) {
      this._apiList[key] = apiInstance;
    }
  }

  get(api, func) {
    return this._apiList[api][func];
  }
}

export default apiManager;
