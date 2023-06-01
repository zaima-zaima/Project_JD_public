import { Server } from "socket.io";
import Express from "express";
import { createServer } from "http";
import { fetchAdminById, fetchAllAdmin } from "../service/admin";
import { Admin } from "../types/Admin";
import { Socket } from "net";
import { Discussion } from "../types/Discussion";
import transfer from "../mysql/model/transfer";
import { Transfer, TransferStatus } from "../types/Transfer";
import { parser } from "../utils/parser";
import unique from "../utils/unique";
import { fetchDepartmentById } from "../service/department";
import { Department } from "../types/Department";
import { updateTransfer } from "../mysql/api/transfer";
import { Op } from "sequelize";
import { log } from "console";

export const app = Express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  transports: ["websocket"],
});

interface SocketsType {
  id: string;
  user: {
    username: string;
    id: string;
  };
  socket: any;
}

let sockets = [] as SocketsType[];
let userSocks = [] as SocketsType[];

io.on("connection", (socket) => {
  // 管理员登陆
  socket.on("login", async (chunk) => {
    sockets.push({ id: chunk.id, user: chunk, socket });

    sockets = unique(sockets);

    if (chunk.username === "root") {
      const resp = (await fetchAllAdmin({
        status: "pending",
      })) as unknown as Admin[];

      if (resp.length === 0) {
        return;
      }

      const status = (await transfer.findByPk(
        resp[0].transfer
      )) as unknown as Transfer;

      if (resp.length !== 0 && status && status.push) {
        socket.emit("waitingList", "你有待处理的管理员注册请求，请及时处理！");
      }
    } else {
      const resp = (await fetchAllAdmin({
        status: "pending",
        senior: chunk.id,
      })) as unknown as Admin[];

      if (resp.length !== 0) {
        const status = (await transfer.findByPk(
          resp[0].transfer
        )) as unknown as Transfer;

        if (resp.length !== 0 && status && status.push) {
          socket.emit(
            "waitingList",
            "你有待处理的管理员注册请求，请及时处理！"
          );
        }
      }
    }

    const transferPending = (await transfer.findAll({
      where: {
        leader: chunk.id,
        status: "pending",
        push: true,
      },
    })) as unknown as Transfer[];

    if (transferPending.length !== 0) {
      socket.emit("transfer", "你有一条同事转交事宜待处理");
    }

    const transferAccept = (await transfer.findAll({
      where: {
        leader: chunk.id,
        status: "approve",
        push: true,
      },
    })) as unknown as Transfer[];

    if (transferAccept.length !== 0) {
      socket.emit("transfer", "你有一条同事转交事宜被部门同意，并已完成交接");
    }

    const transferReject = (await transfer.findAll({
      where: {
        leader: chunk.id,
        status: "reject",
        push: true,
      },
    })) as unknown as Transfer[];

    if (transferReject.length !== 0) {
      socket.emit("transfer", "你有一条同事转交事宜已被部门拒绝");
    }

    await transfer.update(
      { push: false },
      {
        where: {},
      }
    );
  });

  // 用户登录

  socket.on("userLogin", async (chunk) => {
    userSocks.push({
      id: chunk.id,
      user: chunk,
      socket,
    });

    userSocks = unique(userSocks);
  });

  socket.on("logOut", async (chunk) => {
    await transfer.update(
      { push: true },
      { where: { leader: chunk.id, status: "pending" } }
    );
  });
});

export function broadcastDiscussion(resp: Discussion) {
  const filter = userSocks.filter((item) => item.user.id === resp.userid);
  if (filter.length !== 0) {
    filter[0].socket.broadcast.emit("discussion", resp);
  }
}

export function onRegistion(data: Admin) {
  if (data.senior) {
    const filter = sockets.filter((item) => item.user.id === data.senior);

    if (filter.length !== 0) {
      filter[0].socket.emit(
        "registion",
        "有用户正在向你发起注册请求，请尽快处理！"
      );
    }
  }
}

export async function transferRes(data: Transfer) {
  const filter = sockets.filter((item) => item.user.id === data.actionFrom);

  console.log("actionFrom:", filter);

  if (filter.length != 0) {
    const admin = parser(await fetchAdminById(data.target)) as unknown as Admin;

    console.log(data.status);

    if (data.status === TransferStatus.approve) {
      filter[0].socket.emit(
        "transfer",
        `你提交的有关${admin.username}同事的转交事宜相关部门的管理员已同意，交接已完成`
      );
    } else if (data.status === TransferStatus.reject) {
      filter[0].socket.emit(
        "transfer",
        `你提交的有关${admin.username}同事的转交事宜已被该部门拒绝`
      );
    }
  }
}

export async function transferRequest(data: Transfer) {
  const filter = sockets.filter((item) => item.user.id === data.leader);
  const admin = parser(await fetchAdminById(data.target)) as unknown as Admin;
  const depart = parser(
    await fetchDepartmentById(data.from)
  ) as unknown as Department;
  const from = parser(
    await fetchAdminById(data.actionFrom)
  ) as unknown as Admin;

  if (filter.length !== 0) {
    filter[0].socket.emit(
      "transfer",
      `部门${depart.name}的管理员${from.username}向你发送了一条有关${admin.username}同事的转交事宜，请及时处理`
    );
  }
}
