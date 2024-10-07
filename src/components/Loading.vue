<!-- src/components/LoadingSpinner.vue -->
<template>
    <div class="spinner-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "LoadingSpinner",
  });
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  