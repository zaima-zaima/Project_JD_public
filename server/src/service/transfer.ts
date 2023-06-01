import {
  getTransfer,
  getTransferById,
  TransferCreator,
  updateTransfer,
} from "../mysql/api/transfer";

import admin from "../mysql/model/admin";
import { Admin } from "../types/Admin";
import { ResponseWithCount } from "../types/Response";
import department from "../mysql/model/department";

import { Transfer, TransferStatus } from "../types/Transfer";
import { parser } from "../utils/parser";
import { fetchAdminById } from "./admin";
import { fetchDepartmentById } from "./department";
import { transferRequest, transferRes } from "../websoket/socket";
import { findAdminById, findAllAdmin, updateAdmin } from "../mysql/api/admin";
import Error from "../utils/Error";
import { log } from "console";

export async function createTransfer(data: Transfer) {
  if (!data.target || !data.from || !data.to || !data.actionFrom) {
    throw new Error.Params();
  }

  try {
    if (!data.leader) {
      const resp = parser(
        await admin.findOne({
          where: {
            authLevel: 0,
          },
        })
      ) as Admin;

      data.leader = resp.id as string;
    }
    const transfer = (await TransferCreator(data)) as unknown as Transfer;

    await admin.update(
      { transfer: transfer.id },
      {
        where: {
          id: data.target,
        },
      }
    );

    await transferRequest(transfer);

    return transfer;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchAllTransfer(
  page: number,
  limit: number,
  filter: undefined | string
) {
  if (!page || !limit || !Number(page) || !Number(limit)) {
    throw new Error.Params();
  }

  try {
    if (!filter) {
      filter = "{}";
    }

    const resp = (await getTransfer(
      page,
      limit,
      JSON.parse(filter)
    )) as unknown as ResponseWithCount<Transfer>;

    for (let i = 0; i < resp.rows.length; i++) {
      resp.rows[i].actionFrom = (await admin.findByPk(
        resp.rows[i].actionFrom
      )) as any;
      resp.rows[i].from = (await fetchDepartmentById(resp.rows[i].from)) as any;
      resp.rows[i].leader = (await fetchAdminById(resp.rows[i].leader)) as any;
      resp.rows[i].target = (await fetchAdminById(resp.rows[i].target)) as any;
      resp.rows[i].to = (await fetchDepartmentById(resp.rows[i].to)) as any;
    }
    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchTransferById(id: string) {
  if (!id) {
    throw new Error.Params("id参数有误");
  }

  try {
    return await getTransferById(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function transferUpdate(id: string, form: Transfer) {
  if (!id) {
    throw new Error.Params("id参数有误");
  }

  // 获取转换部门的信息

  const transfer = parser(await fetchTransferById(id)) as Transfer;
  if (form.status && form.status === TransferStatus.approve) {
    // 如果相关部门同意

    const admin = JSON.parse(
      JSON.stringify(await fetchAdminById(form.target))
    ) as Admin;

    if (!admin) {
      throw new Error.Params("target参数有误");
    }

    // if (admin.leader && !form.seniorTransfer) {

    //   throw new Error.Params("缺少必要参数");
    // }

    if (admin.leader) {
      //  如果需要转化的人缘的是leader
      if (!transfer.seniorFromDepartment) {
        throw new Error.Params("缺少必要参数");
      }

      const adminExist = await findAdminById(
        transfer.seniorFromDepartment as string
      );

      if (!adminExist) {
        throw new Error.Params("seniorFromDepartment参数错误，该管理员不存在");
      }

      // const resp = await updateAdmin(, form);

      // const resp = await updateTransfer(id, form);

      try {
        const adminFilter = JSON.parse(
          JSON.stringify(
            await findAllAdmin({
              senior: form.target,
            })
          )
        ) as Admin[];

        for (let i = 0; i < adminFilter.length; i++) {
          // 更改需要转移的管理员名下管理员的leader
          await updateAdmin(
            adminFilter[i].id as string,
            { senior: transfer.seniorFromDepartment } as Admin
          );
        }
      } catch {
        throw new Error.UnkownError();
      }
    }

    try {
      await department.increment("count", {
        where: {
          id: transfer.to,
        },
      });

      await department.decrement("count", {
        where: {
          id: transfer.from,
        },
      });

      await updateTransfer(id, {
        status: TransferStatus.approve,
      } as Transfer);

      await transferRes(form);
      return true;
    } catch (err) {
      throw new Error.UnkownError();
    }
  } else if (form.status && form.status === (TransferStatus.reject as any)) {
    // 相关部门拒绝

    try {
      const resp = await updateAdmin(transfer.target, {
        transfer: null,
      } as any);
      await updateTransfer(id, {
        status: TransferStatus.reject,
      } as Transfer);

      await transferRes(form);

      return true;
    } catch {
      throw new Error.UnkownError();
    }
  }
}
