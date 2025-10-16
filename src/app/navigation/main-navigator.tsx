import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../presentation/screens/home-screen";

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator id={null}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
