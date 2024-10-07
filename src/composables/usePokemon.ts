import { ref, Ref } from 'vue';
import api from '../services/api';
import { Pokemon, PokemonDetails, PokemonStats } from '../types/pokemon';

export function usePokemon(amoutStartQuery: Ref<string>, amountContQuery: Ref<string>) {
  const pokemons = ref<Pokemon[]>([]);
  const loading = ref(false);
  const pokemonDetails = ref<PokemonDetails | null>(null);

  const fetchPokemons = async () => {
    loading.value = true;
    try {
      const offset = parseInt(amoutStartQuery.value) || 0;
      const limit = parseInt(amountContQuery.value) || 151;

      const response = await api.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonList = response.data.results;

      const detailedPokemons = await Promise.all(
        pokemonList.map(async (pokemon: any) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();

          // Fetch data from /pokemon-species/{id}
          const speciesResponse = await api.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          const speciesData = speciesResponse.data;

          // Fetch data from /pokemon/{id} for stats and types
          const pokemonResponse = await api.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const pokemonData = pokemonResponse.data;

          return {
            id: id,
            name: pokemon.name,
            url: pokemon.url,
            color: speciesData.color.name,
            egg_groups: speciesData.egg_groups.map((group: any) => group.name),
            types: pokemonData.types.map((t: any) => t.type.name), // Extracting types from /pokemon/{id}
            stats: {
              hp: pokemonData.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
              attack: pokemonData.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
              defense: pokemonData.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
              special_attack: pokemonData.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
              special_defense: pokemonData.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
              speed: pokemonData.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
            },
          };
        })
      );

      pokemons.value = detailedPokemons;
    } catch (error) {
      console.error('Erro ao buscar pokemons', error);
    } finally {
      loading.value = false;
    }
  };

  const fetchPokemonDetails = async (id: number) => {
    try {
      const response = await api.get(`/pokemon/${id}`);
      const data = response.data;

      const stats: PokemonStats = {
        hp: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
        attack: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
        defense: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
        special_attack: data.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
        special_defense: data.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
        speed: data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
      };

      pokemonDetails.value = {
        id: data.id,
        name: data.name,
        stats: stats,
        types: data.types,
      };
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon', error);
    }
  };

  return {
    pokemons,
    loading,
    fetchPokemons,
    pokemonDetails,
    fetchPokemonDetails,
  };
}
