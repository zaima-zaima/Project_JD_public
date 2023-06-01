import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import routes from "./rules";
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
