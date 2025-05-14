import { createWebHistory, createRouter } from "vue-router";

import Characters from "../views/Characters.vue";
import CharacterDetails from "../views/CharacterDetails.vue";

const routes = [
  { path: "/", redirect: "/characters" },
  { path: "/characters", component: Characters },
  { path: "/character-detail", component: CharacterDetails },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
