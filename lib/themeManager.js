// set app theme
import { EventRegister } from "react-native-event-listeners";
let currentTheme;
let currentThemeName;
setAppTheme = theme => {
  if (theme != undefined) {
    currentTheme = theme;
    EventRegister.emit("onThemeLoaded", theme);
  }
};
setAppThemeName = themeName => {
  if (themeName != undefined) {
    currentThemeName = themeName;
    EventRegister.emit("onThemeChanged", themeName);
  }
};
getAppTheme = () => {
  return currentTheme;
};
getAppThemeName = () => {
  return currentThemeName;
};
