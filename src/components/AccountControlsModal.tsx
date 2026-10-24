import React from 'react';
import {
  Sliders,
  X,
  Sun,
  Moon,
  Boxes,
  Zap,
  MousePointer,
  Check,
  Cpu,
  AudioLines,
  FileText,
  Search,
  Activity,
  User,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  Mail,
  Play,
  Pause,
  Volume2,
  Shuffle,
  ArrowUpRight,
} from 'lucide-react';
import { BackgroundStyle } from './ThreeBackground';
import { VIBE_PRESETS } from '../utils/vibeAudioEngine';

interface AccountControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onSetTheme: (t: 'dark' | 'light') => void;
  bgStyle: BackgroundStyle;
  onSetBgStyle: (s: BackgroundStyle) => void;
  silentMode: boolean;
  onSetSilentMode: (s: boolean) => void;
  onOpenVibe: () => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  activeVibeCount: number;
  isVibePlaying: boolean;
  masterVolume: number;
  onToggleVibePlay: () => void;
  onChangeMasterVolume: (val: number) => void;
  onRandomMix: () => void;
  onApplyPreset: (mix: Record<string, number>) => void;
}

export const AccountControlsModal: React.FC<AccountControlsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSetTheme,
  bgStyle,
  onSetBgStyle,
  silentMode,
  onSetSilentMode,
  onOpenVibe,
  onOpenResume,
  onOpenCommandPalette,
  onNavigateSection,
  activeSection,
  activeVibeCount,
  isVibePlaying,
  masterVolume,
  onToggleVibePlay,
  onChangeMasterVolume,
  onRandomMix,
  onApplyPreset,
}) => {
  if (!isOpen) return null;

  const bgStyles: { id: BackgroundStyle; label: string; desc: string }[] = [
    {
      id: 'constellation',
      label: '3D Flowing Wave & Geodesic Lines',
      desc: 'Parametric 3D ribbon wave mesh with orbital wireframe lines',
    },
    {
      id: 'data-matrix',
      label: '3D Architectural Line Tunnel',
      desc: 'Perspective 3D geometric vortex lines in continuous motion',
    },
    {
      id: 'geometric',
      label: '3D Wireframe Polyhedra',
      desc: 'Concentric 3D line icosahedrons and torus knot geometry',
    },
    {
      id: 'minimal',
      label: '3D Horizon Contour Lines',
      desc: 'Clean parallel 3D topographic wave lines',
    },
    {
      id: 'off',
      label: 'Power Saver (Disabled)',
      desc: 'Maximum battery life with zero WebGL overhead',
    },
  ];

  const portfolioSections = [
    { id: 'hero', label: 'Overview', sub: 'Executive Hero', icon: User },
    { id: 'about', label: 'About', sub: 'Bio & Architecture', icon: User },
    { id: 'experience', label: 'Experience', sub: 'Career Timeline', icon: Briefcase },
    { id: 'projects', label: 'Projects (22)', sub: 'Flagship Repos', icon: Layers },
    { id: 'simulator', label: 'Simulator', sub: 'Live DAG Engine', icon: Activity },
    { id: 'certifications', label: '73 Certs', sub: '8 Verified Domains', icon: Award },
    { id: 'skills', label: '100 Skills', sub: 'Full Tech Matrix', icon: Cpu },
    { id: 'articles', label: 'Articles', sub: 'Technical Dives', icon: BookOpen },
    { id: 'contact', label: 'Contact', sub: 'Direct Channels', icon: Mail },
  ];

  const handleLaunchWindow = (action: () => void) => {
    onClose();
    action();
  };

  const handleJumpSection = (sectionId: string) => {
    onClose();
    onNavigateSection(sectionId);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Account & Portfolio Control Center"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4"
    >
      {/* Backdrop - transparent so 3D background stays visible */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Dialog — Fully responsive for mobile & desktop */}
      <div className="relative w-full max-w-2xl bg-zinc-950/96 text-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-7 border border-white/25 shadow-[0_28px_90px_rgba(0,0,0,0.92)] overflow-y-auto max-h-[92vh] z-10 animate-in fade-in zoom-in-95 duration-200 space-y-5 liquid-glass-window">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-extrabold text-white leading-tight">
                Account & Portfolio Control Center
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-0.5">
                All windows, audio studio, sections, 3D shaders & theme controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white shrink-0 cursor-pointer"
            aria-label="Close controls modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. All Interactive Windows Hub (Mobile & Desktop Quick Launchers) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              All Interactive Windows
            </span>
            <span className="text-[10px] font-mono text-white bg-white/10 px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
              Mobile & Desktop
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Window 1: Ahmed Vibe 84-Sound Studio */}
            <button
              type="button"
              onClick={() => handleLaunchWindow(onOpenVibe)}
              className="p-3 rounded-2xl bg-white text-black hover:bg-zinc-200 text-left flex flex-col justify-between gap-2 transition-all shadow-md cursor-pointer group"
            >
              <div className="flex items-center justify-between w-full">
                <AudioLines className="w-4 h-4 shrink-0" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-extrabold leading-tight">Vibe Studio</div>
                <div className="text-[10px] font-mono opacity-75 mt-0.5">
                  84 Ambient Sounds
                </div>
              </div>
            </button>

            {/* Window 2: ATS Resume & CV PDF */}
            <button
              type="button"
              onClick={() => handleLaunchWindow(onOpenResume)}
              className="p-3 rounded-2xl bg-white/[0.07] hover:bg-white hover:text-black border border-white/15 text-left flex flex-col justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between w-full">
                <FileText className="w-4 h-4 shrink-0" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">Resume PDF</div>
                <div className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-0.5">
                  ATS Printable CV
                </div>
              </div>
            </button>

            {/* Window 3: Global Search & Command Palette */}
            <button
              type="button"
              onClick={() => handleLaunchWindow(onOpenCommandPalette)}
              className="p-3 rounded-2xl bg-white/[0.07] hover:bg-white hover:text-black border border-white/15 text-left flex flex-col justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between w-full">
                <Search className="w-4 h-4 shrink-0" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">Command Search</div>
                <div className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-0.5">
                  Global Search
                </div>
              </div>
            </button>

            {/* Window 4: Pipeline & DAG Simulator */}
            <button
              type="button"
              onClick={() => handleJumpSection('simulator')}
              className="p-3 rounded-2xl bg-white/[0.07] hover:bg-white hover:text-black border border-white/15 text-left flex flex-col justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between w-full">
                <Activity className="w-4 h-4 shrink-0" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">DAG Simulator</div>
                <div className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-0.5">
                  Spark & Kafka Live
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Inline Ahmed Vibe Audio Deck (Play/Pause, Volume & Presets without leaving Control Center) */}
        <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/15 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                <AudioLines className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  Ahmed Vibe Live Audio Deck
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  {activeVibeCount > 0
                    ? isVibePlaying
                      ? `${activeVibeCount} ambient channels active`
                      : `${activeVibeCount} channels paused`
                    : '84 procedural ambient sounds ready'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleVibePlay}
                className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {isVibePlaying && activeVibeCount > 0 ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" /> Play
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onRandomMix}
                className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                title="Randomize 3 Ambient Sounds"
              >
                <Shuffle className="w-3 h-3" /> Mix
              </button>
              <button
                type="button"
                onClick={() => handleLaunchWindow(onOpenVibe)}
                className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-[11px] font-mono font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>84 Sounds</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-zinc-300 shrink-0" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={masterVolume}
              onChange={(e) => onChangeMasterVolume(parseFloat(e.target.value))}
              aria-label="Control Center Master Volume"
              className="w-full h-1.5 cursor-pointer"
            />
            <span className="text-[10px] font-mono text-white w-9 text-right">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          {/* 4 Instant Sound Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {VIBE_PRESETS.slice(0, 4).map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset.mix)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/10 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold truncate">{preset.name}</div>
                <div className="text-[9px] font-mono text-zinc-400 group-hover:text-zinc-700 truncate">
                  {preset.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. All 9 Portfolio Sections Quick-Jump Grid */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              All Portfolio Sections
            </span>
            <span className="text-[10px] font-mono text-zinc-400 shrink-0">
              9 Sections
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
            {portfolioSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleJumpSection(sec.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black border-white font-bold shadow-sm'
                      : 'bg-white/[0.04] border-white/10 text-zinc-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold leading-tight truncate">
                      {sec.label}
                    </div>
                    <div
                      className={`text-[9px] font-mono truncate hidden sm:block ${
                        isActive ? 'text-zinc-700' : 'text-zinc-400'
                      }`}
                    >
                      {sec.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Visual Theme Mode Switcher */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
            Visual Theme Mode
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onSetTheme('dark')}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/15 border-white text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-white shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  Onyx Dark Mode
                </span>
                <span className="text-[10px] text-zinc-400 truncate block">
                  Deep monochrome contrast
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSetTheme('light')}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-current shrink-0" />
              <div className="text-left min-w-0">
                <span className="block text-xs font-bold truncate">
                  Minimal White Mode
                </span>
                <span className="text-[10px] text-zinc-500 truncate block">
                  Pristine daylight layout
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 5. 3D Background Engine Presets */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              3D Background Engine
            </span>
            <span className="text-[10px] font-mono text-white">
              Autonomous 60 FPS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bgStyles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSetBgStyle(item.id)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                  bgStyle === item.id
                    ? 'bg-white/15 border-white text-white'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="truncate">{item.label}</span>
                    {bgStyle === item.id && (
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                    {item.desc}
                  </div>
                </div>
                <Boxes className="w-4 h-4 text-zinc-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* 6. Interaction & Transition Discipline */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
            Interaction & Transition Discipline
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Cursor Interaction Lock */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <MousePointer className="w-4 h-4 text-white shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">
                    Cursor Interference Lock
                  </span>
                  <span className="text-[10px] text-zinc-400 block truncate">
                    Zero cursor tilt on 3D canvas
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-white font-mono text-[10px] font-bold shrink-0">
                LOCKED
              </span>
            </div>

            {/* Silent Smooth Reload Transitions */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Zap className="w-4 h-4 text-white shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">
                    Silent Navigation
                  </span>
                  <span className="text-[10px] text-zinc-400 block truncate">
                    Instant zero-jank section jumps
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSetSilentMode(!silentMode)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-colors shrink-0 cursor-pointer ${
                  silentMode
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                }`}
              >
                {silentMode ? 'ACTIVE' : 'STANDARD'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>Mobile + Tablet + Desktop Control Hub</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
