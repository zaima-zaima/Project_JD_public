import { createApp, watchEffect } from "vue";
import "./global.less";
import App from "./App.vue";
import "./mock";
import router from "./router/index";
import store from "./store/index";
import { io } from "socket.io-client";
import lazy from "./directive/lazy";
const socket = io("http://localhost:3200", {
  transports: ["websocket"],
});

const app = createApp(App);
app.use(router);
app.use(store);
app.directive("lazy", lazy);
app.mount("#app");
app.config.globalProperties.$socket = socket;

const token = localStorage.getItem("token");

if (router.currentRoute.value.meta.auth && !token) {
  router.push({ name: "Login" });
}

store.dispatch("Whoami");
