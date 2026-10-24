import React, { useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import {
  Layers,
  Search,
  Star,
  GitFork,
  Github,
  X,
  Database,
  ArrowRight,
  Sparkles,
  Workflow
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';

interface ProjectTiltCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectTiltCard: React.FC<ProjectTiltCardProps> = ({ project, onOpenModal }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5.5, -5.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5.5, 5.5]), springConfig);
  const smoothSpotX = useSpring(spotX, springConfig);
  const smoothSpotY = useSpring(spotY, springConfig);

  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${smoothSpotX}% ${smoothSpotY}%, rgba(255, 255, 255, 0.09), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.022, y: -6 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 hover:border-white/35 hover:shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-colors duration-200 flex flex-col justify-between group overflow-hidden will-change-transform"
    >
      {/* Dynamic 3D Glare Spotlight */}
      <motion.div
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
      />

      <div className="relative z-10">
        {/* Card Top */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-medium">
            <Database className="w-3 h-3 text-zinc-300" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-white fill-white/30" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-zinc-400" />
              {project.forks}
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
          {project.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Key Metrics Pill */}
        {project.metrics && (
          <div className="mt-4 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span className="truncate">{project.metrics}</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => onOpenModal(project)}
            className="text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-1.5 group/btn cursor-pointer"
          >
            <span>Architecture Deep Dive</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={`View ${project.title} on GitHub`}
            title="View GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Big Data', 'AI & ML', 'Full-Stack', 'Heros Suite', 'Data Engineering', 'Security', 'Database'];

  const filteredProjects = filterProjects(
    PROJECTS as any,
    selectedCategory,
    searchQuery
  ) as Project[];

  return (
    <section id="projects" className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Engineering Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Featured Systems & Projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Production-grade distributed pipelines, legal RAG systems, cryptographic ledgers, and automated ML engines.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  selectedCategory === cat
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tech, title, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Count Indicator */}
        <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>Showing {filteredProjects.length} of {PROJECTS.length} projects</span>
          {selectedCategory !== 'All' && (
            <span className="text-zinc-500">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectTiltCard
              key={project.id}
              project={project}
              onOpenModal={setActiveModalProject}
            />
          ))}
        </div>

        {/* Modal for Project Architecture Detail */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-transparent"
              onClick={() => setActiveModalProject(null)}
            />
            <div className="relative w-full max-w-2xl bg-zinc-950/85 text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-y-auto max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200 liquid-glass">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6 text-sm text-zinc-300">
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold mb-2">
                    System Overview
                  </h4>
                  <p className="leading-relaxed text-zinc-300">
                    {activeModalProject.longDescription}
                  </p>
                </div>

                {activeModalProject.architecture && (
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-white/15">
                    <div className="flex items-center gap-2 text-xs font-mono text-white font-bold mb-2">
                      <Workflow className="w-4 h-4 text-white" />
                      <span>Pipeline & Architecture Data Flow</span>
                    </div>
                    <code className="text-xs font-mono text-zinc-300 block bg-black/60 p-3 rounded-xl border border-white/10">
                      {activeModalProject.architecture}
                    </code>
                  </div>
                )}

                {activeModalProject.metrics && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                      Validated Benchmark Metrics
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      {activeModalProject.metrics}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono uppercase text-zinc-400 block mb-2">
                    Technologies & Libraries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-xs text-zinc-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
