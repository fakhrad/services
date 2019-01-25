import { EventRegister } from "react-native-event-listeners";
let currentLanguage;
let languages = {
  fa: {
    title: "فارسی",
    direction: "rtl",
    name: "fa"
  },
  en: {
    title: "English",
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
    return translate[currentLanguage.name][key];
  },
  setLanguage(langName) {
    if (langName != undefined) {
      currentLanguage = languages[langName];
      EventRegister.emit("onLanguageChanged", currentLanguage);
    }
  },
  getCurrentLanguage() {
    return currentLanguage;
  },
  getCurrentLayout() {
    return currentLanguage.direction;
  }
};
export default languageManager;
