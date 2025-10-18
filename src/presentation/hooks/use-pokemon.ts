import { useEffect, useState, useCallback } from "react";
import { Pokemon } from "../../domain/models/pokemon-model";
import { PokemonService } from "../../data/services/pokemon-service";
import { PokemonRepository } from "../../data/repositories/pokemon-repository";

export function usePokemons(limit: number = 20) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pokemonService = new PokemonService();
  const pokemonRepository = new PokemonRepository(pokemonService);

  const fetchPokemons = useCallback(
    async (append = false, newOffset = 0) => {
      try {
        if (append) setLoadingMore(true);
        else setLoading(true);

        const data = await pokemonRepository.fetchAll(newOffset, limit);

        if (data.length < limit) setHasMore(false);

        setPokemons((prev) => (append ? [...prev, ...data] : data));
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchPokemons(false, 0);
  }, []);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchPokemons(true, newOffset);
  };

  return { pokemons, loading, loadingMore, loadMore, hasMore };
}

