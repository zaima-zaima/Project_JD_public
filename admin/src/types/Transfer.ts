import { Admin } from "./Admin";
import { Department } from "./Department";

export interface Transfer {
  id: string;
  target: Admin;
  from: Department;
  to: Department;
  leader: Admin;
  actionFrom: Admin;
  status: TransferStatus;
}

export type TransferStatus = ["pending", "accept", "reject"];
