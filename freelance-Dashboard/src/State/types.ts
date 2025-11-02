// src/state/types.ts

// ✅ Enums
export enum ProjectStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

// ✅ Interfaces
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO string
}

// ✅ Global state
export type State = {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
};

// ✅ Actions for reducer
export type Action =
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: ProjectStatus } }
  | { type: "ADD_PAYMENT"; payload: Payment };
