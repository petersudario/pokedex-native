import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../presentation/screens/home-screen";
import PokemonDetailsScreen from "../../presentation/screens/pokemon-details-screen";

const Stack = createNativeStackNavigator();

export function AppNavigator() {

  return (
    <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={PokemonDetailsScreen} options={{ title: "Detalhes do Pokémon" }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
