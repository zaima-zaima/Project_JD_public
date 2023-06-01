import { getArea } from "../mysql/api/area";
import Error from "../utils/Error";

export async function fetchArea(parentId?: string) {
  try {
    return await getArea(parentId);
  } catch {
    throw new Error.UnkownError();
  }
}
