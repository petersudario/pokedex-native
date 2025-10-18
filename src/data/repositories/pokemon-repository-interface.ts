import { Pokemon } from "../../domain/models/pokemon-model";

export interface PokemonRepositoryInterface {
    fetchAll(offset?: number, limit?: number): Promise<Pokemon[]>;
}