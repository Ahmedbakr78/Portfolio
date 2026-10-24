import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterCertifications,
  calculateStats,
  formatCredentialId,
  calculateClusterSizing,
  generateSchemasFromJson,
  ProjectItem,
  CertificationItem,
} from './portfolioLogic.js';
import {
  VIBE_SOUNDS,
  VIBE_CATEGORIES,
  filterVibeSounds,
} from './vibeAudioEngine.js';

const mockProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'Production-Grade Big Data Pipeline',
    category: 'Big Data',
    description: 'A comprehensive big data processing pipeline built with Spark.',
    tags: ['Spark', 'Kafka', 'Airflow'],
    stars: 1,
    forks: 1,
  },
  {
    id: '2',
    title: 'MIZAN — Egyptian Arabic Legal Assistant',
    category: 'AI & ML',
    description: 'Advanced Natural Language Processing system for Egyptian Arabic legal documents.',
    tags: ['Python', 'NLP', 'RAG'],
    stars: 0,
    forks: 0,
  },
  {
    id: '3',
    title: 'Blockchain Voting System',
    category: 'Security',
    description: 'Decentralized voting platform ensuring transparency.',
    tags: ['Python', 'Blockchain', 'Security'],
    stars: 0,
    forks: 0,
  },
];

const mockCerts: CertificationItem[] = [
  {
    id: 'c1',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    date: 'Oct 2026',
    credentialId: 'IGMH7QR80YHY',
  },
  {
    id: 'c2',
    title: 'Microsoft AI & ML Engineering',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    credentialId: 'BJQ4SWD8YQK9',
  },
  {
    id: 'c3',
    title: 'MLOps Specialization',
    issuer: 'Duke University',
    date: 'Sep 2026',
    credentialId: 'FFI6MAZIV65Z',
  },
];

test('filterProjects filters by category properly', () => {
  const result = filterProjects(mockProjects, 'Big Data', '');
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Production-Grade Big Data Pipeline');
});

test('filterProjects searches across titles, descriptions, and tags', () => {
  const resultByTag = filterProjects(mockProjects, 'All', 'kafka');
  assert.equal(resultByTag.length, 1);

  const resultByDesc = filterProjects(mockProjects, 'All', 'legal');
  assert.equal(resultByDesc.length, 1);
  assert.equal(resultByDesc[0].id, '2');
});

test('filterCertifications searches by query and filters by issuer', () => {
  const byIssuer = filterCertifications(mockCerts, 'Microsoft', '');
  assert.equal(byIssuer.length, 1);
  assert.equal(byIssuer[0].issuer, 'Microsoft');

  const byQuery = filterCertifications(mockCerts, 'All', 'Duke');
  assert.equal(byQuery.length, 1);
  assert.equal(byQuery[0].credentialId, 'FFI6MAZIV65Z');
});

test('calculateStats aggregates numbers correctly', () => {
  const stats = calculateStats(mockProjects, mockCerts);
  assert.equal(stats.totalProjects, 3);
  assert.equal(stats.totalStars, 1);
  assert.equal(stats.totalForks, 1);
  assert.equal(stats.totalCerts, 3);
  assert.equal(stats.verifiedCerts, 3);
  assert.equal(stats.totalIssuers, 3);
  assert.equal(stats.contributions, 410);
});

test('formatCredentialId truncates long hashes and handles empty', () => {
  assert.equal(formatCredentialId(''), 'Verified via Organization');
  assert.equal(formatCredentialId('12345'), '12345');
  const longId = 'a49190f6-303d-11f1-ba94-e7c940fb3e00';
  assert.equal(formatCredentialId(longId), 'a49190f6-3...fb3e00');
});

test('Nevai Vibe contains all 84 sounds across 8 categories', () => {
  assert.equal(VIBE_SOUNDS.length, 84);
  assert.equal(VIBE_CATEGORIES.length, 8);
  const rainSounds = filterVibeSounds(VIBE_SOUNDS, 'Rain', '');
  assert.equal(rainSounds.length, 8);
  const searchBowl = filterVibeSounds(VIBE_SOUNDS, 'All', 'Singing Bowl');
  assert.equal(searchBowl.length, 1);
  assert.equal(searchBowl[0].id, 'thi-bowl');
});

