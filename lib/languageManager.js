import { EventRegister } from "react-native-event-listeners";
let currentLanguage;
let languages = {
  fa: {
    direction: "rtl",
    name: "fa"
  },
  en: {
    name: "en",
    direction: "ltr"
  }
};
let translate = {
  fa: {},
  en: {}
};

const languageManager = {
  addToTranslation(translation) {
    return new Promise((resolve, reject) => {
      for (let key in translation) {
        if (!translate.hasOwnProperty(key)) {
          // check if exsits or not in the translate store
          translate[key] = translation[key];
        } else {
          // if yes so then merge with old
          let oldObj = translate[key];
          let newObj = translation[key];
          let mergeObj = { ...oldObj, ...newObj };
          translate[key] = mergeObj;
        }
      }
      resolve("done");
    });
  },
  doTranslate(key) {
    return translate[appConfig.getLang()][key];
  },
  setLanguage(lang) {
    if (lang != undefined) {
      currentLanguage = languages[lang];
      EventRegister.emit("onLanguageChanged", currentLanguage);
    }
  },
  getCurrentLanguage() {
    return currentLanguage;
  }
};
export default languageManager;
