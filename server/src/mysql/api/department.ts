import { Department } from "../../types/Department";
import model from "../model/department";

export async function findAllDepartment() {
  return await model.findAll({
    order: [["createdAt", "ASC"]],
  });
}

export async function findDepartmentById(id: string) {
  return await model.findByPk(id);
}

export async function dePartmentRegister(data: Department) {
  return await model.create({
    ...data,
  });
}

export async function updateDepartment(id: string, data: Department) {
  await model.update(data, {
    where: {
      id,
    },
  });

  return await model.findByPk(id);
}

export async function deleteDepartment(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}
