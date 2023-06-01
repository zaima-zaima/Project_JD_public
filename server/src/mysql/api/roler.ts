import model from "../model/roler";

export async function rolerCreator(name: string) {
  return await model.create({
    name,
  });
}

export async function findAllRoler() {
  return await model.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });
}

export async function findRolerById(id: string) {
  return await model.findByPk(id);
}

export async function rolerUpdate(id: string, name: string) {
  return await model.update(
    { name },
    {
      where: {
        id,
      },
    }
  );
}

export async function deleteRoler(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}
