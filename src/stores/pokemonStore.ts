import { defineStore } from 'pinia';
import api from '../services/api';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
  }),

  actions: {
    async fetchPokemons() {
      this.loading = true;
      try {
        const response = await api.get('/pokemon?limit=200');
        this.pokemons = response.data.results;
      } catch (error) {
        console.error('Erro ao buscar pokemons', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
