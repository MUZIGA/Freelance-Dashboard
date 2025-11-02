import { Project, Client, Payment, ProjectStatus } from "../types";

// Action Types
export const ActionTypes = {
  ADD_PAYMENT: "ADD_PAYMENT",
  MARK_PROJECT_PAID: "MARK_PROJECT_PAID",
  ADD_CLIENT: "ADD_CLIENT",
  ADD_PROJECT: "ADD_PROJECT",
  UPDATE_PROJECT_STATUS: "UPDATE_PROJECT_STATUS",
  DELETE_PROJECT: "DELETE_PROJECT",
  UPDATE_CLIENT: "UPDATE_CLIENT",
  DELETE_CLIENT: "DELETE_CLIENT"
} as const;

// Action Interfaces
export interface AddPaymentAction {
  type: typeof ActionTypes.ADD_PAYMENT;
  payload: {
    payment: Omit<Payment, 'date'> & { date?: string };
  };
}

export interface MarkProjectPaidAction {
  type: typeof ActionTypes.MARK_PROJECT_PAID;
  payload: {
    projectId: string;
    date?: string;
  };
}

export interface AddClientAction {
  type: typeof ActionTypes.ADD_CLIENT;
  payload: {
    client: Omit<Client, 'id'> & { id?: string };
  };
}

export interface AddProjectAction {
  type: typeof ActionTypes.ADD_PROJECT;
  payload: {
    project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
}

export interface UpdateProjectStatusAction {
  type: typeof ActionTypes.UPDATE_PROJECT_STATUS;
  payload: {
    projectId: string;
    status: ProjectStatus;
  };
}

export interface DeleteProjectAction {
  type: typeof ActionTypes.DELETE_PROJECT;
  payload: {
    projectId: string;
  };
}

export interface UpdateClientAction {
  type: typeof ActionTypes.UPDATE_CLIENT;
  payload: {
    clientId: string;
    updates: Partial<Omit<Client, 'id'>>;
  };
}

export interface DeleteClientAction {
  type: typeof ActionTypes.DELETE_CLIENT;
  payload: {
    clientId: string;
  };
}

// Union type of all actions
export type Action =
  | AddPaymentAction
  | MarkProjectPaidAction
  | AddClientAction
  | AddProjectAction
  | UpdateProjectStatusAction
  | DeleteProjectAction
  | UpdateClientAction
  | DeleteClientAction;

// Action Creators
export const addPayment = (payment: Omit<Payment, 'date'> & { date?: string }): AddPaymentAction => ({
  type: ActionTypes.ADD_PAYMENT,
  payload: {
    payment: {
      ...payment,
      date: payment.date || new Date().toISOString(),
    },
  },
});

export const markProjectPaid = (projectId: string, date?: string): MarkProjectPaidAction => ({
  type: ActionTypes.MARK_PROJECT_PAID,
  payload: {
    projectId,
    date: date || new Date().toISOString(),
  },
});

export const addClient = (client: Omit<Client, 'id'> & { id?: string }): AddClientAction => ({
  type: ActionTypes.ADD_CLIENT,
  payload: {
    client: {
      ...client,
      id: client.id || generateId(),
    },
  },
});

export const addProject = (
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }
): AddProjectAction => ({
  type: ActionTypes.ADD_PROJECT,
  payload: {
    project: {
      ...project,
      id: project.id || generateId(),
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: project.updatedAt || new Date().toISOString(),
    },
  },
});

export const updateProjectStatus = (
  projectId: string,
  status: ProjectStatus
): UpdateProjectStatusAction => ({
  type: ActionTypes.UPDATE_PROJECT_STATUS,
  payload: {
    projectId,
    status,
  },
});

export const deleteProject = (projectId: string): DeleteProjectAction => ({
  type: ActionTypes.DELETE_PROJECT,
  payload: {
    projectId,
  },
});

export const updateClient = (
  clientId: string,
  updates: Partial<Omit<Client, 'id'>>
): UpdateClientAction => ({
  type: ActionTypes.UPDATE_CLIENT,
  payload: {
    clientId,
    updates,
  },
});

export const deleteClient = (clientId: string): DeleteClientAction => ({
  type: ActionTypes.DELETE_CLIENT,
  payload: {
    clientId,
  },
});

// Helper function to generate IDs (you might want to use a proper ID generation library)
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};