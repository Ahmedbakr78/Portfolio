import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Boxes,
  SunMoon,
  Activity,
  Terminal,
  Award,
  Sliders,
  Maximize2,
  Layout,
  Zap,
  Search,
  FileText,
  Smartphone,
  Mail,
  ArrowRight,
  AudioLines,
  Database,
  Layers,
  Cpu,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { APP_FEATURES, AppFeature } from '../data/portfolioData';

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenControls: () => void;
  onOpenResume: () => void;
  onOpenVibe?: () => void;
  onOpenCommandPalette?: () => void;
  onToggleTheme?: () => void;
}

export const FeaturesModal: React.FC<FeaturesModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenControls,
  onOpenResume,
  onOpenVibe,
  onOpenCommandPalette,
  onToggleTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fps, setFps] = useState<number>(60);

  // Simple live FPS benchmark ticker
  useEffect(() => {
    if (!isOpen) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(120, Math.max(30, Math.round((frameCount * 1000) / (now - lastTime)))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    'All',
    '3D & Graphics',
    'Data Simulation',
    'Audio & Focus',
    'Search & Filters',
    'Controls & Themes',
    'Accessibility & Mobile',
    'Performance & AI',
  ];

  const iconMap: Record<string, React.ElementType> = {
    Boxes,
    SunMoon,
    Activity,
    Terminal,
    Award,
    Sliders,
    Maximize2,
    Layout,
    Zap,
    Search,
    FileText,
    Smartphone,
    Sparkles,
    Mail,
    AudioLines,
    Database,
    Layers,
    Cpu,
  };

  const filteredFeatures = APP_FEATURES.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFeatureAction = (featureId: string) => {
    onClose();
    switch (featureId) {
      case 'feat-1':
      case 'feat-2':
      case 'feat-3':
      case 'feat-4':
        onOpenControls();
        break;
      case 'feat-5':
      case 'feat-6':
      case 'feat-7':
      case 'feat-8':
        onNavigateSection('simulator');
        break;
      case 'feat-9':
      case 'feat-10':
      case 'feat-11':
      case 'feat-12':
      case 'feat-13':
      case 'feat-14':
        if (onOpenVibe) onOpenVibe();
        break;
      case 'feat-15':
        if (onOpenCommandPalette) onOpenCommandPalette();
        else onNavigateSection('projects');
        break;
      case 'feat-16':
        onNavigateSection('certifications');
        break;
      case 'feat-17':
        onNavigateSection('skills');
        break;
      case 'feat-18':
        onNavigateSection('projects');
        break;
      case 'feat-19':
        onNavigateSection('articles');
        break;
      case 'feat-20':
        if (onToggleTheme) onToggleTheme();
        else onOpenControls();
        break;
      case 'feat-21':
      case 'feat-22':
      case 'feat-23':
        onOpenControls();
        break;
      case 'feat-24':
      case 'feat-25':
        onNavigateSection('hero');
        break;
      case 'feat-26':
        onOpenResume();
        break;
      case 'feat-27':
        onNavigateSection('contact');
        break;
      case 'feat-28':
        onOpenControls();
        break;
      default:
        onNavigateSection('hero');
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* High-Contrast Backdrop with Deep Blur (Solid, low-transparency window feel) */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog (Crisp 97% Opacity Solid VisionOS Window) */}
      <div className="relative w-full max-w-5xl bg-zinc-950/97 text-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] liquid-glass-modal">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>100% Free & Unlimited Feature Suite</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[11px] font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{APP_FEATURES.length} Features Active</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              App Features & Capabilities Directory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Explore the full spectrum of high-performance 3D shaders, real-time data pipelines, 84-track ambient audio synthesizer, and interactive portfolio utilities.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors shrink-0"
            aria-label="Close features modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live System Diagnostics Pill */}
        <div className="py-2.5 px-3 my-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono shrink-0">
          <div className="flex items-center gap-4 text-zinc-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engine: <strong className="text-white">Three.js GPU</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>FPS: <strong className="text-emerald-300">{fps} FPS</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Vibe Synth: <strong className="text-white">84 Tracks Ready</strong></span>
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden md:inline">
            Zero-Latency Web Audio API
          </span>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="space-y-2.5 pb-2 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all 28+ features (e.g. 3D, SQL, Vibe, Certifications, Simulator)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? APP_FEATURES.length
                : APP_FEATURES.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Grid with Smooth Scrolling */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-none my-1">
          {filteredFeatures.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No features match "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredFeatures.map((feat) => {
                const Icon = iconMap[feat.icon] || Sparkles;
                return (
                  <div
                    key={feat.id}
                    onClick={() => handleFeatureAction(feat.id)}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.07] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Free & Unlimited
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-200 leading-snug">
                        {feat.title}
                      </h4>

                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                      <span className="text-zinc-400 truncate max-w-[120px]">{feat.category}</span>
                      <span className="group-hover:translate-x-1 transition-transform text-white font-semibold flex items-center gap-1">
                        Launch <ArrowRight className="w-3 h-3 text-emerald-400" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 shrink-0">
          <span className="hidden sm:inline">Engineered for Maximum Speed, Unlimited Free Power & Zero Friction</span>
          <span className="sm:hidden">Unlimited Free Features</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
