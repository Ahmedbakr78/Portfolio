/**
 * Pure helper logic for Ahmed Abo Bakr's portfolio:
 * Filtering, searching, sorting, statistics, and state calculations.
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Big Data' | 'AI & ML' | 'Full-Stack' | 'Data Engineering' | 'Security' | 'Database';
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  architecture?: string;
  metrics?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
  featured?: boolean;
}

/**
 * Filter projects by category and text search
 */
export function filterProjects(
  projects: ProjectItem[],
  selectedCategory: string,
  searchQuery: string
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();
  return projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery =
      query === '' ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
}

/**
 * Filter certifications by issuer and query
 */
export function filterCertifications(
  certs: CertificationItem[],
  selectedIssuer: string,
  searchQuery: string
): CertificationItem[] {
  const query = searchQuery.trim().toLowerCase();
  return certs.filter((c) => {
    const matchesIssuer =
      selectedIssuer === 'All' || c.issuer.toLowerCase() === selectedIssuer.toLowerCase();
    const matchesQuery =
      query === '' ||
      c.title.toLowerCase().includes(query) ||
      c.issuer.toLowerCase().includes(query) ||
      (c.credentialId && c.credentialId.toLowerCase().includes(query)) ||
      (c.skills && c.skills.some((s) => s.toLowerCase().includes(query)));
    return matchesIssuer && matchesQuery;
  });
}

/**
 * Compute portfolio statistics summary
 */
export function calculateStats(
  projects: ProjectItem[],
  certifications: CertificationItem[]
) {
  const totalStars = projects.reduce((acc, curr) => acc + curr.stars, 0);
  const totalForks = projects.reduce((acc, curr) => acc + curr.forks, 0);
  const totalCerts = certifications.length;
  const verifiedCerts = certifications.filter((c) => Boolean(c.credentialId)).length;
  
  const issuers = Array.from(new Set(certifications.map((c) => c.issuer)));

  return {
    totalProjects: projects.length,
    totalStars,
    totalForks,
    totalCerts,
    verifiedCerts,
    totalIssuers: issuers.length,
    contributions: 410,
    pullRequestsPercent: 93,
    codeReviewPercent: 7,
  };
}

/**
 * Format credential ID display
 */
export function formatCredentialId(id?: string): string {
  if (!id) return 'Verified via Organization';
  return id.length > 24 ? `${id.slice(0, 10)}...${id.slice(-6)}` : id;
}
