import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Database,
  Cloud,
  Cpu,
  HardDrive,
  Code,
  BarChart3,
  Search,
  Layers,
  X
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionViewportConfig,
  getBoundedStaggerDelay,
} from '../utils/motionVariants';

export const SkillsSection: React.FC = () => {
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [activeDomain, setActiveDomain] = useState<string>('All');

  const domainIcons: Record<string, React.ElementType> = {
    'Big Data & Distributed Systems': Database,
    'Cloud & Infrastructure': Cloud,
    'AI, Machine Learning & NLP': Cpu,
    'Databases, SQL & Warehousing': HardDrive,
    'Languages & Frameworks': Code,
    'Analytics, BI & Governance': BarChart3,
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchesDomain = activeDomain === 'All' || cat.domain === activeDomain;
    if (!matchesDomain) {
      return { ...cat, skills: [] };
    }

    const query = skillSearch.trim().toLowerCase();
    const filteredSkills = cat.skills.filter((skill) =>
      query === '' || skill.name.toLowerCase().includes(query)
    );

    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  const totalFilteredSkills = filteredCategories.reduce(
    (acc, curr) => acc + curr.skills.length,
    0
  );

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewportConfig}
      variants={sectionContainerVariants}
      className="py-16 px-4 sm:px-6"
    >
      <motion.div variants={sectionContainerVariants} className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div variants={sectionItemVariants} className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Technical Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-950">
            100/100 Core Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A comprehensive overview across distributed data engineering, cloud operations, machine learning pipelines, and cryptographic security.
          </p>
        </motion.div>

        {/* Search & Domain Filter */}
        <motion.div variants={sectionItemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveDomain('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeDomain === 'All'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.domain}
                onClick={() => setActiveDomain(cat.domain)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeDomain === cat.domain
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.domain.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. Spark, Kafka)..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
            />
            {skillSearch && (
              <button
                onClick={() => setSkillSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Counter */}
        <motion.div variants={sectionItemVariants} className="text-xs font-mono text-zinc-400">
          Displaying {totalFilteredSkills} verified competencies
        </motion.div>

        {/* Skills Grid */}
        <motion.div variants={sectionItemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const Icon = domainIcons[category.domain] || Layers;
            return (
              <motion.div
                key={category.domain}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.42,
                  delay: getBoundedStaggerDelay(idx, 0.06, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-3xl glass-panel border border-white/15 hover:border-white/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                  <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {category.domain}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {category.skills.length} competencies
                    </span>
                  </div>
                </div>

                {/* Skill List with Progress Bars */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-200 font-medium">{skill.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
