import { StoreOptions, createStore } from "vuex";
import { login, whoami } from "../api/login";
import router from "../route/router";

const store = createStore({
  state: {
    user: null as any,
  },
  mutations: {
    login(state, payload) {
      state.user = payload;
    },
    whoami(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      router.replace({ name: "Login" });
    },
  },
  actions: {
    async Login(store, payload) {
      const user = await login(payload);
      store.commit("login", user);
      return user;
    },

    async Whoami(store) {
      const user = (await whoami()) as any;
      if (user.code && user.code !== 0) {
        store.commit("whoami", user.data);
        return;
      }

      store.commit("whoami", user);
    },
  },
});

export default store;
