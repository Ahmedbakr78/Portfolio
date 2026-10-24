import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Sliders,
  Menu,
  X,
  FileText,
  User,
  Briefcase,
  Layers,
  Award,
  Cpu,
  BookOpen,
  Mail,
  Activity,
  AudioLines,
  Play,
  Pause,
  Volume2,
  Shuffle,
  Sparkles,
  ChevronDown,
  Search
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { VIBE_SOUNDS, VIBE_PRESETS } from '../utils/vibeAudioEngine';
import { getStudioAvatarDataUrl } from '../utils/studioAvatar';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenControls: () => void;
  onOpenVibe: () => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  activeSection: string;
  activeMix: Record<string, number>;
  isVibePlaying: boolean;
  masterVolume: number;
  onToggleVibePlay: () => void;
  onChangeMasterVolume: (val: number) => void;
  onRandomMix: () => void;
  onApplyPreset: (mix: Record<string, number>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenControls,
  onOpenVibe,
  onOpenResume,
  onOpenCommandPalette,
  activeSection,
  activeMix,
  isVibePlaying,
  masterVolume,
  onToggleVibePlay,
  onChangeMasterVolume,
  onRandomMix,
  onApplyPreset,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(PERSONAL_INFO.avatar);
  const islandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;
    getStudioAvatarDataUrl(PERSONAL_INFO.avatar).then((url) => {
      if (active) setAvatarUrl(url);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setIsScrolled(scrollY > 80);
      setIsAtEnd(scrollY + windowHeight >= docHeight - 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close Dynamic Island popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIslandExpanded(false);
      }
    };
    if (islandExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [islandExpanded]);

  const navItems = [
    { id: 'hero', label: 'Overview', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'simulator', label: 'Simulator', icon: Activity },
    { id: 'certifications', label: '73 Certs', icon: Award },
    { id: 'skills', label: '100 Skills', icon: Cpu },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSoundIds = Object.keys(activeMix);
  const activeCount = activeSoundIds.length;
  const activeNames = activeSoundIds
    .map((id) => VIBE_SOUNDS.find((s) => s.id === id)?.name)
    .filter(Boolean);

  const collapseLabels = isScrolled || isAtEnd;

  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-40 px-2 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-1.5">
        {/* Top Row: Brand Pill + Apple Dynamic Island + Section Nav + Action Pill */}
        <div className="relative z-50 w-full max-w-full flex items-center justify-between gap-1 sm:gap-2">
          {/* 1. Brand Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1 pr-2.5 sm:p-1.5 sm:pr-4 rounded-full liquid-glass-pill shrink-0"
          >
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-1.5 sm:gap-2 text-left group cursor-pointer"
              aria-label="Scroll to top"
            >
              <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/30 bg-zinc-900 shrink-0 shadow-xs">
                <img
                  src={avatarUrl}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="block">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white block leading-tight">
                  Ahmed
                </span>
                <AnimatePresence initial={false}>
                  {!collapseLabels && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hidden sm:block text-[9px] sm:text-[10px] font-mono text-zinc-300 overflow-hidden leading-tight"
                    >
                      Big Data & AI
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>

          {/* 2. Center Rounded Pill Navigation (Desktop xl) */}
          <motion.nav
            layout
            aria-label="Primary Portfolio Sections"
            className="pointer-events-auto hidden xl:flex items-center gap-0.5 p-1 2xl:p-1.5 rounded-full liquid-glass-pill shrink-0"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;
              const isCompactMode = collapseLabels || isAtEnd;
              const showText = !isCompactMode || isActive || isHovered;
              const showIcon = isCompactMode || isActive;

              return (
                <motion.button
                  layout
                  key={item.id}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                  className={`relative px-2 2xl:px-2.5 py-1.5 rounded-full text-[11px] 2xl:text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'active-nav-btn text-black font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="active-nav-bg absolute inset-0 rounded-full bg-white shadow-md -z-10"
                    />
                  )}
                  {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  <AnimatePresence initial={false}>
                    {showText && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden whitespace-nowrap inline-block"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.nav>

          {/* 3. Right Action Controls & Unified Apple Dynamic Island Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-50 pointer-events-auto flex items-center gap-1 2xl:gap-1.5 p-1 2xl:p-1.5 rounded-full liquid-glass-pill shrink-0 max-w-full"
          >
            {/* Unified Apple Dynamic Island — Live Ambient Sound & Focus Controller */}
            <div ref={islandRef} className="static z-50 shrink-0">
              <div
                className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/[0.07] hover:bg-white/[0.12] text-white border transition-all duration-300 shrink-0 ${
                  isVibePlaying && activeCount > 0
                    ? 'border-white/45 ring-1 ring-white/20'
                    : 'border-white/20 hover:border-white/35'
                }`}
              >
                {/* Play / Pause Button inside Dynamic Island */}
                <button
                  type="button"
                  onClick={onToggleVibePlay}
                  aria-label={isVibePlaying && activeCount > 0 ? 'Pause Ambient Vibe' : 'Play Ambient Vibe'}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform active:scale-90 shrink-0 cursor-pointer shadow-sm hover:opacity-90"
                  title={
                    activeCount === 0
                      ? 'Play Instant Deep Focus Ambient Mix'
                      : isVibePlaying
                      ? 'Pause Ambient Mix'
                      : 'Resume Ambient Mix'
                  }
                >
                  {isVibePlaying && activeCount > 0 ? (
                    <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  ) : (
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  )}
                </button>

                {/* Dynamic Island Info & Equalizer — Click to Expand Mini-Controller */}
                <button
                  type="button"
                  onClick={() => setIslandExpanded((prev) => !prev)}
                  className="flex items-center gap-1 text-left shrink-0 cursor-pointer group pr-0.5"
                  aria-label="Open Ahmed Vibe Dynamic Island Mixer"
                >
                  <div className="shrink-0">
                    <div className="text-[10px] sm:text-[11px] font-bold text-white leading-tight truncate max-w-[46px] sm:max-w-[84px] 2xl:max-w-[105px]">
                      {activeCount > 0 ? activeNames.join(' + ') : 'Vibe'}
                    </div>
                    <div className="text-[8px] font-mono text-zinc-300 leading-none truncate">
                      {activeCount > 0
                        ? isVibePlaying
                          ? `${activeCount} ACTIVE`
                          : `${activeCount} PAUSED`
                        : '84 SOUNDS'}
                    </div>
                  </div>

                  {/* Live Animated Equalizer Bars (Desktop/Tablet) */}
                  {isVibePlaying && activeCount > 0 ? (
                    <div className="hidden sm:flex items-end gap-[2px] h-3 px-0.5 shrink-0" aria-hidden="true">
                      <span className="w-[2px] bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2.5" />
                      <span className="w-[2px] bg-white rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-3" />
                      <span className="w-[2px] bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-1.5" />
                    </div>
                  ) : (
                    <AudioLines className="w-3 h-3 text-zinc-300 group-hover:text-white transition-colors shrink-0 hidden 2xl:block" />
                  )}

                  <ChevronDown
                    className={`w-3 h-3 text-zinc-300 transition-transform duration-200 shrink-0 ${
                      islandExpanded ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Expanded Dynamic Island Popover Card — Right-Anchored & Viewport-Safe */}
              <AnimatePresence>
                {islandExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+6px)] w-[236px] sm:w-[272px] max-w-[calc(100vw-16px)] p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-zinc-950 text-white border border-white/25 shadow-[0_24px_64px_rgba(0,0,0,0.96)] space-y-2 sm:space-y-2.5 z-50"
                  >
                    <div className="flex items-center justify-between gap-1.5 border-b border-white/15 pb-1.5 sm:pb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Sparkles className="w-3 h-3 text-white shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase font-mono truncate">
                          Vibe Mixer
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIslandExpanded(false);
                          onOpenVibe();
                        }}
                        className="text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-white text-black hover:opacity-90 cursor-pointer shrink-0 whitespace-nowrap"
                      >
                        84 Sounds →
                      </button>
                    </div>

                    {/* Quick Master Volume inside Dynamic Island */}
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-300 shrink-0" />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={masterVolume}
                        onChange={(e) => onChangeMasterVolume(parseFloat(e.target.value))}
                        aria-label="Dynamic Island Master Volume"
                        className="w-full min-w-0 h-1 cursor-pointer"
                      />
                      <span className="text-[9px] sm:text-[10px] font-mono text-white w-7 text-right shrink-0">
                        {Math.round(masterVolume * 100)}%
                      </span>
                    </div>

                    {/* Quick Presets Row */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between gap-1 text-[8px] sm:text-[9px] font-mono text-zinc-400">
                        <span className="truncate">INSTANT PRESETS</span>
                        <button
                          type="button"
                          onClick={onRandomMix}
                          className="text-white hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Shuffle className="w-2.5 h-2.5 shrink-0" />
                          <span>Randomize</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        {VIBE_PRESETS.slice(0, 4).map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => onApplyPreset(preset.mix)}
                            title={`${preset.name} — ${preset.subtitle}`}
                            className="px-2 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white hover:text-black border border-white/12 text-left transition-all cursor-pointer group min-w-0"
                          >
                            <div className="text-[9px] sm:text-[10px] font-bold truncate leading-tight">
                              {preset.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account & Portfolio Control Center Button (Visible on Mobile & Desktop) */}
            <button
              onClick={onOpenControls}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white text-black hover:opacity-90 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
              title="Account & Portfolio Control Center (All Windows, Audio, 3D & Theme)"
              aria-label="Open Account and Portfolio Control Center"
            >
              <Sliders className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">Control Center</span>
            </button>

            {/* Quick Command Search (⌘K) Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex p-1.5 2xl:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              title="Command Palette & Instant Search (⌘K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </button>

            {/* Direct Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 2xl:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Minimal White Mode' : 'Switch to Onyx Dark Mode'}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-white" />
              ) : (
                <Moon className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-zinc-900" />
              )}
            </button>

            {/* Printable Resume Trigger (Desktop) */}
            <button
              onClick={onOpenResume}
              className="hidden lg:flex items-center gap-1 px-2 2xl:px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold transition-colors border border-white/15 shrink-0 cursor-pointer"
              title="View Printable ATS Resume"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <AnimatePresence initial={false}>
                {!collapseLabels && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap hidden 2xl:inline-block"
                  >
                    CV
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile & Tablet Rounded Slidebar Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Open mobile slidebar menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile & Tablet Horizontal Scrollable Section Pill Bar */}
        <AnimatePresence initial={false}>
          {!isAtEnd && !islandExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="xl:hidden relative z-10 pointer-events-auto flex items-center gap-1 overflow-x-auto px-2 py-1 rounded-full liquid-glass-pill max-w-full"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                      isActive
                        ? 'active-nav-btn bg-white text-black font-bold shadow-xs'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Rounded Mobile Slidebar Drawer (Deeply Rounded 32px Floating Panel + Low Transparency) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden pointer-events-auto">
            {/* Subtle click-outside backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Floating Rounded-32px Mobile Slidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed top-2.5 bottom-2.5 right-2.5 w-[calc(100vw-20px)] max-w-[365px] rounded-[32px] bg-zinc-950/96 text-white border border-white/25 p-4 flex flex-col justify-between shadow-[0_28px_90px_rgba(0,0,0,0.92)] overflow-y-auto liquid-glass-window"
            >
              <div className="space-y-3">
                {/* 1. Rounded Slidebar Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={avatarUrl}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover object-center border border-white/30 bg-zinc-900"
                    />
                    <div>
                      <span className="font-bold text-sm text-white block leading-tight">
                        {PERSONAL_INFO.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        Power Control Slidebar
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white"
                    aria-label="Close mobile slidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Live Ahmed Vibe Audio Mini-Deck with Rounded Volume Slidebar */}
                <div className="p-3 rounded-3xl bg-white/[0.05] border border-white/15 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                        <AudioLines className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          Ahmed Vibe (84 Sounds)
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {activeCount > 0
                            ? `${activeCount} active in mix`
                            : 'Tap Play for Deep Focus'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={onToggleVibePlay}
                        className="px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-bold flex items-center gap-1 shadow-sm"
                      >
                        {isVibePlaying && activeCount > 0 ? (
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
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenVibe();
                        }}
                        className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white"
                      >
                        Mixer
                      </button>
                    </div>
                  </div>

                  {/* Rounded Volume Slidebar inside Mobile Drawer */}
                  <div className="flex items-center gap-2.5">
                    <Volume2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={masterVolume}
                      onChange={(e) => onChangeMasterVolume(parseFloat(e.target.value))}
                      aria-label="Mobile Slidebar Master Volume"
                      className="w-full h-1.5 cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-white w-8 text-right">
                      {Math.round(masterVolume * 100)}%
                    </span>
                  </div>
                </div>

                {/* 3. All Portfolio Windows & Control Center Grid (2x2 Rounded Cards) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                      All Portfolio Windows
                    </span>
                    <span className="text-[10px] font-mono text-white font-bold">
                      Mobile Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenControls();
                      }}
                      className="p-2.5 rounded-2xl bg-white text-black text-left flex items-center gap-2.5 shadow-md"
                    >
                      <Sliders className="w-4 h-4 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold leading-tight truncate">
                          Control Center
                        </div>
                        <div className="text-[10px] font-mono opacity-75 truncate">
                          All Windows & 3D
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenVibe();
                      }}
                      className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-left flex items-center gap-2.5"
                    >
                      <AudioLines className="w-4 h-4 text-white shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white leading-tight truncate">
                          Vibe Studio
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          84 Ambient Sounds
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenResume();
                      }}
                      className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-left flex items-center gap-2.5"
                    >
                      <FileText className="w-4 h-4 text-white shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white leading-tight truncate">
                          Resume PDF
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          ATS Printable CV
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenCommandPalette();
                      }}
                      className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-left flex items-center gap-2.5"
                    >
                      <Search className="w-4 h-4 text-white shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white leading-tight truncate">
                          Command Search
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          Global Search
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Rounded 2-Column Portfolio Section Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold px-1 block">
                    Jump to Section
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`px-3 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                            isActive
                              ? 'active-nav-btn bg-white text-black font-bold shadow-sm'
                              : 'bg-white/[0.04] text-zinc-200 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5. Rounded Bottom Quick Actions */}
              <div className="pt-2.5 mt-2.5 border-t border-white/15 grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="py-2 px-2 rounded-2xl bg-white/[0.06] hover:bg-white/15 border border-white/15 text-[11px] font-semibold text-white flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenControls();
                  }}
                  className="py-2 px-2 rounded-2xl bg-white/[0.06] hover:bg-white/15 border border-white/15 text-[11px] font-semibold text-white flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>3D / UI</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="py-2 px-2 rounded-2xl bg-white text-black font-bold text-[11px] flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
