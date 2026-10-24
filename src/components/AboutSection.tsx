import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  GraduationCap,
  Sparkles,
  Database,
  Lock,
  Layers,
  Globe,
  Workflow,
  Award,
  Compass,
  GitBranch,
  Terminal,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import {
  PERSONAL_INFO,
  WHAT_I_DO,
  NEVAI_ECOSYSTEM,
  HEROS_SUITE,
  TRAINING_PROGRAMS,
  ROADMAP_ITEMS
} from '../data/portfolioData';
import {
  sectionContainerVariants,
  sectionItemVariants,
  staggerGridVariants,
  staggerCardVariants,
  sectionViewportConfig,
} from '../utils/motionVariants';

export const AboutSection: React.FC = () => {
  const [activeBlueprint, setActiveBlueprint] = useState<'warehouse' | 'star' | 'lifecycle' | 'nevai'>('warehouse');

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewportConfig}
      variants={sectionContainerVariants}
      className="py-16 px-4 sm:px-6"
    >
      <motion.div variants={sectionContainerVariants} className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <motion.div
          variants={sectionItemVariants}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Philosophy & Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-zara">
            Architecting Scalable Data Ecosystems
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </motion.div>

        {/* GitHub Profile Highlights Strip (26 Certs Badge / 73 Total / 137 Repos / 2,160 Contributions / 25 Matrix Bridges) */}
        <motion.div
          variants={staggerGridVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            { value: '73', label: 'Certifications', sub: 'Across 8 Domains' },
            { value: '137', label: 'Total Repositories', sub: '22 Public Portfolio' },
            { value: '2,160', label: 'Contributions', sub: '99% Pull Requests' },
            { value: '25', label: 'Matrix Bridges', sub: '@Nevai-Org Federation' },
            { value: '6', label: 'Heros Extensions', sub: 'Chromium MV3 Suite' },
            { value: '216', label: 'FastAPI Endpoints', sub: '29-Table Kimball DW' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerCardVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="p-4 rounded-2xl glass-panel border border-white/15 text-center"
            >
              <div className="text-2xl font-extrabold font-mono text-white">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* What I Do — 6 Core Engineering Disciplines */}
        <motion.div variants={sectionItemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Core Competencies
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-zara mt-1">
                What I Do Across 6 Engineering Pillars
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Spark · Airflow · Kafka · Cloud · AI/ML · Security
            </span>
          </div>

          <motion.div
            variants={staggerGridVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {WHAT_I_DO.map((item, idx) => (
              <motion.div
                key={item.discipline}
                variants={staggerCardVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl glass-panel border border-white/15 hover:border-white/35 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-zinc-200">
                      0{idx + 1} / Discipline
                    </span>
                    <Database className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {item.discipline}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-300">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* NEVAI Ecosystem (@Nevai-Org) & Heros Browser Suite Showcase */}
        <motion.div variants={staggerGridVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NEVAI Federation Card */}
          <motion.div
            variants={staggerCardVariants}
            className="p-6 sm:p-8 rounded-3xl liquid-glass border border-white/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Founder & Builder • @Nevai-Org
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  25 Matrix Bridges
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-zara">
                NEVAI Federated Workspace Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                A decentralized, federated workspace platform built from the ground up with its own open protocol, identity layer, encrypted office suite, AI agent tooling, and 25-bridge messaging federation over Matrix.
              </p>

              <div className="mt-5 space-y-2.5">
                {NEVAI_ECOSYSTEM.map((row) => (
                  <div
                    key={row.area}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="text-xs font-bold text-white shrink-0">
                      {row.area}
                    </span>
                    <span className="text-[11px] text-zinc-400 sm:text-right">
                      {row.built}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Heros Browser Suite Card (6 Chromium MV3 Extensions) */}
          <motion.div
            variants={staggerCardVariants}
            className="p-6 sm:p-8 rounded-3xl liquid-glass border border-white/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Heros Browser Suite v2.2.0
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  6 Chromium (MV3) Extensions
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-zara">
                Free, Private, Unlimited, 100% Local
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Six Chromium (MV3) browser studios unified under one monochrome design language — running offline KaTeX math, Mermaid diagrams, and a real in-browser Python WebAssembly kernel.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HEROS_SUITE.map((ext) => (
                  <div
                    key={ext.name}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">
                        {ext.name}
                      </span>
                      <Boxes className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      {ext.description}
                    </p>
                    <span className="inline-block mt-2 text-[9px] font-mono text-zinc-300 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {ext.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive System Architecture & Data Warehouse Blueprints */}
        <motion.div
          variants={sectionItemVariants}
          className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <Workflow className="w-3.5 h-3.5 text-white" />
                <span>Interactive Architecture Diagrams</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-zara mt-1">
                Production Data & Federation Blueprints
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'warehouse', label: 'Web-to-Warehouse Flow' },
                { id: 'star', label: 'Kimball Star Schema' },
                { id: 'lifecycle', label: 'Pipeline States' },
                { id: 'nevai', label: 'NEVAI Federation' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveBlueprint(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeBlueprint === tab.id
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeBlueprint === 'warehouse' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {[
                { step: '01', name: '35 Web & API Sources', desc: 'Ingest raw product & pricing streams' },
                { step: '02', name: 'Cleaning & Dedupe', desc: 'Fuzzy matching & standardization' },
                { step: '03', name: 'Kimball Warehouse', desc: '29 conformed fact & dim tables' },
                { step: '04', name: 'Data Quality Gate', desc: 'Validate 12 automated DQ rules' },
                { step: '05', name: 'Airflow DAGs', desc: 'Orchestrate 33 dependency tasks' },
                { step: '06', name: 'FastAPI Service', desc: 'Serve 23 routers / 216 endpoints' },
                { step: '07', name: 'React 19 UI', desc: 'Real-time analytics & feedback loop' },
              ].map((node) => (
                <div
                  key={node.step}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-zinc-400">
                    STEP {node.step}
                  </span>
                  <div className="text-xs font-bold text-white mt-2">
                    {node.name}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeBlueprint === 'star' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  table: 'FACT_PRICE_HISTORY',
                  type: 'FACT TABLE',
                  cols: ['fact_key (PK)', 'product_key (FK)', 'source_key (FK)', 'date_key (FK)', 'price (DECIMAL)', 'discount (DECIMAL)'],
                },
                {
                  table: 'DIM_PRODUCT',
                  type: 'DIMENSION',
                  cols: ['product_key (PK)', 'product_name', 'brand', 'category_key (FK)'],
                },
                {
                  table: 'DIM_SOURCE',
                  type: 'DIMENSION',
                  cols: ['source_key (PK)', 'source_name', 'source_type'],
                },
                {
                  table: 'DIM_CATEGORY',
                  type: 'DIMENSION',
                  cols: ['category_key (PK)', 'category_name', 'department'],
                },
                {
                  table: 'DIM_DATE',
                  type: 'DIMENSION',
                  cols: ['date_key (PK)', 'full_date (DATE)', 'year (INT)', 'quarter (INT)'],
                },
              ].map((tbl) => (
                <div
                  key={tbl.table}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 font-mono"
                >
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    {tbl.type}
                  </span>
                  <div className="text-xs font-bold text-white mt-2 break-all">
                    {tbl.table}
                  </div>
                  <ul className="mt-2.5 space-y-1 text-[10px] text-zinc-400">
                    {tbl.cols.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeBlueprint === 'lifecycle' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { state: 'Raw', transition: 'Extract & profile incoming streams' },
                { state: 'Quarantined', transition: 'Schema drift detected → fix & replay' },
                { state: 'Cleansed', transition: 'Type casting & null normalization' },
                { state: 'Deduplicated', transition: 'Fuzzy entity resolution passed' },
                { state: 'Modeled', transition: '29-table Kimball Star modeling' },
                { state: 'Validated & Served', transition: '12 DQ rules pass → 216 API endpoints' },
              ].map((st) => (
                <div
                  key={st.state}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/15"
                >
                  <div className="text-xs font-bold text-white font-mono">
                    [{st.state}]
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1.5">
                    {st.transition}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeBlueprint === 'nevai' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { node: 'SearchEngine', methods: '+privacyFirst() · +query(text) · +rank(results)' },
                { node: 'OfficeSuite', methods: '+docs() · +sheets() · +whiteboards()' },
                { node: 'IdentityLayer', methods: '+federatedLogin() · +noCentralAuthority()' },
                { node: 'OpenSDK', methods: '+buildExtensions() · +protocolHooks()' },
                { node: 'AIAgentLayer', methods: '+assist() · +automate() · +localRAG()' },
                { node: 'BridgeHub (25 Bridges)', methods: '+matrixCSApi() · +presenceSync() · +readStateRelay()' },
              ].map((cls) => (
                <div
                  key={cls.node}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 font-mono"
                >
                  <div className="text-xs font-bold text-white">{cls.node}</div>
                  <div className="text-[10px] text-zinc-400 mt-1.5">
                    {cls.methods}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Training & Programs + 2026–2027 Roadmap */}
        <motion.div variants={staggerGridVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training & Programs */}
          <motion.div
            variants={staggerCardVariants}
            className="p-4 sm:p-6 rounded-3xl glass-panel border border-white/15 space-y-4 overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-white shrink-0" />
                <span>Training & Elite Programs</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 shrink-0">
                7 Verified Programs
              </span>
            </div>
            <div className="space-y-2.5">
              {TRAINING_PROGRAMS.map((tp) => (
                <div
                  key={tp.program}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3"
                >
                  <span className="text-xs font-bold text-white leading-snug">
                    {tp.program}
                  </span>
                  <span className="self-start sm:self-auto text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 max-w-full break-words sm:shrink-0">
                    {tp.detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2026–2027 Engineering Roadmap */}
          <motion.div
            variants={staggerCardVariants}
            className="p-4 sm:p-6 rounded-3xl glass-panel border border-white/15 space-y-4 overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-white shrink-0" />
                <span>Engineering Roadmap (2026 – 2027)</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 shrink-0">
                Active Build Train
              </span>
            </div>
            <div className="space-y-2.5">
              {ROADMAP_ITEMS.map((rm) => (
                <div
                  key={rm.item}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      {rm.section}
                    </span>
                    <span className="text-xs font-bold text-white block leading-snug">
                      {rm.item}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-black font-bold inline-block">
                      {rm.status}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                      {rm.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Academic Card */}
        <motion.div
          variants={sectionItemVariants}
          className="p-4 sm:p-8 rounded-3xl glass-panel border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {PERSONAL_INFO.education.institution}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20 text-xs font-mono font-semibold shrink-0">
                  {PERSONAL_INFO.education.gpa}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-0.5">
                Bachelor of Science in {PERSONAL_INFO.education.degree}
              </p>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                {PERSONAL_INFO.education.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xs font-mono text-zinc-400">Track Record</span>
              <span className="text-sm font-bold text-white">Top Performer AI & ML</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xs font-mono text-zinc-400">Open Source & GitHub</span>
              <span className="text-sm font-bold text-white">137 Repos • 2,160 Contributions</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
