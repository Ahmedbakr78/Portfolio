import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Sliders,
  Menu,
  X,
  Database,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Mail,
  Activity,
  UserCheck,
  AudioLines,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Shuffle,
  ChevronDown,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { VIBE_SOUNDS, VIBE_PRESETS } from '../utils/vibeAudioEngine';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenControls: () => void;
  onOpenVibe: () => void;
  onOpenResume?: () => void;
  onOpenFeatures?: () => void;
  onOpenCommandPalette?: () => void;
  activeSection: string;
  // Dynamic Island & Vibe Audio Props
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
  onOpenFeatures,
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeSoundIds = Object.keys(activeMix);
  const activeCount = activeSoundIds.length;
  const activeSoundNames = activeSoundIds
    .map((id) => VIBE_SOUNDS.find((s) => s.id === id)?.name)
    .filter(Boolean) as string[];

  const navLinks = [
    { name: 'About', href: '#about', icon: UserCheck },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Layers },
    { name: 'Certs', href: '#certifications', icon: Award },
    { name: 'Simulator', href: '#simulator', icon: Activity },
    { name: 'Skills', href: '#skills', icon: Database },
    { name: 'Articles', href: '#articles', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Rounded Top Bar with Integrated Apple Dynamic Island */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-2.5 sm:px-5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col gap-1.5 pointer-events-auto">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {/* 1. Brand Pill */}
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-full liquid-glass-pill transition-all duration-200 group shrink-0"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-white/25 bg-[#f4f4f6] flex-shrink-0">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-[48%_36%] scale-125 group-hover:scale-135 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML =
                        '<span class="text-[10px] font-bold text-white flex items-center justify-center w-full h-full font-mono">AB</span>';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight text-white flex items-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Ahmed</span>
                  <span className="hidden sm:inline">{PERSONAL_INFO.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
                <span className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase hidden sm:inline-block">
                  Big Data & AI
                </span>
              </div>
            </motion.a>

            {/* 2. Apple Dynamic Island (Live Ambient Soundscape & Focus Controller) */}
            <div className="relative flex flex-col items-center shrink-0">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-full liquid-glass-pill text-white cursor-pointer select-none transition-colors duration-200"
                onClick={() => setIslandExpanded((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-label="Dynamic Island Ahmed Vibe Controller"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIslandExpanded((prev) => !prev);
                  }
                }}
              >
                {/* Quick Play/Pause Button inside Dynamic Island */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVibePlay();
                  }}
                  aria-label={isVibePlaying && activeCount > 0 ? 'Pause Vibe Audio' : 'Play Vibe Audio'}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0 shadow-sm"
                  title={isVibePlaying && activeCount > 0 ? 'Pause Ambient Mix' : 'Play Ambient Mix'}
                >
                  {isVibePlaying && activeCount > 0 ? (
                    <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  ) : (
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  )}
                </button>

                {/* Status Label inside Dynamic Island */}
                <div className="flex flex-col text-left min-w-[50px] max-w-[80px] sm:min-w-[85px] sm:max-w-[130px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-tight uppercase text-white truncate">
                      {activeCount > 0
                        ? activeSoundNames[0] || 'Vibe Active'
                        : 'Ahmed Vibe'}
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 truncate">
                    {activeCount > 0
                      ? `${activeCount} Active • ${isVibePlaying ? 'On' : 'Off'}`
                      : '84 Sounds'}
                  </span>
                </div>

                {/* Animated Equalizer Waveform Bars (Mobile 3-bar, Desktop 5-bar) */}
                <div className="flex items-end gap-0.5 h-3 sm:h-3.5 px-0.5 shrink-0">
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={
                        isVibePlaying && activeCount > 0
                          ? {
                              height: ['30%', '100%', '50%', '90%', '35%'],
                            }
                          : { height: '30%' }
                      }
                      transition={
                        isVibePlaying && activeCount > 0
                          ? {
                              duration: 0.8 + bar * 0.18,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          : { duration: 0.2 }
                      }
                      className="w-0.5 bg-white rounded-full block"
                    />
                  ))}
                  {[3, 4].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={
                        isVibePlaying && activeCount > 0
                          ? {
                              height: ['25%', '90%', '40%', '100%', '30%'],
                            }
                          : { height: '25%' }
                      }
                      transition={
                        isVibePlaying && activeCount > 0
                          ? {
                              duration: 1.0 + bar * 0.15,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          : { duration: 0.2 }
                      }
                      className="hidden sm:block w-0.5 bg-white rounded-full"
                    />
                  ))}
                </div>

                <ChevronDown
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400 transition-transform duration-300 ${
                    islandExpanded ? 'rotate-180 text-white' : ''
                  }`}
                />
              </motion.div>

              {/* Expanded Dynamic Island Popover Card — Viewport-Safe on Mobile */}
              <AnimatePresence>
                {islandExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="fixed top-14 left-2.5 right-2.5 mx-auto max-w-[350px] sm:absolute sm:top-12 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[360px] rounded-[28px] liquid-glass-modal bg-zinc-950/98 text-white border border-white/25 p-4 shadow-2xl z-50"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                          <AudioLines className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold tracking-wide text-white flex items-center gap-1.5">
                            <span>Ahmed Vibe Island</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-zinc-200">
                              84 Sounds
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-mono">
                            Continuous Non-Stop Focus Audio
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIslandExpanded(false)}
                        className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Collapse Dynamic Island"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick Transport & Volume Row */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={onToggleVibePlay}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all"
                      >
                        {isVibePlaying && activeCount > 0 ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Play Mix</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={onRandomMix}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/15 transition-all"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Random</span>
                      </button>

                      <div className="flex items-center gap-1.5 flex-1 pl-1">
                        <button
                          type="button"
                          onClick={() => onChangeMasterVolume(masterVolume > 0 ? 0 : 0.8)}
                          className="text-zinc-400 hover:text-white"
                          aria-label="Toggle Mute"
                        >
                          {masterVolume === 0 ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={Math.round(masterVolume * 100)}
                          onChange={(e) => onChangeMasterVolume(Number(e.target.value) / 100)}
                          aria-label="Dynamic Island Master Volume"
                          className="w-full h-1.5 bg-zinc-500/30 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                        />
                      </div>
                    </div>

                    {/* Quick Presets inside Dynamic Island */}
                    <div className="mt-3 pt-2.5 border-t border-white/10">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Instant Soundscapes</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {VIBE_PRESETS.slice(0, 4).map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => onApplyPreset(preset.mix)}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/10 hover:bg-white hover:text-black text-zinc-200 border border-white/10 transition-colors"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Open Full 84-Sound Mixer Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIslandExpanded(false);
                        onOpenVibe();
                      }}
                      className="mt-3 w-full py-2.5 rounded-2xl bg-white/15 hover:bg-white hover:text-black text-white text-xs font-bold tracking-wide transition-all border border-white/20 flex items-center justify-center gap-2"
                    >
                      <AudioLines className="w-3.5 h-3.5" />
                      <span>Open Full Ahmed Vibe (84 Sounds)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Desktop Navigation Links Pill (Scroll-Animated & Auto-Collapsing Text) */}
            <motion.nav
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isScrolled ? 0.97 : 1,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-medium"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.replace('#', '');
                const isHovered = hoveredNav === link.name;
                const showLabel = !isScrolled || isActive || isHovered;

                return (
                  <motion.button
                    layout
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredNav(link.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? 'active-nav-btn text-black font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={link.name}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="top-navbar-active-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="active-nav-bg absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <AnimatePresence initial={false}>
                      {showLabel && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden inline-block"
                        >
                          {link.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* 4. Action Controls Pill (Vibe Button + Controls + Theme + Mobile Menu) */}
            <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full liquid-glass-pill shrink-0">
              {/* Ahmed Vibe Button - hidden on mobile screens so it doesn't duplicate Dynamic Island and crowd the top bar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenVibe}
                aria-label="Open Ahmed Vibe Mixer"
                className={`hidden sm:flex px-2 sm:px-2.5 py-1.5 rounded-full items-center gap-1 text-xs font-bold whitespace-nowrap transition-all ${
                  isVibePlaying && activeCount > 0
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-200 hover:text-white hover:bg-white/10'
                }`}
                title="Ahmed Vibe — 84 Ambient Sounds"
              >
                <AudioLines className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vibe</span>
                {activeCount > 0 && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                      isVibePlaying
                        ? 'bg-black text-white'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {activeCount}
                  </span>
                )}
              </motion.button>

              {/* Account & 3D Controls */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={onOpenControls}
                aria-label="Account & 3D Controls"
                className="p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Portfolio & 3D Control Center"
              >
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>

              {/* White / Dark Mode Switch */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
                className="p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'White' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900" />
                )}
              </motion.button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open mobile navigation menu"
                className="xl:hidden p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Horizontal Section Bar (< xl) so the full app is 1-tap available on mobile */}
          <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-2 py-1 rounded-full liquid-glass-pill max-w-full scrollbar-none touch-pan-x">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'active-nav-btn active-nav-bg bg-white text-black font-bold shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{link.name}</span>
                </button>
              );
            })}
            {onOpenFeatures && (
              <button
                type="button"
                onClick={onOpenFeatures}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shrink-0"
              >
                <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Features</span>
              </button>
            )}
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap text-zinc-200 bg-white/10 hover:bg-white hover:text-black transition-all shrink-0"
              >
                <FileText className="w-3 h-3 shrink-0" />
                <span>Resume CV</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Slidebar Menu / Full App Launcher Drawer — Floating, Fully Rounded VisionOS Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop with Smooth Blur and High Contrast */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Floating Rounded Slidebar Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="fixed top-2 sm:top-3 right-2 sm:right-3 bottom-2 sm:bottom-3 w-[calc(100vw-16px)] sm:w-88 max-w-[360px] bg-zinc-950/98 text-white p-4 sm:p-5 rounded-[28px] sm:rounded-[34px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col justify-between border border-white/20 liquid-glass-modal overflow-y-auto scrollbar-none z-50"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/25 bg-[#f4f4f6] shrink-0">
                      <img
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-[48%_36%] scale-125"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{PERSONAL_INFO.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Available
                        </span>
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-mono">Big Data & AI Architect</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Section Navigation Grid */}
                <div className="mt-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2 px-1">
                    Quick Navigation
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeSection === link.href.replace('#', '');
                      return (
                        <button
                          key={link.name}
                          onClick={() => handleNavClick(link.href)}
                          className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-2xl text-left text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-white text-black shadow-md font-bold'
                              : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{link.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feature Suite Direct Access */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2 px-1">
                    Free & Unlimited Suite
                  </span>
                  <div className="space-y-1.5">
                    {onOpenFeatures && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenFeatures();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>All Features Directory</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/25 text-white">
                          28+ Free
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenVibe();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/15 text-white hover:bg-white/10 transition-all text-xs font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <AudioLines className="w-3.5 h-3.5 text-white" />
                        <span>Ahmed Vibe Studio</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-zinc-200">
                        {activeCount > 0 ? `${activeCount} On` : '84 Sounds'}
                      </span>
                    </button>

                    {onOpenCommandPalette && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenCommandPalette();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-zinc-200 hover:bg-white/10 transition-all text-xs font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Command Search</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-400">
                          ⌘K
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions Drawer Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white text-black font-bold text-xs shadow-md hover:bg-zinc-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Printable Resume / CV (PDF)</span>
                  </button>
                )}

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenControls();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.06] border border-white/15 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>3D & Controls</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onToggleTheme();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.06] border border-white/15 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Moon className="w-3.5 h-3.5" />
                    )}
                    <span>{theme === 'dark' ? 'White' : 'Dark'} Mode</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

