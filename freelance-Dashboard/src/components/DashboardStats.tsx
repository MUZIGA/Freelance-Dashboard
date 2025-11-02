import { useAppState } from "../state/context";
import { ProjectStatus, PaymentStatus } from "../state/types";

const DashboardStats = ({ className = "" }: { className?: string }) => {
  const { projects } = useAppState();

  const totalProjects = projects.length;
  const paidProjects = projects.filter(p => p.paymentStatus === PaymentStatus.Paid).length;
  const unpaidProjects = totalProjects - paidProjects;

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <div className="p-4 bg-blue-100 rounded">Total Projects: {totalProjects}</div>
      <div className="p-4 bg-green-100 rounded">Paid: {paidProjects}</div>
      <div className="p-4 bg-red-100 rounded">Unpaid: {unpaidProjects}</div>
    </div>
  );
};

export default DashboardStats;
