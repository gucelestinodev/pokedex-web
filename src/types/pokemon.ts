export interface Pokemon {
  id: string;
  name: string;
  url: string;
  color: string;
  egg_groups: string[];
  types: string[];
  stats: PokemonStats;
  img: string;
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
