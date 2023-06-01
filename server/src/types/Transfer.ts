export interface Transfer {
  id: string;
  target: string;
  from: string;
  to: string;
  leader: string;
  actionFrom: string;
  status: TransferStatus;
  push: boolean;
  seniorTransfer?: string;
  seniorFromDepartment?: string;
}

export enum TransferStatus {
  pending = "pending",
  approve = "approve",
  reject = "reject",
}
