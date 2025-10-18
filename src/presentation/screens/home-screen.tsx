import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { usePokemons } from "../hooks/use-pokemon";

export default function HomeScreen() {
  const { pokemons, loading, loadingMore, loadMore, hasMore } = usePokemons();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
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
  );
}

const styles = StyleSheet.create({
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
