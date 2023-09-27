import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import { NavigationContainer } from "@react-navigation/native";

import { Register } from "../../screens/Register";
import { HomePage } from "../../screens/Home";
import { Profile } from "../../screens/Profile";
import { HomeAdmin } from "../../screens/HomeAdmin";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { myAccount } from "../requests/User/MyAccount";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomePage: undefined;
  HomeAdmin: undefined;
  Profile: undefined;
};

export function Routes() {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  const { isSignedIn, setIsSignedIn, user, setUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await myAccount();
        if (!userData) {
          setIsSignedIn(false);
        } else {
          setIsSignedIn(true);
          setUser(userData);
        }
      } catch (err: any) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (isSignedIn) {
    if (user.role == "user") {
      return (
        <NavigationContainer>
          <Navigator
            initialRouteName="HomePage"
            screenOptions={{ headerShown: false }}
          >
            <Screen name="HomePage" component={HomePage} />
            <Screen name="Profile" component={Profile} />
          </Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Navigator
            initialRouteName="HomeAdmin"
            screenOptions={{ headerShown: false }}
          >
            <Screen name="HomeAdmin" component={HomeAdmin} />
            <Screen name="Profile" component={Profile} />
          </Navigator>
        </NavigationContainer>
      );
    }
  }

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
