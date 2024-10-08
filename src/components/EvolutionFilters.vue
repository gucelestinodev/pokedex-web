<template>
  <div class="evolucoes">
    <div class="evolucoes-checkbox" @click="$emit('toggle-filter', 'total')">
      <img
        :src="filters.total ? checkedPokeball : uncheckedPokeball"
        alt="Pokébola"
        class="pokebola-icon"
      />
      <p class="filter-text">Todos</p>
    </div>
    <div
      class="evolucoes-checkbox"
      @click="$emit('toggle-filter', 'primeiraEvolucao')"
    >
      <img
        :src="filters.primeiraEvolucao ? checkedPokeball : uncheckedPokeball"
        alt="Pokébola"
        class="pokebola-icon"
      />
      <p class="filter-text">1°</p>
    </div>
    <div
      class="evolucoes-checkbox"
      @click="$emit('toggle-filter', 'segundaEvolucao')"
    >
      <img
        :src="filters.segundaEvolucao ? checkedPokeball : uncheckedPokeball"
        alt="Pokébola"
        class="pokebola-icon"
      />
      <p class="filter-text">2°</p>
    </div>
    <div
      class="evolucoes-checkbox"
      @click="$emit('toggle-filter', 'ultimaEvolucao')"
    >
      <img
        :src="filters.ultimaEvolucao ? checkedPokeball : uncheckedPokeball"
        alt="Pokébola"
        class="pokebola-icon"
      />
      <p class="filter-text">3°</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import checkedPokeball from "../assets/pokebola_checked.svg";
import uncheckedPokeball from "../assets/pokebola_deschecked.svg";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.evolucoes {
  display: flex;
  flex-direction: row;
  background-color: #2d70b7;
  align-items: center;
  border-radius: 8px;
  padding: 4px 0px;
  justify-content: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.evolucoes-checkbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
}

.pokebola-icon {
  width: 22.5px;
  height: 22.5px;
  vertical-align: middle;
  cursor: pointer;
}

.filter-text {
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  font-weight: 500;
}
</style>
