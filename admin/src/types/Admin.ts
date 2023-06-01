export type AdminStatus = "pending" | "approved" | "rejected" | "banded";

export interface Admin {
  id: string;
  username: string;
  status: AdminStatus;
  password: string;
  authLevel?: number;
  department: string;
  leader?: boolean;
  senior?: string;
  transfer: string;
}
