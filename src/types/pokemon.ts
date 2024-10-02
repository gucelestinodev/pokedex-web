export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    types: {
      type: {
        name: string;
      };
    }[];
  }
  