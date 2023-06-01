import model from "../model/category";
import { Category } from "../../types/Categories";

export async function categoryCreator(data: Category) {
  return await model.create({
    ...data,
  });
}

export async function findCategoriesByParent(parent: string) {
  console.log(parent);

  if (!parent) {
    return await model.findAll({
      where: {
        level: 1,
      },
    });
  }

  return await model.findAll({
    where: {
      parent,
    },
  });
}

export async function findCategories(level: number, body) {}

// export async function deleteCategory(level:number,id:string) {
//     if(level === 4) {
//        return await modellevel4.destroy({
//         where:{
//             id
//         }
//        });
//     } else if(level === 3) {
//        await modellevel3.destroy({
//         where:{
//             id
//         }
//        })
//     }
// }