test('calculateClusterSizing computes deterministic Kafka and Spark sizing', () => {
  const res = calculateClusterSizing({
    eventsPerSec: 25000,
    avgPayloadKb: 2,
    retentionDays: 30,
    replicationFactor: 3,
  });
  assert.equal(res.throughputMbPerSec, 48.83);
  assert.equal(res.recommendedPartitions >= 18, true);
  assert.equal(res.recommendedBrokers >= 3, true);
  assert.equal(res.sparkExecutorCores >= 8, true);
  assert.equal(res.estimatedMonthlyCostUsd > 0, true);
});

test('generateSchemasFromJson converts JSON payload into PySpark and SQL DDL', () => {
  const sampleJson = JSON.stringify({
    event_id: 'evt_901',
    user_id: 42019,
    amount_usd: 149.95,
    is_verified: true,
    created_at: '2026-10-24T12:00:00Z',
  });
  const out = generateSchemasFromJson(sampleJson, 'payments_stream');
  assert.equal(out.valid, true);
  assert.equal(out.fieldCount, 5);
  assert.equal(out.pysparkCode.includes('StructField("user_id", LongType(), True)'), true);
  assert.equal(out.pysparkCode.includes('StructField("amount_usd", DoubleType(), True)'), true);
  assert.equal(out.sqlDdl.includes('CREATE TABLE IF NOT EXISTS payments_stream'), true);
});

test('calculateScrollbarMetrics computes thumb height and scroll position accurately', async () => {
  const { calculateScrollbarMetrics } = await import('./portfolioLogic.js');
  const topState = calculateScrollbarMetrics(0, 4000, 800);
  assert.equal(topState.canScroll, true);
  assert.equal(topState.thumbHeightPercent, 20);
  assert.equal(topState.thumbTopPercent, 0);
  assert.equal(topState.scrollProgressPercent, 0);

  const midState = calculateScrollbarMetrics(1600, 4000, 800);
  assert.equal(midState.canScroll, true);
  assert.equal(midState.thumbTopPercent, 40);
  assert.equal(midState.scrollProgressPercent, 50);

  const endState = calculateScrollbarMetrics(3200, 4000, 800);
  assert.equal(endState.thumbTopPercent, 80);
  assert.equal(endState.scrollProgressPercent, 100);
});

test('motionVariants defines staggered fade-in variants and bounded delay logic', async () => {
  const {
    sectionContainerVariants,
    sectionItemVariants,
    staggerGridVariants,
    staggerCardVariants,
    sectionViewportConfig,
    getBoundedStaggerDelay,
  } = await import('./motionVariants.js');

  assert.equal(sectionViewportConfig.once, true);
  assert.equal(sectionViewportConfig.amount, 0.02);

  const containerVisible = sectionContainerVariants.visible as Record<string, any>;
  assert.equal(containerVisible.opacity, 1);
  assert.equal(containerVisible.transition.staggerChildren, 0.12);

  const itemHidden = sectionItemVariants.hidden as Record<string, any>;
  const itemVisible = sectionItemVariants.visible as Record<string, any>;
  assert.equal(itemHidden.opacity, 0);
  assert.equal(itemHidden.y, 24);
  assert.equal(itemVisible.opacity, 1);
  assert.equal(itemVisible.y, 0);

  const gridVisible = staggerGridVariants.visible as Record<string, any>;
  assert.equal(gridVisible.transition.staggerChildren, 0.06);

  const cardHidden = staggerCardVariants.hidden as Record<string, any>;
  assert.equal(cardHidden.opacity, 0);
  assert.equal(cardHidden.y, 18);

  assert.equal(getBoundedStaggerDelay(0, 0.05, 0.35), 0);
  assert.equal(getBoundedStaggerDelay(3, 0.05, 0.35), 0.15);
  assert.equal(getBoundedStaggerDelay(20, 0.05, 0.35), 0.35);
});



