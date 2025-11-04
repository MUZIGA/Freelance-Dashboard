// ✅ src/types.ts

// Type for one client
export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string; // optional
}

// Type for one project
export interface Project {
  id: number;
  clientId: number;
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed"; // 👈 fixed here
}

// Type for one payment
export interface Payment {
  id: number;
  projectId: number;
  amount: number;
  date: string;
  status: "paid" | "unpaid";
}
