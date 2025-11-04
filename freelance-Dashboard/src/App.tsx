import { useState } from 'react';
import { useApp } from './context/Appcontext';
import { ClientCard } from './components/ClientCard';
import { ProjectRow } from './components/ProjectRow';
import { DashboardStats } from './components/DashboardStats';
import {
  searchClients,
  searchProjects,
  filterProjects,
} from './utils/helpers';

function App() {
  const { state } = useApp();
  const [clientSearch, setClientSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  // ───── Filtered Data ─────
  const filteredClients = searchClients(state.clients, clientSearch);

  const projectResults = searchProjects(state.projects, projectSearch);
  let filteredProjects = projectResults;

 if (statusFilter === "pending" || statusFilter === "in-progress" || statusFilter === "completed") {
  filteredProjects = filterProjects(projectResults, { byStatus: statusFilter });
} else if (paymentFilter === "paid" || paymentFilter === "unpaid") {
  filteredProjects = filterProjects(projectResults, { byPayment: paymentFilter });
}


  // ───── Return JSX ─────
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Freelance Management Dashboard
        </h1>
      </header>

      <DashboardStats />

      {/* ───── Client Section ───── */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search clients..."
            value={clientSearch}
            onChange={e => setClientSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full max-w-xs"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map(c => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>
      </section>

      {/* ───── Project Section ───── */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={projectSearch}
            onChange={e => setProjectSearch(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={paymentFilter}
            onChange={e => setPaymentFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Client</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Payment</th>
                <th className="text-right p-3">Budget</th>
                <th className="text-center p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(p => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───── Payments Section ───── */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Payments</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Project ID</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {state.payments.map((pay, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{pay.projectId}</td>
                  <td className="p-3 text-right">
                    ${pay.amount.toLocaleString()}
                  </td>
                  <td className="p-3">
                    {new Date(pay.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
