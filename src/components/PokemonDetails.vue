<template>
    <div class="pokes-details" v-if="pokemon">
      <p class="pokes-details-title">{{ pokemon?.name?.toUpperCase() }}</p>
      <img
        class="pokes-details-img"
        :src="pokemon?.img"
        :alt="pokemon?.name"
      />
      <div class="pokes-details-info">
        <p class="pokes-details-text">
          <strong>HP:</strong> {{ pokemon?.stats?.hp }}
        </p>
        <p class="pokes-details-text">
          <strong>Ataque:</strong> {{ pokemon?.stats?.attack }}
        </p>
      </div>
      <div class="pokes-details-info">
        <p class="pokes-details-text">
          <strong>Defesa:</strong> {{ pokemon?.stats?.defense }}
        </p>
        <p class="pokes-details-text">
          <strong>Velocidade:</strong> {{ pokemon?.stats?.speed }}
        </p>
      </div>
      <div class="pokes-details-info">
        <p class="pokes-details-text">
          <strong>Ataque Especial:</strong> {{ pokemon?.stats?.special_attack }}
        </p>
        <p class="pokes-details-text">
          <strong>Defesa Especial:</strong> {{ pokemon?.stats?.special_defense }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    pokemon: Object
  });
  </script>
  
  <style scoped>
  .pokes-details {
    display: flex;
    flex-direction: column;
    border: 3px solid #2d70b7;
    padding: 16px;
    border-radius: 12px;
    align-items: center;
    margin-left: 8px;
  }
  
  .pokes-details-img {
    max-width: 200px;
  }
  
  .pokes-details-info {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #2d70b7;
    padding: 6px;
    margin-top: 12px;
    border-radius: 12px;
    align-items: center;
    justify-content: space-between;
  }
  
  .pokes-details-title {
    font-size: 24px;
    margin: 0;
    font-weight: 700;
    color: #333;
  }
  
  .pokes-details-text {
    font-size: 16px;
    margin: 0;
    color: #2d70b7;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 8px;
  }
  </style>
  