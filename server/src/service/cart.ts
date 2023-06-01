import { getCart, setCart } from "../mysql/api/cart";
import Cart from "../types/Cart";
import Error from "../utils/Error";
import isType from "../utils/isType";

export async function fetchCart(user?: string) {
  try {
    return await getCart(user);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function cartSetup(cart: Cart[], user: string) {
  if (!cart || isType(cart) !== "array" || !user) {
    throw new Error.Params();
  }

  try {
    return await setCart(JSON.stringify(cart), user);
  } catch {
    throw new Error.UnkownError();
  }
}
