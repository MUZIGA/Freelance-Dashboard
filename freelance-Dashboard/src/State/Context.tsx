import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Action, State, ProjectStatus, PaymentStatus } from "./types";

// ✅ Initial example data
const initialState: State = {
  clients: [
    { id: "c1", name: "John Doe", country: "USA", email: "john@example.com" },
    { id: "c2", name: "Jane Smith", country: "Rwanda" },
  ],
  projects: [
    {
      id: "p1",
      clientId: "c1",
      title: "Website Redesign",
      budget: 500,
      status: ProjectStatus.InProgress,
      paymentStatus: PaymentStatus.Unpaid,
    },
    {
      id: "p2",
      clientId: "c2",
      title: "Mobile App",
      budget: 1000,
      status: ProjectStatus.Pending,
      paymentStatus: PaymentStatus.Paid,
    },
  ],
  payments: [
    { projectId: "p2", amount: 1000, date: "2025-10-30" },
  ],
};

// ✅ Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MARK_PROJECT_PAID":
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, paymentStatus: PaymentStatus.Paid }
            : p
        ),
      };

    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, status: action.payload.status }
            : p
        ),
      };

    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };

    default:
      return state;
  }
}

// ✅ Contexts
const AppStateContext = createContext<State | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

// ✅ Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// ✅ Custom hooks
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used inside AppProvider");
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (!context) throw new Error("useAppDispatch must be used inside AppProvider");
  return context;
}
