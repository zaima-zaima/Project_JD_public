import { createStore } from "vuex";
import { getCart, setCart } from "../api/cart";
import { login, whoami } from "../api/login";
import { sendSms } from "../api/sms";
import Cart from "../types/Cart";

const store = createStore({
  state: {
    user: null as any,
    timer: 0,
    stamp: null as NodeJS.Timer | null,
    cart: [] as Cart[],
    cartSelected: [] as Cart[],
    MathRandom: "",
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
    },

    timer(state, payload) {
      state.timer = payload;
    },

    SET_CART(state, payload) {
      state.cart = payload;
    },
    SET_CARTSELECED(state, payload) {
      state.cartSelected = payload;
    },
    SET_RANDOM(state) {
      state.MathRandom = Math.random() + Date.now() + "";
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

      store.dispatch("fetchCart", store.state.user.id);
    },

    async SendSms(store, payload) {
      const sms = (await sendSms(payload)) as any;
      if (sms.code && sms.code !== 0) {
        return sms;
      }

      if (sms) {
        store.dispatch("startTimer", 60);
      }
    },

    startTimer(store, payload) {
      clearInterval(store.state.stamp as NodeJS.Timer);

      store.commit("timer", payload);

      store.state.stamp = setInterval(() => {
        store.commit("timer", store.state.timer - 1);
        if (store.state.timer === 0) {
          clearInterval(store.state.stamp as NodeJS.Timer);
        }
      }, 1000);
    },
    async fetchCart(store, payload) {
      const resp = (await getCart(payload)) as any;
      store.commit("SET_CART", (resp && resp.cart) || []);
      const selected = store.state.cart.filter((item: Cart) => {
        return item.selected;
      });
      store.commit("SET_CARTSELECED", selected);
      store.commit("SET_RANDOM");
    },
    async cartSetup(store, payload) {
      const resp = (await setCart(payload, store.state.user.id)) as any;
      store.commit("SET_CART", resp.cart);
      const selected = store.state.cart.filter((item: Cart) => {
        return item.selected;
      });

      store.commit("SET_CARTSELECED", selected);
    },
  },
});

export default store;
