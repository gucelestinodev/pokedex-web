<template>
  <router-link :to="{ name: 'PokemonDetail', params: { id: getPokemonId(pokemon.url) } }" class="pokemon-card">
    <img :src="getPokemonImage(pokemon.url)" :alt="pokemon.name" class="pokemon-image" />
    <h3 class="pokemon-name">{{ pokemon.name }}</h3>
    <p class="pokemon-number">#{{ getPokemonId(pokemon.url) }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  pokemon: Object,
});

const getPokemonId = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const getPokemonImage = (url) => {
  const id = getPokemonId(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
</script>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  text-decoration: none;
  color: inherit;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-name {
  font-size: 1.2rem;
  margin: 10px 0 5px;
  color: #333;
}

.pokemon-number {
  color: #999;
  margin-bottom: 5px;
}
</style>
