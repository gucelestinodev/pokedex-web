<template>
  <div class="pokemon-card">
    <!-- Usamos a função `getPokemonImage` para construir o URL da imagem -->
    <img :src="getPokemonImage(pokemon.url)" :alt="pokemon.name" class="pokemon-image" />
    <h3 class="pokemon-name">{{ pokemon.name }}</h3>
    <!-- Opcional: você pode exibir o número do Pokémon, extraindo-o da URL -->
    <p class="pokemon-number">#{{ getPokemonId(pokemon.url) }}</p>
  </div>
</template>

<script setup>
defineProps({
  pokemon: Object,
});

// Função para extrair o ID do Pokémon a partir da URL
const getPokemonId = (url) => {
  // Extraímos o número que está no final da URL
  const parts = url.split('/');
  return parts[parts.length - 2];
};

// Função para construir o URL da imagem do Pokémon
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
