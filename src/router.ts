import { createRouter, createWebHistory } from 'vue-router';
import PokeList from './views/PokeList.vue';

const routes = [
  {
    path: '/',
    name: 'PokeList',
    component: PokeList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
