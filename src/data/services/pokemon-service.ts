// src/data/services/ApiService.ts
import axios from "axios";
import { Pokemon } from "../../domain/models/pokemon-model";
import { ApiClient } from "../api-client";

export class PokemonService {
  
async fetchAll(): Promise<Pokemon[]> {
    const response = await ApiClient.get("/pokemon?limit=20");

    return response.data.results.map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
      //repositorio com as imagens, chatin de achar
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
  }
}
