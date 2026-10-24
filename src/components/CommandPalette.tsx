import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Layers,
  Award,
  BookOpen,
  Activity,
  Sun,
  Moon,
  Mail,
  Download,
  Sparkles,
  AudioLines
} from 'lucide-react';
import { PROJECTS, CERTIFICATIONS, ARTICLES } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleTheme: () => void;
  onOpenSimulator: () => void;
  onOpenResume: () => void;
  onOpenFeatures?: () => void;
  onOpenVibe?: () => void;
  theme: 'dark' | 'light';
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onToggleTheme,
  onOpenSimulator,
  onOpenResume,
  onOpenFeatures,
  onOpenVibe,
  theme,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    ...(onOpenFeatures
      ? [
          {
            label: 'Explore All Features Directory (28+ Unlimited & Free)',
            icon: Sparkles,
            action: onOpenFeatures,
            tag: 'Suite',
          },
        ]
      : []),
    ...(onOpenVibe
      ? [
          {
            label: 'Open Ahmed Vibe Studio (84 Sounds & Multi-Mixer)',
            icon: AudioLines,
            action: onOpenVibe,
            tag: 'Audio',
          },
        ]
      : []),
    {
      label: 'Launch Big Data Pipeline Simulator',
      icon: Activity,
      action: onOpenSimulator,
      tag: 'Interactive',
    },
    {
      label: 'Download / Print ATS Resume PDF',
      icon: Download,
      action: onOpenResume,
      tag: 'Resume',
    },
    {
      label: `Switch to ${theme === 'dark' ? 'Minimal White' : 'Onyx Dark'} Mode`,
      icon: theme === 'dark' ? Sun : Moon,
      action: onToggleTheme,
      tag: 'Theme',
    },
    {
      label: 'Jump to Verified Certifications (73)',
      icon: Award,
      action: () => onNavigateSection('certifications'),
      tag: 'Credentials',
    },
    {
      label: 'Get in Touch with Ahmed',
      icon: Mail,
      action: () => onNavigateSection('contact'),
      tag: 'Contact',
    },
  ];

  const filteredProjects = PROJECTS.filter((p) =>
    query ? p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) : false
  ).slice(0, 4);

  const filteredCerts = CERTIFICATIONS.filter((c) =>
    query ? c.title.toLowerCase().includes(query.toLowerCase()) || c.issuer.toLowerCase().includes(query.toLowerCase()) : false
  ).slice(0, 4);

  const filteredArticles = ARTICLES.filter((a) =>
    query ? a.title.toLowerCase().includes(query.toLowerCase()) : false
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4">
      {/* High-Contrast Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette Card — Solid 98% Opacity Window */}
      <div className="relative w-full max-w-xl bg-zinc-950/98 text-white rounded-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 liquid-glass-modal">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-zinc-400 ml-2" />
          <input
            type="text"
            placeholder="Type a command or search systems, certs, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Actions (when query is short or empty) */}
          {!query && (
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold px-2 block mb-2">
                Quick Shortcuts & Actions
              </span>
              <div className="space-y-1">
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.label}
                      onClick={() => {
                        qa.action();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/10 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                        <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                          {qa.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400">
                        {qa.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filtered Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold px-2 block mb-2">
                Projects ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigateSection('projects');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Layers className="w-4 h-4 text-white flex-shrink-0" />
                      <span className="text-xs font-medium text-white truncate">
                        {p.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0">
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Certifications */}
          {filteredCerts.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold px-2 block mb-2">
                Certifications ({filteredCerts.length})
              </span>
              <div className="space-y-1">
                {filteredCerts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onNavigateSection('certifications');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Award className="w-4 h-4 text-white flex-shrink-0" />
                      <span className="text-xs font-medium text-white truncate">
                        {c.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0">
                      {c.issuer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Articles */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold px-2 block mb-2">
                Articles ({filteredArticles.length})
              </span>
              <div className="space-y-1">
                {filteredArticles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onNavigateSection('articles');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <BookOpen className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-white truncate">
                        {a.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0">
                      {a.readTime}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>Navigate with arrows • Press ESC to close</span>
          <span className="text-zinc-500">⌘K</span>
        </div>
      </div>
    </div>
  );
};
