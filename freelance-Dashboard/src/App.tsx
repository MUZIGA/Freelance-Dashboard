import React, { useMemo, useState } from 'react';
import { ProjectStatus, PaymentStatus } from './state/types';
import { useAppState, useAppDispatch } from './state/context';
import { filterProjectsBy, searchByName } from './utils';
import DashboardStats from './components/DashboardStats';
import ProjectList from './components/ProjectList';
import ClientList from './components/Clientlist';

const Tabs = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-b">{children}</div>
);

const TabsTrigger = ({
  children,
  isActive,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 font-medium text-sm ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    } ${className}`}
  >
    {children}
  </button>
);

const Input = ({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
);

const Select = ({
  children,
  value,
  onChange,
  className = '',
}: {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${className}`}
  >
    {children}
  </select>
);

function App() {
  const { projects, clients } = useAppState();
  const dispatch = useAppDispatch();

  
  const [activeTab, setActiveTab] = useState<'projects' | 'clients'>('projects');
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [filterPayment, setFilterPayment] = useState<PaymentStatus | 'all'>('all');

  
  const filteredProjects = useMemo(() => {
    let result = [...projects];
    if (filterStatus !== 'all') {
      result = filterProjectsBy(result, { status: filterStatus });
    }
    if (filterPayment !== 'all') {
      result = filterProjectsBy(result, { paymentStatus: filterPayment });
    }
    if (query.trim()) {
      result = searchByName(result, query);
    }
    return result;
  }, [projects, filterStatus, filterPayment, query]);

  
  const filteredClients = useMemo(() => {
    return query.trim() ? searchByName([...clients], query) : [...clients];
  }, [clients, query]);

  
  const handleProjectStatusChange = (projectId: string, status: ProjectStatus) => {
    dispatch({
      type: 'UPDATE_PROJECT_STATUS',
      payload: { projectId, status },
    });
  };

  const handlePaymentStatusChange = (
    projectId: string,
    paymentStatus: PaymentStatus
  ) => {
    if (paymentStatus === 'paid') {
      dispatch({
        type: 'MARK_PROJECT_PAID',
        payload: { projectId },
      });
    }
  };

  const handleClientClick = (clientId: string) => {
    setActiveTab('projects');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Freelance Dashboard</h1>
        </div>
      </header>

    
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <DashboardStats className="mb-8" />

        <div className="bg-white shadow rounded-lg overflow-hidden">
        
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                />
              </div>

              {activeTab === 'projects' && (
                <>
                  <Select value={filterStatus} onChange={setFilterStatus} className="w-48">
                    <option value="all">All Statuses</option>
                    {Object.values(ProjectStatus).map((status) => (
                      <option key={status} value={status}>
                        {status
                          .split('_')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                          )
                          .join(' ')}
                      </option>
                    ))}
                  </Select>

                  <Select value={filterPayment} onChange={setFilterPayment} className="w-48">
                    <option value="all">All Payments</option>
                    {['paid', 'unpaid', 'partially_paid'].map((status) => (
                      <option key={status} value={status}>
                        {status
                          .split('_')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                          )
                          .join(' ')}
                      </option>
                    ))}
                  </Select>
                </>
              )}
            </div>
          </div>

          
          <Tabs className="px-6 pt-2">
            <TabsList>
              <TabsTrigger
                isActive={activeTab === 'projects'}
                onClick={() => setActiveTab('projects')}
              >
                Projects ({projects.length})
              </TabsTrigger>
              <TabsTrigger
                isActive={activeTab === 'clients'}
                onClick={() => setActiveTab('clients')}
              >
                Clients ({clients.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

        
          <div className="p-6">
            {activeTab === 'projects' ? (
              <ProjectList
                projects={filteredProjects}
                clients={clients}
                onStatusChange={handleProjectStatusChange}
                onPaymentStatusChange={handlePaymentStatusChange}
              />
            ) : (
              <ClientList clients={filteredClients} onClientClick={handleClientClick} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
