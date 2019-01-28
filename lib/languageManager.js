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
let translate = {};

const languageManager = {
    addToTranslation(cmp, translation) {
        return new Promise((resolve, reject) => {
            if (cmp != undefined) {
                let cmpTranslation = cmp.props.config.translation;
                if (cmpTranslation != undefined && translation != undefined) {
                    for (let key in cmpTranslation) {
                        if (!translation.hasOwnProperty(key)) {
                            translation[key] = cmpTranslation[key];
                        } else {
                            for (const item in cmpTranslation[key]) {
                                translation[key][item] = cmpTranslation[key][item];
                            }
                        }
                    }
                }
                if (!translate.hasOwnProperty(cmp.props.name)) {
                    translate[cmp.props.name] = {};
                }
                for (let key in translation) {
                    if (!translate[cmp.props.name].hasOwnProperty(key)) {
                        // check if exsits or not in the translate store
                        translate[cmp.props.name][key] = translation[key];
                    } else {
                        // if yes so then merge with old
                        let oldObj = translate[cmp.props.name][key];
                        let newObj = translation[key];
                        let mergeObj = { ...oldObj, ...newObj };
                        translate[cmp.props.name][key] = mergeObj;
                    }
                }
            }
            resolve("done");
        });
    },
    doTranslate(cmp, key) {
        if (
            translate[cmp.props.name] != undefined &&
            currentLanguage != undefined &&
            translate[cmp.props.name][currentLanguage.name]
        )
            return translate[cmp.props.name][currentLanguage.name][key];
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
