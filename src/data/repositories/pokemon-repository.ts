import { Pokemon } from "../../domain/models/pokemon-model";
import { PokemonService } from "../services/pokemon-service";
import { PokemonRepositoryInterface } from "./pokemon-repository-interface";

export class PokemonRepository implements PokemonRepositoryInterface {

    private pokemonService: PokemonService;

    constructor(pokemonService: PokemonService){
        this.pokemonService = pokemonService
    }

    async fetchAll(offset = 0, limit = 20): Promise<Pokemon[]> {
        return this.pokemonService.fetchAll(offset, limit);
    }

    async fetchByName(name: string): Promise<any> {
        return this.pokemonService.fetchByName(name);
    }
}