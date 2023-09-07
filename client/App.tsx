import React from "react";
import { Provider } from "react-native-paper";
import theme from "./src/global/styles/theme";
import { SafeArea } from "./src/components/SafeArea";

import { Routes } from "./src/services/routes";

export default function App() {

  return (
    <Provider theme={theme}>
      <SafeArea><Routes/></SafeArea>
    </Provider>
  );
}
