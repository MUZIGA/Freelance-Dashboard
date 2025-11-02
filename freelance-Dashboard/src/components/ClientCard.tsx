import { Client } from "../types";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <h4 className="font-semibold text-lg text-gray-800">{client.name}</h4>
      {client.country && (
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <span className="mr-1">🌍</span>
          <span>{client.country}</span>
        </div>
      )}
      {client.email ? (
        <a 
          href={`mailto:${client.email}`}
          className="mt-1 inline-block text-sm text-blue-600 hover:underline"
        >
          {client.email}
        </a>
      ) : (
        <p className="mt-1 text-xs text-gray-400">No email provided</p>
      )}
    </div>
  );
}

export default ClientCard;