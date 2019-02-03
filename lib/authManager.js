import storageManager from "./storageManager";
import stateManager from "./stateManager";

class authManager {
    constructor() {
        if (!authManager.instance) {
            this.isAuthenticated = false;
            this.checkAuthentication();
            authManager.instance = this;
        }
        return authManager.instance;
    }

    checkAuthentication() {
        if (this.isAuthenticated) {
            return this.currentUser;
        } else {
            storageManager
                .getItem("userInfo")
                .then(userInfo => {
                    if (userInfo != null) {
                        this.currentUser = userInfo;
                        this.isAuthenticated = true;
                        return userInfo;
                    }
                })
                .catch(error => { });
        }
    }

    set currentUser(value) {
        stateManager.instance.updateState("userInfo", value);
    }

    get currentUser() {
        return stateManager.instance.states.userInfo;
    }
}

export default authManager;
