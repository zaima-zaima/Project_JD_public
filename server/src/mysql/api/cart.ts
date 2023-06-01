import model from "../model/cart";

export async function setCart(data: string, user: string) {
  const existent = await model.findOne({
    where: {
      user,
    },
  });

  if (!existent) {
    return await model.create({
      cart: data,
      user,
    });
  }

  await model.update(
    {
      cart: data,
    },
    {
      where: {
        user,
      },
    }
  );

  return model.findOne({
    where: {
      user,
    },
  });
}

export async function getCart(user?: string) {
  if (user) {
    return await model.findOne({
      where: {
        user,
      },
    });
  }

  return await model.findAll();
}
