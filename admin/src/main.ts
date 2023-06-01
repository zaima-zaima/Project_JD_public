import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./route/router";
import store from "./store";
import { io } from "socket.io-client";
const socket = io("http://localhost:3200", {
  transports: ["websocket"],
});

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);

const token = localStorage.getItem("token");

if (!token) {
  router.push({
    name: "Login",
  });
}

app.config.globalProperties.$socket = socket;

app.mount("#app");

store.dispatch("Whoami");
