import { Pokemon } from "../../domain/models/pokemon-model";

export interface PokemonRepositoryInterface {    
    fetchAll(): Promise<Pokemon[]>;
}