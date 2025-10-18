// src/data/services/ApiService.ts
import axios from "axios";
import { Pokemon } from "../../domain/models/pokemon-model";
import { ApiClient } from "../api-client";

export class PokemonService {
  async fetchAll(offset = 0, limit = 20): Promise<Pokemon[]> {
    const response = await ApiClient.get(`pokemon?offset=${offset}&limit=${limit}`);
    return response.data.results.map((item: any, index: number) => {
      const id = offset + index + 1;
      return {
        id,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
  }
}
