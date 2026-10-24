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

export interface ClusterSizingInput {
  eventsPerSec: number;
  avgPayloadKb: number;
  retentionDays: number;
  replicationFactor: number;
}

export interface ClusterSizingResult {
  throughputMbPerSec: number;
  dailyIngestionGb: number;
  totalStorageTb: number;
  recommendedPartitions: number;
  recommendedBrokers: number;
  sparkExecutorCores: number;
  sparkMemoryGb: number;
  estimatedMonthlyCostUsd: number;
}

/**
 * Pure deterministic calculator for Big Data Kafka + Spark + Lakehouse sizing
 */
export function calculateClusterSizing(input: ClusterSizingInput): ClusterSizingResult {
  const safeEvents = Math.max(100, input.eventsPerSec);
  const safePayload = Math.max(0.1, input.avgPayloadKb);
  const safeRetention = Math.max(1, input.retentionDays);
  const safeReplication = Math.max(1, Math.min(5, input.replicationFactor));

  const throughputMbPerSec = Number(((safeEvents * safePayload) / 1024).toFixed(2));
  const dailyIngestionGb = Number(((throughputMbPerSec * 86400) / 1024).toFixed(1));
  // With Parquet/ZSTD compression (~0.35x raw) * replicationFactor
  const compressedStorageGb = dailyIngestionGb * safeRetention * safeReplication * 0.35;
  const totalStorageTb = Number((compressedStorageGb / 1024).toFixed(2));

  // Recommend 1 Kafka partition per ~10 MB/s write throughput (min 6)
  const recommendedPartitions = Math.max(6, Math.ceil(throughputMbPerSec / 8) * 3);
  const recommendedBrokers = Math.max(3, Math.ceil(recommendedPartitions / 12));

  // Spark Structured Streaming sizing: ~1 core per 2.5 MB/s, 4GB RAM per core
  const sparkExecutorCores = Math.max(4, Math.ceil(throughputMbPerSec / 2.5) * 2);
  const sparkMemoryGb = sparkExecutorCores * 4;

  // Estimated monthly cloud cost (compute + object storage)
  const storageCost = totalStorageTb * 23;
  const computeCost = recommendedBrokers * 140 + sparkExecutorCores * 28;
  const estimatedMonthlyCostUsd = Math.round(storageCost + computeCost);

  return {
    throughputMbPerSec,
    dailyIngestionGb,
    totalStorageTb,
    recommendedPartitions,
    recommendedBrokers,
    sparkExecutorCores,
    sparkMemoryGb,
    estimatedMonthlyCostUsd,
  };
}

/**
 * Inspect a JSON string and generate PySpark StructType & SQL DDL schemas
 */
export function generateSchemasFromJson(
  jsonText: string,
  tableName = 'events_lakehouse'
): {
  valid: boolean;
  error?: string;
  fieldCount: number;
  pysparkCode: string;
  sqlDdl: string;
  formattedJson: string;
} {
  try {
    const parsed = JSON.parse(jsonText);
    const sample = Array.isArray(parsed) ? parsed[0] || {} : parsed;
    if (typeof sample !== 'object' || sample === null || Array.isArray(sample)) {
      return {
        valid: false,
        error: 'Root element must be a JSON object or array of objects.',
        fieldCount: 0,
        pysparkCode: '',
        sqlDdl: '',
        formattedJson: jsonText,
      };
    }

    const entries = Object.entries(sample);
    const pysparkFields: string[] = [];
    const sqlColumns: string[] = [];

    for (const [key, val] of entries) {
      const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      let sparkType = 'StringType()';
      let sqlType = 'VARCHAR(255)';

      if (typeof val === 'number') {
        if (Number.isInteger(val)) {
          sparkType = 'LongType()';
          sqlType = 'BIGINT';
        } else {
          sparkType = 'DoubleType()';
          sqlType = 'DOUBLE PRECISION';
        }
      } else if (typeof val === 'boolean') {
        sparkType = 'BooleanType()';
        sqlType = 'BOOLEAN';
      } else if (Array.isArray(val)) {
        sparkType = 'ArrayType(StringType())';
        sqlType = 'JSONB';
      } else if (typeof val === 'object' && val !== null) {
        sparkType = 'MapType(StringType(), StringType())';
        sqlType = 'JSONB';
      } else if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
        sparkType = 'TimestampType()';
        sqlType = 'TIMESTAMP WITH TIME ZONE';
      }

      pysparkFields.push(`    StructField("${cleanKey}", ${sparkType}, True)`);
      sqlColumns.push(`  ${cleanKey} ${sqlType}`);
    }

    const pysparkCode = `from pyspark.sql.types import StructType, StructField, StringType, LongType, DoubleType, BooleanType, TimestampType, ArrayType, MapType\n\n${tableName}_schema = StructType([\n${pysparkFields.join(',\n')}\n])`;

    const sqlDdl = `CREATE TABLE IF NOT EXISTS ${tableName} (\n${sqlColumns.join(',\n')}\n) USING DELTA\nTBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true');`;

    return {
      valid: true,
      fieldCount: entries.length,
      pysparkCode,
      sqlDdl,
      formattedJson: JSON.stringify(parsed, null, 2),
    };
  } catch (err: any) {
    return {
      valid: false,
      error: err?.message || 'Invalid JSON syntax',
      fieldCount: 0,
      pysparkCode: '',
      sqlDdl: '',
      formattedJson: jsonText,
    };
  }
}

export interface ScrollbarMetrics {
  canScroll: boolean;
  thumbHeightPercent: number;
  thumbTopPercent: number;
  scrollProgressPercent: number;
}

/**
 * Pure calculation for minimalist liquid-glass scrollbar thumb geometry
 */
export function calculateScrollbarMetrics(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): ScrollbarMetrics {
  const maxScroll = Math.max(0, scrollHeight - clientHeight);
  const canScroll = maxScroll > 4 && clientHeight > 0;
  if (!canScroll) {
    return {
      canScroll: false,
      thumbHeightPercent: 0,
      thumbTopPercent: 0,
      scrollProgressPercent: 0,
    };
  }

  const clampedTop = Math.max(0, Math.min(maxScroll, scrollTop));
  const rawThumbPercent = (clientHeight / scrollHeight) * 100;
  const thumbHeightPercent = Number(Math.max(8, Math.min(40, rawThumbPercent)).toFixed(2));
  const progressRatio = clampedTop / maxScroll;
  const thumbTopPercent = Number((progressRatio * (100 - thumbHeightPercent)).toFixed(2));
  const scrollProgressPercent = Math.round(progressRatio * 100);

  return {
    canScroll: true,
    thumbHeightPercent,
    thumbTopPercent,
    scrollProgressPercent,
  };
}


