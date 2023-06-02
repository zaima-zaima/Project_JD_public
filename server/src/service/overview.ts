import UserModal from "../mysql/model/user";
import GoodsModal from "../mysql/model/goods";
import OrderModal from "../mysql/model/order";
import Error from "../utils/Error";
export async function fetchOverViewData() {
  try {
    const user = await UserModal.count();
    const goods = await GoodsModal.count();
    const order = await OrderModal.count();

    return { user, goods, order };
  } catch {
    throw new Error.UnkownError();
  }
}
