import React from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import Route from "./src/route/Route";
import store from "./src/redux/Store/store";
import FlashMessage from "react-native-flash-message";

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <Route />
      <FlashMessage position={"top"} />
      <StatusBar hidden />
    </Provider>
  );
};
export default App;
