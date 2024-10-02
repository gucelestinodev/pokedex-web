import { ref } from 'vue';
import api from '../services/api';

export function usePokemon() {
  const pokemons = ref([]);
  const loading = ref(false);

  const fetchPokemons = async () => {
    loading.value = true;
    try {
      const response = await api.get('/pokemon?limit=20');
      pokemons.value = response.data.results;
    } catch (error) {
      console.error('Erro ao buscar pokemons', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    pokemons,
    loading,
    fetchPokemons,
  };
}
