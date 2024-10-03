import { createRouter, createWebHistory } from 'vue-router';
import PokeList from './views/PokeList.vue';
import PokemonDetail from './views/PokemonDetail.vue';

const routes = [
  {
    path: '/',
    name: 'PokeList',
    component: PokeList,
  },
  {
    path: '/pokemon/:id', // Rota com parâmetro ID
    name: 'PokemonDetail',
    component: PokemonDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
