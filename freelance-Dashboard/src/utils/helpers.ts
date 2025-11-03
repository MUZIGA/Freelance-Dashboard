import { Client, Project, Payment } from '../Context/AppContext';

// ───── Count paid / unpaid ─────
export const countPaymentStatus = (projects: Project[]) => {
  const paid = projects.filter(p => p.paymentStatus === 'paid').length;
  const unpaid = projects.filter(p => p.paymentStatus === 'unpaid').length;
  return { paid, unpaid };
};

// ───── Find client safely ─────
export const findClientById = (
  clients: Client[],
  id: string
): Client | undefined => clients.find(c => c.id === id);

// ───── Record new payment (validation) ─────
export const recordPayment = (
  projectId: string,
  amount: number
): Payment => {
  if (amount <= 0) throw new Error('Amount must be positive');
  return { projectId, amount, date: new Date().toISOString() };
};

// ───── Filter projects ─────
export const filterProjects = (
  projects: Project[],
  filter:
    | { byStatus: Project['status'] }
    | { byPayment: Project['paymentStatus'] }
    | {}
) => {
  if ('byStatus' in filter) {
    return projects.filter(p => p.status === filter.byStatus);
  }
  if ('byPayment' in filter) {
    return projects.filter(p => p.paymentStatus === filter.byPayment);
  }
  return projects;
};

// ───── Search (name/title) ─────
export const searchClients = (clients: Client[], term: string) =>
  clients.filter(c =>
    c.name.toLowerCase().includes(term.toLowerCase())
  );

export const searchProjects = (projects: Project[], term: string) =>
  projects.filter(p =>
    p.title.toLowerCase().includes(term.toLowerCase())
  );