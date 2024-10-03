export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  stats: PokemonStats;
  types: {
    type: {
      name: string;
    };
  }[];
}
