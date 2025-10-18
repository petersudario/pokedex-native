import { Pokemon } from "../../domain/models/pokemon-model";
import { ApiClient } from "../api-client";
import { PokemonService } from "../services/pokemon-service";
import { PokemonRepositoryInterface } from "./pokemon-repository-interface";

export class PokemonRepository implements PokemonRepositoryInterface {

    private pokemonService: PokemonService;

    constructor(pokemonService: PokemonService){
        this.pokemonService = pokemonService
    }

    async fetchAll(): Promise<Pokemon[]> {
        return this.pokemonService.fetchAll();
    }
}