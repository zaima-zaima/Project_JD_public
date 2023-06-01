import { categoryCreator, findCategoriesByParent } from "../mysql/api/category";
import { Category } from "../types/Categories";
import Error from "../utils/Error";
import categoryModel from "../mysql/model/category";

export async function addCategory(data: Category) {
  if (!data.level || !data.name || String(Number(data.level)) === "NaN") {
    throw new Error.Params();
  }

  const cate = JSON.parse(
    JSON.stringify(
      await categoryModel.findOne({
        where: {
          name: data.name,
        },
      })
    )
  );

  if (cate) {
    throw new Error.Forbiden("该名称已存在，请更换名称后重试");
  }

  if (data.parent) {
    const cate = JSON.parse(
      JSON.stringify(await categoryModel.findByPk(data.parent))
    );
    if (!cate) {
      throw new Error.Params("参数parent传输有误");
    }
  }

  if (+data.level <= 0 || +data.level > 4) {
    throw new Error.Params("层级错误，层级范围是1-4");
  }

  try {
    return await categoryCreator(data);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchCategoriesByParent(id: string) {
  try {
    return await findCategoriesByParent(id);
  } catch {
    throw new Error.UnkownError();
  }
}
