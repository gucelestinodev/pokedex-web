<template>
  <div class="pokedex-container">
    <LoadingSpinner v-if="loading" />
    <div v-else>
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
            <div class="tipo-dropdown" @click.self="closeDropdown">
              <button @click="toggleDropdown" class="dropdown-button">
                {{
                  selectedType
                    ? TypeTranslations[selectedType].text
                    : "Tipo Pokemon"
                }}
              </button>
              <div v-if="dropdownOpen" class="dropdown-content">
                <div class="tipoPokemon" @click="clearTypeFilter">
                  <label>Todos</label>
                </div>
                <div
                  v-for="(translation, type) in TypeTranslations"
                  :key="type"
                  class="tipoPokemon"
                  @click="toggleTypeFilter(type)"
                >
                  <label>{{ translation.text }}</label>
                </div>
              </div>
            </div>
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
                    filters.primeiraEvolucao
                      ? checkedPokeball
                      : uncheckedPokeball
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
                    filters.segundaEvolucao
                      ? checkedPokeball
                      : uncheckedPokeball
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
          </div>
          <img
            src="../assets/sort.png"
            alt="More"
            class="more-icon"
            @click="toggleGenerations"
            style="cursor: pointer"
          />
          <div class="amount-teste" :class="{ show: showGenerations }">
            <button class="button-generations" @click="setGeneration(0, 151)">
              Geração I
            </button>
            <button class="button-generations" @click="setGeneration(151, 99)">
              Geração II
            </button>
            <button class="button-generations" @click="setGeneration(252, 134)">
              Geração III
            </button>
            <button class="button-generations" @click="setGeneration(387, 106)">
              Geração IV
            </button>
            <button class="button-generations" @click="setGeneration(494, 155)">
              Geração V
            </button>
            <button class="button-generations" @click="setGeneration(650, 71)">
              Geração VI
            </button>
            <button class="button-generations" @click="setGeneration(722, 87)">
              Geração VII
            </button>
            <button class="button-generations" @click="setGeneration(810, 88)">
              Geração VIII
            </button>
            <button class="button-generations" @click="setGeneration(899, 111)">
              Geração IX
            </button>
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

        <div class="pokes-details">
          <p class="pokes-details-title">
            {{ selectedPokemon?.name?.toUpperCase() }}
          </p>
          <img
            class="pokes-details-img"
            :src="selectedPokemon?.img"
            :alt="selectedPokemon?.name"
          />
          <div class="pokes-details-info">
            <p class="pokes-details-text">
              <strong>HP:</strong> {{ selectedPokemon?.stats?.hp }}
            </p>
            <p class="pokes-details-text">
              <strong>Ataque:</strong> {{ selectedPokemon?.stats?.attack }}
            </p>
          </div>
          <div class="pokes-details-info">
            <p class="pokes-details-text">
              <strong>Defesa:</strong> {{ selectedPokemon?.stats?.defense }}
            </p>
            <p class="pokes-details-text">
              <strong>Velocidade:</strong> {{ selectedPokemon?.stats?.speed }}
            </p>
          </div>
          <div class="pokes-details-info">
            <p class="pokes-details-text">
              <strong>Ataque Especial:</strong>
              {{ selectedPokemon?.stats?.special_attack }}
            </p>
            <p class="pokes-details-text">
              <strong>Defesa Especial:</strong>
              {{ selectedPokemon?.stats?.special_defense }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { usePokemon } from "../composables/usePokemon";
import { evolutions, TypeTranslations } from "../constants/constants";
import LoadingSpinner from "../components/Loading.vue";
import checkedPokeball from "../assets/pokebola_checked.svg";
import uncheckedPokeball from "../assets/pokebola_deschecked.svg";

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
.amount-teste {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 1.9s ease, opacity 2s ease;
}

.amount-teste.show {
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
  color: #ffffff;
}

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
  width: 80%;
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
  color: #ffffff;
}

.filterText {
  font-size: 14px;
  margin: 0;
  color: #ffffff;
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
  padding: 0px 8px;
}

.geracoes {
  display: flex;
  flex-direction: row;
  background-color: #2d70b7;
  align-items: center;
  border-radius: 8px;
  padding: 4px 0px;
  justify-content: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.pokebola-icon {
  width: 22.5px;
  height: 22.5px;
  vertical-align: middle;
  cursor: pointer;
}

.more-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  cursor: pointer;
  margin-bottom: 16px;
}

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

.dropdown-content .tipoPokemon {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content .tipoPokemon:hover {
  background-color: #f1f1f1;
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
  .tipo-dropdown {
    margin-bottom: 12px;
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

@media (max-width: 768px) {
  .button-generations {
    flex: 1 1 45%;
  }
}

@media (max-width: 480px) {
  .amount {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .button-generations {
    flex: 1 1 100%;
  }
  .pokes-details {
    margin: 0px 0px 8px 0px;
  }
}
</style>
