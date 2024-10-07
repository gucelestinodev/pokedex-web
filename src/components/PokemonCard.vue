<template>
  <div @click="selectPokemon(pokemon.id)" class="pokemon-card">
    <div class="img-card" :style="{ backgroundColor: pokemon.color }">
      <div class="overlay"></div>
      <img
        :src="getPokemonImage(pokemon.id)"
        :alt="pokemon.name"
        class="pokemon-image"
      />
    </div>
    <p class="pokemon-number">N°{{ pokemon.id }}</p>
    <p class="pokemon-name">{{ pokemon.name.toUpperCase() }}</p>
    <div v-if="translatedEggGroups.length" class="pokemon-groups-container">
      <div
        v-for="(group, index) in translatedEggGroups"
        :key="index"
        class="pokemon-group"
        :style="{ backgroundColor: group.color }"
      >
        {{ group.text.toUpperCase() }}
      </div>
    </div>
    <p v-else class="pokemon-groups-text">Sem Espécie</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { eggGroupTranslations } from "../constants/constants";
const props = defineProps({
  pokemon: Object,
});
const emit = defineEmits(["selectPokemon"]);

const selectPokemon = (id) => {
  emit("selectPokemon", id);
};

const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const translateEggGroups = (eggGroups) => {
  return (
    eggGroups?.map((group) => {
      const translation = eggGroupTranslations[group];
      return translation ? translation : { text: group, color: "#ccc" };
    }) || []
  );
};

const translatedEggGroups = computed(() =>
  translateEggGroups(props.pokemon?.egg_groups)
);
</script>


<style scoped>
.pokemon-groups-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  z-index: 2;
}

.pokemon-group {
  color: #000000;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  min-width: 60px;
}

.pokemon-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.img-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 2px;
  border-radius: 8px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  z-index: 1;
}

.pokemon-image {
  position: relative;
  z-index: 2;
}

.pokemon-card:hover {
  transform: scale(1.1);
}

.pokemon-name {
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 0px 0px 6px 0px;
  font-weight: 700;
}

.pokemon-number {
  font-size: 14px;
  color: #a1a1a1;
  text-align: center;
  margin: 6px 0px 0px 0px;
  font-weight: 600;
}
</style>
