import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Register } from "../../screens/Register";
import { HomePage } from "../../screens/Home";
import { Profile } from "../../screens/Profile";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomePage: undefined;
  Profile: undefined;
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
        <Screen name="HomePage" component={HomePage} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
}
