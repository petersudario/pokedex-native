import React, { createContext, useState, ReactNode } from "react";
import { Pokemon } from "../../domain/models/pokemon-model";

type FavoritesContextType = {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemon: Pokemon) => void;
  isFavorite: (pokemon: Pokemon) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => [...prev, pokemon]);
  };

  const removeFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => prev.filter((p) => p.id !== pokemon.id));
  };

  const isFavorite = (pokemon: Pokemon) => {
    return favorites.some((p) => p.id === pokemon.id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
