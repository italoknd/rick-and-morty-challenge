import { createWebHistory, createRouter } from "vue-router";

import Characters from "../views/Characters.vue";

const routes = [
  { path: "/", redirect: "/characters" },
  { path: "/characters", component: Characters },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
