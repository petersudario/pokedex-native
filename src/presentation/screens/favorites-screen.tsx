import React, { useContext } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FavoritesContext } from "../context/favorites-context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);
  const navigation = useNavigation<any>();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Nenhum Pokémon favoritado ainda.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <FlatList
        data={favorites}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 8, textTransform: "capitalize", fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
