import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../presentation/screens/home-screen";
import PokemonDetailsScreen from "../../presentation/screens/pokemon-details-screen";
import FavoritesScreen from "../../presentation/screens/favorites-screen";
import { FavoritesProvider } from "../../presentation/context/favorites-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator id={null} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator id={null} initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={PokemonDetailsScreen}
            options={{ title: "Detalhes do Pokémon" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
