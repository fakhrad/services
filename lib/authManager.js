import { EventRegister } from "react-native-event-listeners";
import Config from "react-native-config";
import storageManager from "./storageManager";
import stateManager from "./stateManager";
import apiManager from "./apiManager";

class authManager {
  constructor(callback) {
    if (!authManager.instance) {
      this.isAuthenticated = false;
      this.checkAuthentication(callback);
      authManager.instance = this;
    }
    return authManager.instance;
  }

  logout() {
    storageManager.removeItem("userInfo");
    EventRegister.emit("onLogout");
  }
  getUserInfo(userInfo) {
    const getUserInfo = apiManager.instance.get(
      "authentication",
      "getUserInfo"
    );
    if (getUserInfo) {
      getUserInfo().call(userInfo);
    }
  }

  checkAuthentication(callback) {
    if (this.isAuthenticated) {
      return this.currentUser;
    } else {
      storageManager
        .getItem("userInfo")
        .then(userInfo => {
          if (userInfo != null) {
            this.currentUser = userInfo;
            this.isAuthenticated = true;
            this.getUserInfo(userInfo);
          }
          if (callback) callback();
        })
        .catch(error => {
          if (callback) callback();
        });
    }
  }

  set currentUser(value) {
    if (value.avatar == null || value.avatar.indexOf("null") != -1) {
      value.avatar =
        "https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png";
    } else {
      var avatarUrl = Config.BASE_URL + value.avatar;
      value["avatar"] = avatarUrl;
    }

    // cheking name and last name in userinfo
    // var name = value.first_name != null ? value.first_name : "";
    // var lastName =
    //   value.last_name != null ? value.last_name : "";
    // var fullName =
    //   (name + lastName).length > 0
    //     ? name + " " + lastName
    //     : translate.t("FULL_NAME");

    // value.fullName = fullName;

    // cheking address in userinfo
    // var address =
    //   value.address == undefined || value.address.length == 0
    //     ? translate.t("EMPTY_ADDRESS")
    //     : value.address;
    // value.address = address;

    // checking city
    // var city =
    //   value.city == null
    //     ? {
    //       name: {
    //         [appConfig.getLang()]: translate.t(
    //           "PROFILE_SETTINGS_EMPTY_CITY"
    //         )
    //       }
    //     }
    //     : value.city;
    // value.city = city;
    // checking notification property
    var notify = value.notification == undefined ? true : value.notification;
    value.notification = notify;

    storageManager.setItem("userInfo", value);
    stateManager.instance().updateState("userInfo", value);
  }

  get currentUser() {
    return stateManager.instance().getStateByKey("userInfo");
  }
}

export default authManager;
