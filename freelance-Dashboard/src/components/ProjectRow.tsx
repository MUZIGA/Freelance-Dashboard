import React from 'react';
import { Project, useApp } from '../context/Appcontext';
import { findClientById } from '../utils/helpers';

interface Props {
  project: Project;
}

export const ProjectRow: React.FC<Props> = ({ project }) => {
  const { state, dispatch } = useApp();
  const client = findClientById(state.clients, project.clientId);

  const handleMarkPaid = () => {
    if (project.paymentStatus === 'paid') return;
    dispatch({
      type: 'MARK_PROJECT_PAID',
      payload: { projectId: project.id, amount: project.budget },
    });
  };

  const statusColor =
    project.status === 'completed'
      ? 'bg-green-100 text-green-800'
      : project.status === 'in-progress'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800';

  const paymentBadge =
    project.paymentStatus === 'paid'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-red-100 text-red-800';

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">{project.title}</td>
      <td className="p-3">{client?.name ?? 'Client not found'}</td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>
          {project.status}
        </span>
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded text-xs ${paymentBadge}`}>
          {project.paymentStatus}
        </span>
      </td>
      <td className="p-3 text-right">${project.budget.toLocaleString()}</td>
      <td className="p-3">
        {project.paymentStatus === 'unpaid' && (
          <button
            onClick={handleMarkPaid}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Mark Paid
          </button>
        )}
      </td>
    </tr>
  );
};