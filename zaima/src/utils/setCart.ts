import { Goods } from "../types/Goods";
import unique from "./unique";
import store from "../store";
import Cart from "../types/Cart";

export default function (data: Goods, count: number) {
  if (store.state.cart !== null) {
    const arr = [
      ...store.state.cart,
      { ...data, cartCount: count, selected: true },
    ];

    store.dispatch("cartSetup", unique(arr));
  }
}

export async function deleteCart(data: Cart) {
  const cart = store.state.cart.filter((ele: Cart) => ele.id !== data.id);
  await store.dispatch("cartSetup", cart);
}
