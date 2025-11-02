import { Client, Project } from "../state/types";

// Search projects or clients by name
export function searchByName<T extends { name: string }>(data: T[], query: string): T[] {
  return data.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));
}

// Filter projects by status or payment
export function filterProjectsBy(
  projects: Project[],
  filter: { status?: string; paymentStatus?: string }
): Project[] {
  return projects.filter(project => {
    const statusMatch = filter.status ? project.status === filter.status : true;
    const paymentMatch = filter.paymentStatus ? project.paymentStatus === filter.paymentStatus : true;
    return statusMatch && paymentMatch;
  });
}
