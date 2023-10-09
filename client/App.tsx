import React from "react";
import { Provider } from "react-native-paper";
import theme from "./src/global/styles/theme";
import { SafeArea } from "./src/components/SafeArea";

import { Routes } from "./src/services/routes";
import { AuthProvider } from "./src/services/context/AuthContext";

export default function App() {

  return (
    <AuthProvider>
      <Provider theme={theme}>
        <SafeArea>
          <Routes />
        </SafeArea>
      </Provider>
    </AuthProvider>
  );
}
