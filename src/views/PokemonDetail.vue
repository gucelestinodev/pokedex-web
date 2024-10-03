<template>
    <div class="pokemon-detail-container" v-if="pokemon">
      <h1>{{ pokemon.name }}</h1>
      <img :src="getPokemonImage(pokemon.id)" :alt="pokemon.name" class="pokemon-image" />
      <h2>Estatísticas:</h2>
      <ul>
        <li>HP: {{ pokemon.stats.hp }}</li>
        <li>Attack: {{ pokemon.stats.attack }}</li>
        <li>Defense: {{ pokemon.stats.defense }}</li>
        <li>Special Attack: {{ pokemon.stats.special_attack }}</li>
        <li>Special Defense: {{ pokemon.stats.special_defense }}</li>
        <li>Speed: {{ pokemon.stats.speed }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { usePokemon } from "../composables/usePokemon";
  
  const route = useRoute();
  const { fetchPokemonDetails, pokemonDetails } = usePokemon();
  const pokemon = ref(null);
  
  onMounted(async () => {
    const id = route.params.id;
    await fetchPokemonDetails(id);
    pokemon.value = pokemonDetails.value;
  });
  
  const getPokemonImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  console.log(pokemon);
  </script>
  
  <style scoped>
  .pokemon-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .pokemon-image {
    width: 200px;
    height: 200px;
  }
  </style>
  