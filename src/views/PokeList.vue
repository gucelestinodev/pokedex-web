<template>
  <div class="pokedex-container">
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
          <div class="tipo-dropdown">
            <button @click="toggleDropdown" class="dropdown-button">
              {{
                selectedType
                  ? eggGroupTranslations[selectedType].text
                  : "Tipo Pokemon"
              }}
            </button>
            <div v-if="dropdownOpen" class="dropdown-content">
              <div
                v-for="(translation, type) in eggGroupTranslations"
                :key="type"
                class="tipoCheckbox"
                @click="toggleTypeFilter(type)"
              >
                <label>{{ translation.text }}</label>
              </div>
            </div>
          </div>
          <div class="geracoes">
            <p class="filterTitle">Evoluções:</p>
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
            <div
              class="geracoesCheckbox"
              @click="toggleFilter('ultimaEvolucao')"
            >
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
          <div class="amount">
            <input
              type="text"
              v-model="amoutStartQuery"
              class="amount-pokemon"
            />
            <p class="amount-text">até</p>
            <input
              type="text"
              v-model="amountContQuery"
              class="amount-pokemon"
            />
          </div>
        </div>
        <div class="pokemon-cards">
          <PokemonCard
            v-for="(pokemon, index) in filteredPokemons"
            :key="index"
            :pokemon="pokemon"
            @selectPokemon="selectPokemon"
          />
        </div>
      </div>

      <div class="pokes">
        <h2>{{ selectedPokemon?.name?.toUpperCase() }}</h2>
        <p><strong>HP:</strong> {{ selectedPokemon?.stats?.hp }}</p>
        <p><strong>Ataque:</strong> {{ selectedPokemon?.stats?.attack }}</p>
        <p><strong>Defesa:</strong> {{ selectedPokemon?.stats?.defense }}</p>
        <p><strong>Velocidade:</strong> {{ selectedPokemon?.stats?.speed }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { usePokemon } from "../composables/usePokemon";
import { evolutions, eggGroupTranslations } from "../constants/constants";

import checkedPokeball from "../assets/pokebola_checked.svg";
import uncheckedPokeball from "../assets/pokebola_deschecked.svg";

const searchQuery = ref("");
const amoutStartQuery = ref("0");
const amountContQuery = ref("151");
const dropdownOpen = ref(false);
const selectedType = ref(null);
const selectedPokemon = ref(null);
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

const toggleTypeFilter = (type) => {
  selectedType.value = type;
  filters.value.types = [type];
  dropdownOpen.value = false;
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
    filtered = filtered.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pokemon.url.split("/").filter(Boolean).pop().includes(searchQuery.value)
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
  border-radius: 5px;
  min-width: 68.5%;
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

.filtersEvolution {
  display: flex;
  font-size: 24px;
  border-radius: 12px;
  align-items: center;
  flex-direction: column;
}

.filterTitle {
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  font-weight: 600;
}

.filterText {
  font-size: 16px;
  margin: 0;
  color: #000000;
  font-weight: 500;
}

.amount-text {
  font-size: 16px;
  margin: 0;
  color: #000000;
  font-weight: 500;
  margin: 10px;
}

.geracoesCheckbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
}

.geracoes {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 8px;
  align-items: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.pokebola-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;
}

.tipo-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #ffffff;
  color: black;
  padding: 16px 32px;
  margin-top: 12px;
  font-size: 16px;
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

.dropdown-content .tipoCheckbox {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content .tipoCheckbox:hover {
  background-color: #f1f1f1;
}
</style>
