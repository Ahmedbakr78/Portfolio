import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
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
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { APP_FEATURES, AppFeature } from '../data/portfolioData';

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenTerminal: () => void;
  onOpenControls: () => void;
  onOpenResume: () => void;
}

export const FeaturesModal: React.FC<FeaturesModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenTerminal,
  onOpenControls,
  onOpenResume,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = [
    'All',
    '3D & Graphics',
    'Data Simulation',
    'Search & Filters',
    'Controls & Themes',
    'Accessibility & Mobile',
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
  };

  const filteredFeatures = APP_FEATURES.filter((f) =>
    selectedCategory === 'All' ? true : f.category === selectedCategory
  );

  const handleFeatureAction = (featureId: string) => {
    onClose();
    if (featureId === 'feat-1' || featureId === 'feat-13' || featureId === 'feat-2' || featureId === 'feat-9') {
      onOpenControls();
    } else if (featureId === 'feat-3' || featureId === 'feat-4') {
      onNavigateSection('simulator');
    } else if (featureId === 'feat-5') {
      onNavigateSection('certifications');
    } else if (featureId === 'feat-6') {
      onNavigateSection('skills');
    } else if (featureId === 'feat-10') {
      onOpenTerminal();
    } else if (featureId === 'feat-11') {
      onOpenResume();
    } else if (featureId === 'feat-14') {
      onNavigateSection('contact');
    } else {
      onNavigateSection('hero');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free & Unlimited Feature Suite</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Comprehensive App Features Directory
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Explore all integrated tools, interactive simulators, high-performance 3D shaders, and portfolio utilities.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
              aria-label="Close features modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 py-2">
            {filteredFeatures.map((feat) => {
              const Icon = iconMap[feat.icon] || Sparkles;
              return (
                <div
                  key={feat.id}
                  onClick={() => handleFeatureAction(feat.id)}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Unlimited
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-200 leading-snug">
                      {feat.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span>{feat.category}</span>
                    <span className="group-hover:translate-x-1 transition-transform text-white font-semibold flex items-center gap-1">
                      Launch <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>Engineered for Maximum Speed & Precision</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
