import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Register } from "../../screens/Register";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ForgotPasswordConfirm: undefined;
};

export function Routes() {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
}
