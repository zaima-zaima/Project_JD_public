import Cart from "../types/Cart";
import request from "./request";

export async function getCart(uid: string) {
  return await request.get(`/api/cart?uid=${uid}`);
}

export async function setCart(cartList: Cart[], uid: string) {
  return await request.post("/api/cart", {
    cartList,
    uid,
  });
}
