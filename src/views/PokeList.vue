<template>
  <div class="pokedex-container">
    <LoadingSpinner v-if="loading" />
    <div v-else class="pokedex-container">
      <div class="header">
        <img src="../assets/pokemon_logo.svg" />
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquise o pokemon da sua preferênia pelo nome ou pelo número..."
        class="search-input"
      />
      <div class="amount">
        <div class="pokes">
          <div class="filters">
            <div>
              <PokemonTypeDropdown
                :dropdownOpen="dropdownOpen"
                :selectedType="selectedType"
                @toggle-dropdown="toggleDropdown"
                @close-dropdown="closeDropdown"
                @toggle-type-filter="toggleTypeFilter"
                @clear-type-filter="clearTypeFilter"
              />
            </div>
            <div>
              <EvolutionFilters
                :filters="filters"
                @toggle-filter="toggleFilter"
              />
            </div>
          </div>
          <GenerationsDropdown
            :showGenerations="showGenerations"
            @toggle-generations="toggleGenerations"
            @set-generation="setGeneration"
          />
          <div class="pokemon-cards">
            <PokemonCard
              v-for="(pokemon, index) in filteredPokemons"
              :key="index"
              :pokemon="pokemon"
              @selectPokemon="selectPokemon"
            />
          </div>
        </div>
        <PokemonDetails :pokemon="selectedPokemon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { usePokemon } from "../composables/usePokemon";
import { evolutions } from "../constants/constants";
import LoadingSpinner from "../components/Loading.vue";
import PokemonDetails from '../components/PokemonDetails.vue';
import EvolutionFilters from "../components/EvolutionFilters.vue";
import PokemonTypeDropdown from "../components/PokemonTypeDropdown.vue";
import GenerationsDropdown from "../components/GenerationsDropdown.vue";


const searchQuery = ref("");
const amoutStartQuery = ref("0");
const amountContQuery = ref("151");
const dropdownOpen = ref(false);
const selectedType = ref(null);
const selectedPokemon = ref(null);
const showGenerations = ref(false);
const filters = ref({
  total: true,
  primeiraEvolucao: false,
  segundaEvolucao: false,
  ultimaEvolucao: false,
  types: [],
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const toggleTypeFilter = (type) => {
  selectedType.value = type;
  filters.value.types = [type];
  closeDropdown();
};

const clearTypeFilter = () => {
  selectedType.value = null;
  filters.value.types = [];
  closeDropdown();
};

const { pokemons, loading, fetchPokemons } = usePokemon(
  amoutStartQuery,
  amountContQuery
);

const selectPokemon = (id) => {
  const pokemon = pokemons.value.find((poke) => {
    return Number(poke.id) === Number(id);
  });

  if (pokemon) {
    selectedPokemon.value = pokemon;
    console.log("Pokemon selecionado com sucesso:", selectedPokemon.value);
  } else {
    console.warn(`Nenhum Pokémon encontrado com o ID ${id}.`);
  }
};

onMounted(async () => {
  await fetchPokemons();
  document.addEventListener("click", (event) => {
    const dropdown = document.querySelector(".tipo-dropdown");
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });
  if (pokemons.value.length > 0) {
    selectPokemon(1);
  } else {
    console.warn("Nenhum Pokémon foi carregado.");
  }
});

const toggleFilter = (filterType) => {
  filters.value.total = false;
  filters.value.primeiraEvolucao = false;
  filters.value.segundaEvolucao = false;
  filters.value.ultimaEvolucao = false;

  filters.value[filterType] = true;
};

const filteredPokemons = computed(() => {
  let filtered = pokemons.value;

  if (searchQuery.value) {
    filtered = filtered.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filters.value.primeiraEvolucao) {
    filtered = filtered.filter((pokemon) =>
      evolutions.primeiraEvolucao.includes(
        parseInt(pokemon.url.split("/").filter(Boolean).pop())
      )
    );
  }

  if (filters.value.segundaEvolucao) {
    filtered = filtered.filter((pokemon) =>
      evolutions.segundaEvolucao.includes(
        parseInt(pokemon.url.split("/").filter(Boolean).pop())
      )
    );
  }

  if (filters.value.ultimaEvolucao) {
    filtered = filtered.filter((pokemon) =>
      evolutions.ultimaEvolucao.includes(
        parseInt(pokemon.url.split("/").filter(Boolean).pop())
      )
    );
  }

  if (filters.value.types.length > 0) {
    filtered = filtered.filter((pokemon) =>
      pokemon.types.some((type) => filters.value.types.includes(type))
    );
  }

  return filtered;
});

watch([amoutStartQuery, amountContQuery], () => {
  fetchPokemons();
});

const setGeneration = (start, end) => {
  amoutStartQuery.value = start;
  amountContQuery.value = end;
};

const toggleGenerations = () => {
  showGenerations.value = !showGenerations.value;
};
</script>

<style scoped>
.amount {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.amount-pokemon {
  width: 25px;
  height: 20px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.pokedex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #f6f8fc;
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

.search-input {
  padding: 10px;
  font-size: 1rem;
  border: 3px solid #2d70b7;
  border-radius: 8px;
  width: 90%;
  margin: 28px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
}

.search-button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #2d70b7;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pokes {
  display: flex;
  flex-direction: column;
  border: 3px solid #2d70b7;
  padding: 16px;
  border-radius: 12px;
}

.search-button:hover {
  background-color: #ffde59;
}

.pokemon-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
}

.filterTitle {
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  font-weight: 600;
  color: #ffffff;
}

.amount-text {
  font-size: 16px;
  margin: 0;
  color: #000000;
  font-weight: 500;
  margin: 10px;
}


@media (max-width: 950px) {
  .pokemon-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .filters {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}

@media (max-width: 600px) {
  .pokemon-cards {
    grid-template-columns: 1fr;
  }
  .pokes-details-img {
    max-width: 100px;
  }
}

@media (max-width: 480px) {
  .amount {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .pokes-details {
    margin: 0px 0px 8px 0px;
  }
}
</style>
