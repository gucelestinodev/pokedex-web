<template>
  <div class="pokedex-container">
    <div class="header">
      <img src="../assets/pokemon_logo.svg" />
    </div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquise o pokemon da sua preferênia pelo nome ou pelo número..."
        class="search-input"
      />
      <button @click="searchPokemon" class="search-button">Buscar</button>
    </div>
    <div class="pokes">
      <div class="filters">
        <p class="filterTitle">Filtro Gerações</p>
        <div class="geracoes">
          <div class="geracoesCheckbox" @click="toggleFilter('total')">
            <img
              :src="filters.total ? checkedPokeball : uncheckedPokeball"
              alt="Pokébola"
              class="pokebola-icon"
            />
            <p class="filterText">Todos</p>
          </div>
          <div
            class="geracoesCheckbox"
            @click="toggleFilter('primeiraEvolucao')"
          >
            <img
              :src="
                filters.primeiraEvolucao ? checkedPokeball : uncheckedPokeball
              "
              alt="Pokébola"
              class="pokebola-icon"
            />
            <p class="filterText">1°</p>
          </div>
          <div
            class="geracoesCheckbox"
            @click="toggleFilter('segundaEvolucao')"
          >
            <img
              :src="
                filters.segundaEvolucao ? checkedPokeball : uncheckedPokeball
              "
              alt="Pokébola"
              class="pokebola-icon"
            />
            <p class="filterText">2°</p>
          </div>
          <div class="geracoesCheckbox" @click="toggleFilter('ultimaEvolucao')">
            <img
              :src="
                filters.ultimaEvolucao ? checkedPokeball : uncheckedPokeball
              "
              alt="Pokébola"
              class="pokebola-icon"
            />
            <p class="filterText">3°</p>
          </div>
        </div>
      </div>
      <div class="pokemon-cards">
        <PokemonCard
          v-for="(pokemon, index) in filteredPokemons"
          :key="index"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { onMounted } from "vue";
import { usePokemon } from "../composables/usePokemon";

import checkedPokeball from "../assets/pokebola_checked.svg";
import uncheckedPokeball from "../assets/pokebola_deschecked.svg";

const evolutions = {
  primeiraEvolucao: [
    1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48,
    50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90, 92,
    96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 133, 138, 140, 147,
  ],
  segundaEvolucao: [
    2, 5, 8, 11, 14, 17, 20, 22, 24, 26, 28, 31, 34, 36, 38, 40, 42, 44, 47, 49,
    51, 53, 55, 57, 59, 61, 64, 67, 70, 73, 75, 78, 80, 82, 85, 87, 89, 91, 93,
    94, 97, 99, 101, 103, 105, 110, 112, 114, 117, 119, 121, 130, 134, 139, 141,
    148,
  ],
  ultimaEvolucao: [
    3, 6, 9, 12, 15, 18, 30, 33, 45, 65, 68, 71, 76, 83, 95, 106, 107, 108, 113,
    115, 122, 123, 124, 125, 126, 127, 128, 131, 132, 135, 136, 137, 142, 143,
    144, 145, 146, 149, 150, 151,
  ],
};

const { pokemons, loading, fetchPokemons } = usePokemon();
const searchQuery = ref("");

const filters = ref({
  total: true,
  primeiraEvolucao: false,
  segundaEvolucao: false,
  ultimaEvolucao: false,
});

const toggleFilter = (filterName) => {
  filters.value[filterName] = !filters.value[filterName];
  handleFilterChange(filterName);
};

const handleFilterChange = (selectedFilter) => {
  if (selectedFilter !== "total") {
    filters.value.total = false;
  }
  Object.keys(filters.value).forEach((filter) => {
    if (filter !== selectedFilter) {
      filters.value[filter] = false;
    }
  });
};

const filteredPokemons = computed(() => {
  let filtered = pokemons.value;

  if (!filters.value.total) {
    if (filters.value.primeiraEvolucao) {
      filtered = filtered.filter((pokemon) => {
        const id = getPokemonId(pokemon.url);
        return evolutions.primeiraEvolucao.includes(id);
      });
    } else if (filters.value.segundaEvolucao) {
      filtered = filtered.filter((pokemon) => {
        const id = getPokemonId(pokemon.url);
        return evolutions.segundaEvolucao.includes(id);
      });
    } else if (filters.value.ultimaEvolucao) {
      filtered = filtered.filter((pokemon) => {
        const id = getPokemonId(pokemon.url);
        return evolutions.ultimaEvolucao.includes(id);
      });
    }
  }

  if (searchQuery.value) {
    filtered = filtered.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const getPokemonId = (url) => {
  return parseInt(url.split("/")[6]);
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
  background: linear-gradient(217deg, rgba(255, 255, 0, 0.7), rgba(255, 165, 0, 0.7) 50%),
            linear-gradient(127deg, rgba(255, 165, 0, 0.7), rgba(255, 0, 0, 0.7) 50%),
            linear-gradient(336deg, rgba(255, 0, 0, 0.7), rgba(0, 255, 0, 0.7) 50%);

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
  margin: 28px 0px;
}

.search-input {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  min-width: 965px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #2D70B7;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pokes {
  display: flex;
  flex-direction: column;
  border: 3px solid #2D70B7;
  padding: 28px;
  border-radius: 12px;
  align-items: center;
}

.search-button:hover {
  background-color: #ffde59;
}

.pokemon-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters {
  display: flex;
  font-size: 24px;
  border-radius: 12px;
  align-items: center;
  flex-direction: column;
}

.filterTitle {
  font-size: 24px;
  margin: 0;
}

.filterText {
  font-size: 16px;
  margin: 0;
  color: #ffffff;
}

.geracoesCheckbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
}

.geracoes {
  display: flex;
  flex-direction: row;
}

.pokebola-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
