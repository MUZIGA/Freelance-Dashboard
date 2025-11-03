import React from 'react';
import { Client } from '../context/Appcontext';

interface Props {
  client: Client;
}

export const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="border rounded p-4 mb-3 bg-white shadow-sm">
      <h3 className="font-semibold text-lg">{client.name}</h3>
      <p className="text-sm text-gray-600">{client.country}</p>
      {client.email && <p className="text-sm text-blue-600">{client.email}</p>}
    </div>
  );
};