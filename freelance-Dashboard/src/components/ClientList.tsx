import React from 'react';
import { Client } from '../state/types';

interface ClientListProps {
  clients: Client[];
  onClientClick: (clientId: string) => void;
  className?: string;
}

const ClientList: React.FC<ClientListProps> = ({ 
  clients, 
  onClientClick,
  className = '' 
}) => {
  if (clients.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No clients found</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {clients.map((client) => (
        <div 
          key={client.id}
          onClick={() => onClientClick(client.id)}
          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{client.name}</h3>
              {client.email && (
                <p className="text-sm text-gray-500 mt-1">{client.email}</p>
              )}
              {client.phone && (
                <p className="text-sm text-gray-500">{client.phone}</p>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {client.projectsCount ? (
                <span>{client.projectsCount} projects</span>
              ) : (
                <span>No projects</span>
              )}
            </div>
          </div>
          
          {client.company && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {client.company}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientList;