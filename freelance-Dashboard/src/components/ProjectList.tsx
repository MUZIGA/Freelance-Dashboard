import { Project, Client, ProjectStatus, PaymentStatus } from "../state/types";

interface Props {
  projects: Project[];
  clients: Client[];
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
  onPaymentStatusChange: (projectId: string, status: PaymentStatus) => void;
}

const ProjectList = ({ projects, clients, onStatusChange, onPaymentStatusChange }: Props) => {
  return (
    <div className="space-y-4">
      {projects.map(project => {
        const client = clients.find(c => c.id === project.clientId);
        return (
          <div key={project.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-bold">{project.title}</div>
              <div className="text-sm text-gray-500">Client: {client?.name || "Client not found"}</div>
              <div className="text-sm text-gray-500">Budget: ${project.budget}</div>
            </div>
            <div className="flex space-x-2">
              <select
                value={project.status}
                onChange={(e) => onStatusChange(project.id, e.target.value as ProjectStatus)}
                className="border p-1 rounded"
              >
                {Object.values(ProjectStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={project.paymentStatus}
                onChange={(e) => onPaymentStatusChange(project.id, e.target.value as PaymentStatus)}
                className="border p-1 rounded"
              >
                {Object.values(PaymentStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
