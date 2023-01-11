import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme";

import store from "./redux/config/configStore";
import { Provider } from "react-redux";

export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log('isDark: ', isDark);
  return (
    // 기동 : 다크모드 추가
    <Provider store={store}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
