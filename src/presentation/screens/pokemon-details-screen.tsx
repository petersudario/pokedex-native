import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { PokemonRepository } from "../../data/repositories/pokemon-repository";
import { PokemonService } from "../../data/services/pokemon-service";
import { FavoritesContext } from "../context/favorites-context";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetailsScreen() {
  const route: any = useRoute();
  const { pokemon } = route.params;
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const favorite = details ? isFavorite(details) : false;

  const toggleFavorite = () => {
    if (!details) return;
    if (favorite) removeFavorite(details);
    else
      addFavorite({
        id: details.id,
        name: details.name,
        image: details.sprites.other["official-artwork"].front_default,
      });
  };

  useEffect(() => {
    const loadDetails = async () => {
      const pokemonService = new PokemonService();
      const pokemonRepository = new PokemonRepository(pokemonService);
      const data = await pokemonRepository.fetchByName(pokemon.name);
      setDetails(data);
      setLoading(false);
    };

    loadDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  const types = details.types.map((t: any) => t.type.name);
  const abilities = details.abilities.map((a: any) => a.ability.name);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: details.sprites.other["official-artwork"].front_default,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>
          #{details.id} {details.name.toUpperCase()}
        </Text>

        <Text style={styles.subtitle}>Tipos:</Text>
        <View style={styles.badgesContainer}>
          {types.map((type: string) => (
            <View key={type} style={styles.badge}>
              <Text style={styles.badgeText}>{type}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>Habilidades:</Text>
        <FlatList
          data={abilities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.ability}>{item}</Text>}
        />
        <View style={{ height: 16 }} />

        <TouchableOpacity
          onPress={toggleFavorite}
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={32}
            color={favorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    alignSelf: "flex-start",
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  badge: {
    backgroundColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 4,
  },
  badgeText: {
    textTransform: "capitalize",
  },
  ability: {
    textTransform: "capitalize",
    paddingVertical: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
