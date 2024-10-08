<template>
    <div class="tipo-dropdown" @click.self="$emit('close-dropdown')">
      <button @click="$emit('toggle-dropdown')" class="dropdown-button">
        {{ selectedType ? TypeTranslations[selectedType].text : "Tipo Pokemon" }}
      </button>
      <div v-if="dropdownOpen" class="dropdown-content">
        <div class="tipo-pokemon" @click="$emit('clear-type-filter')">
          <label>Todos</label>
        </div>
        <div
          v-for="(translation, type) in TypeTranslations"
          :key="type"
          class="tipo-pokemon"
          @click="$emit('toggle-type-filter', type)"
        >
          <label>{{ translation.text }}</label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { TypeTranslations } from '../constants/constants';
  
  const props = defineProps({
    dropdownOpen: Boolean,
    selectedType: String,
  });
  </script>
  
  <style scoped>
  
.tipo-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #2d70b7;
  color: #ffffff;
  padding: 12px 32px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  cursor: pointer;
}

.dropdown-content .tipo-pokemon {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content .tipo-pokemon:hover {
  background-color: #f1f1f1;
}

@media (max-width: 950px) {
  .tipo-dropdown {
    margin-bottom: 12px;
  }
}
  </style>
  