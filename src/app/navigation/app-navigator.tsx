import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainNavigator } from "./main-navigator";
const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
        <MainNavigator/>
    </NavigationContainer>
  );
}
