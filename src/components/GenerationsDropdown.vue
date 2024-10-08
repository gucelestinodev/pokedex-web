<template>
  <div>
    <img
      src="../assets/sort.png"
      alt="More"
      class="more-icon"
      @click="$emit('toggle-generations')"
      style="cursor: pointer"
    />
    <div class="geracoes" :class="{ show: showGenerations }">
      <button
        class="button-generations"
        @click="$emit('set-generation', 0, 151)"
      >
        Geração I
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 151, 99)"
      >
        Geração II
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 252, 134)"
      >
        Geração III
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 387, 106)"
      >
        Geração IV
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 494, 155)"
      >
        Geração V
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 650, 71)"
      >
        Geração VI
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 722, 87)"
      >
        Geração VII
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 810, 88)"
      >
        Geração VIII
      </button>
      <button
        class="button-generations"
        @click="$emit('set-generation', 899, 111)"
      >
        Geração IX
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  showGenerations: Boolean,
});
</script>

<style scoped>
.geracoes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 1.9s ease, opacity 2s ease;
}

.geracoes.show {
  max-height: 500px;
  opacity: 1;
}

.button-generations {
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background-color: #2d70b7;
  color: #ffffff;
  margin: 4px;
  flex: 1 1 30%;
}

.more-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  cursor: pointer;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .button-generations {
    flex: 1 1 45%;
  }
}

@media (max-width: 480px) {
  .button-generations {
    flex: 1 1 100%;
  }
}
</style>
