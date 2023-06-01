import { Op } from "sequelize";
import { Transfer } from "../../types/Transfer";
import model from "../model/transfer";

export async function TransferCreator(data: Transfer) {
  try {
    return await model.create({
      ...data,
    });
  } catch (e) {
    return {
      code: 403,
      msg: e,
    };
  }
}

export async function getTransfer(page: number, limit: number, filter: object) {
  return await model.findAndCountAll({
    where: {
      ...filter,
    },
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * limit,
    limit: limit,
  });
}

export async function getTransferById(id: string) {
  return await model.findByPk(id);
}

export async function updateTransfer(id: string, form: Transfer) {
  return await model.update(
    {
      ...form,
    },
    {
      where: {
        id,
      },
    }
  );
}
