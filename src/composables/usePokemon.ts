import { ref } from 'vue';
import api from '../services/api';
import { Pokemon, PokemonDetails, PokemonStats } from '../types/pokemon'; // Importe a interface correta

export function usePokemon() {
  const pokemons = ref<Pokemon[]>([]);
  const loading = ref(false);
  const pokemonDetails = ref<PokemonDetails | null>(null);

  const fetchPokemons = async () => {
    loading.value = true;
    try {
      const response = await api.get('/pokemon?limit=30');
      pokemons.value = response.data.results;
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
