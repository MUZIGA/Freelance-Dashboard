import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// ──────────────────────
// Types & Models
// ──────────────────────
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
  status: 'pending' | 'in-progress' | 'completed';
  paymentStatus: 'paid' | 'unpaid';
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO
}

// ──────────────────────
// State
// ──────────────────────
interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// ──────────────────────
// Discriminated Union Actions
// ──────────────────────
type AppAction =
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string; amount: number } }
  | { type: 'ADD_PAYMENT'; payload: Payment };

// ──────────────────────
// Initial Data (at least 2 clients, 2 projects, 1 payment)
// ──────────────────────
const initialState: AppState = {
  clients: [
    { id: 'c1', name: ' Judith Muziga', country: 'RWANDA', email: 'umuzigajudit@gmali.com' },
    { id: 'c2', name: 'Betty Ntenge', country:'RWANDA' ,email: 'ntegebett@gmal.com' },
  ],
  projects: [
    {
      id: 'p1',
      clientId: 'c1',
      title: 'Muraho Technolog',
      budget: 5000,
      status: 'in-progress',
      paymentStatus: 'unpaid',
    },
    {
      id: 'p2',
      clientId: 'c2',
      title: 'Africa Improved Food',
      budget: 12000,
      status: 'completed',
      paymentStatus: 'paid',
    },
  ],
  payments: [
    { projectId: 'p2', amount: 12000, date: new Date().toISOString() },
  ],
};

// ──────────────────────
// Reducer
// ──────────────────────
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'MARK_PROJECT_PAID': {
      const { projectId, amount } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (!project || project.paymentStatus === 'paid') return state;

      const newPayment: Payment = {
        projectId,
        amount,
        date: new Date().toISOString(),
      };

      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === projectId ? { ...p, paymentStatus: 'paid' } : p
        ),
        payments: [...state.payments, newPayment],
      };
    }
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    default:
      return state;
  }
}

// ──────────────────────
// Context
// ──────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};