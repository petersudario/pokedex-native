import { useEffect, useState } from "react";
import { Pokemon } from "../../domain/models/pokemon-model";
import { PokemonService } from "../../data/services/pokemon-service";
import { PokemonRepository } from "../../data/repositories/pokemon-repository";

export function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonService = new PokemonService();
      const pokemonRepository = new PokemonRepository(pokemonService);
      const data = await pokemonRepository.fetchAll();
      setPokemons(data);
      setLoading(false);
    };

    loadPokemons();
  }, []);

  return { pokemons, loading };
}
