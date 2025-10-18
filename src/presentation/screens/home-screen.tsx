import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { usePokemons } from "../hooks/use-pokemon";
import { useNavigation } from "@react-navigation/native";
import { PokemonRepository } from "../../data/repositories/pokemon-repository";
import { PokemonService } from "../../data/services/pokemon-service";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { pokemons, loading, loadingMore, loadMore, hasMore } = usePokemons();
  const navigation: any = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setSearchLoading(true);
    setSearchError(null);

    try {
      const pokemonService = new PokemonService();
      const pokemonRepository = new PokemonRepository(pokemonService);
      const data = await pokemonRepository.fetchByName(
        searchText.toLowerCase()
      );

      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      };

      navigation.navigate("Details", { pokemon });
    } catch (error) {
      setSearchError("Pokémon não encontrado.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome ou número do Pokémon"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {searchLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {searchError && (
        <View style={styles.center}>
          <Text style={{ color: "red" }}>{searchError}</Text>
        </View>
      )}

      {!searchLoading && !searchError && (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Details", { pokemon: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            hasMore ? (
              <View style={styles.footer}>
                {loadingMore ? (
                  <ActivityIndicator size="small" color="#888" />
                ) : (
                  <TouchableOpacity style={styles.button} onPress={loadMore}>
                    <Text style={styles.buttonText}>Carregar mais</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text style={styles.endText}>Todos os Pokémons carregados!</Text>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    marginTop: 8,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  endText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "#666",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
