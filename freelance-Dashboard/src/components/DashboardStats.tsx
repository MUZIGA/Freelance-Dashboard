import React from 'react';
import { useApp } from '../Context/AppContext';
import { countPaymentStatus } from '../utils/helpers';

export const DashboardStats: React.FC = () => {
  const { state } = useApp();
  const { paid, unpaid } = countPaymentStatus(state.projects);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded shadow">
        <h3 className="font-semibold text-blue-900">Total Projects</h3>
        <p className="text-2xl font-bold text-blue-700">{state.projects.length}</p>
      </div>
      <div className="bg-green-50 p-4 rounded shadow">
        <h3 className="font-semibold text-green-900">Paid</h3>
        <p className="text-2xl font-bold text-green-700">{paid}</p>
      </div>
      <div className="bg-red-50 p-4 rounded shadow">
        <h3 className="font-semibold text-red-900">Unpaid</h3>
        <p className="text-2xl font-bold text-red-700">{unpaid}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded shadow">
        <h3 className="font-semibold text-purple-900">Total Revenue</h3>
        <p className="text-2xl font-bold text-purple-700">
          ${state.payments.reduce((s, p) => s + p.amount, 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
};