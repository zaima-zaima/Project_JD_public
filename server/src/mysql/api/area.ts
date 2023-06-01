import model from "../model/area";

export async function getArea(parentId?: string) {
  if (!parentId) {
    return await model.findAll({
      where: {
        level: 1,
      },
    });
  }

  return await model.findAll({
    where: {
      parent_code: parentId,
    },
  });
}
