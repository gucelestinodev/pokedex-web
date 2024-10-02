<template>
  <div class="pokedex-container">
    <!-- Título e Subtítulo -->
    <header class="header">
      <h1 class="title">Pokédex</h1>
      <h2 class="subtitle">Descubra todos os Pokémon</h2>
    </header>

    <!-- Barra de Busca -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquise por nome ou número..."
        class="search-input"
      />
      <button @click="searchPokemon" class="search-button">Buscar</button>
    </div>

    <!-- Cards de Pokémon -->
    <div class="pokemon-cards">
      <PokemonCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { onMounted } from "vue";
import { usePokemon } from "../composables/usePokemon";

const { pokemons, loading, fetchPokemons } = usePokemon();
const searchQuery = ref("");

const searchPokemon = () => {
  console.log(`Buscando por: ${searchQuery.value}`);
};

onMounted(() => {
  fetchPokemons();
});
</script>

<style scoped>
.pokedex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
}

.title {
  font-size: 3rem;
  margin: 0;
  color: #333;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.search-input {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 300px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #ffcb05;
  color: #2a75bb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ffde59;
}

.pokemon-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.header{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
