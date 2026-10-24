import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shuffle,
  RotateCcw,
  Search,
  Waves,
  CloudRain,
  Wind,
  Flame,
  Trees,
  Droplets,
  Bird,
  Bug,
  Cat,
  Car,
  Coffee,
  Train,
  Plane,
  Keyboard,
  Clock,
  Radio,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Headphones,
  Shield,
  Disc,
  AudioLines,
  ArrowUp
} from 'lucide-react';
import {
  VIBE_SOUNDS,
  VIBE_CATEGORIES,
  VIBE_PRESETS,
  VibeCategory,
  VibeSoundItem,
} from '../utils/vibeAudioEngine';

interface NevaiVibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMix: Record<string, number>;
  isPlaying: boolean;
  masterVolume: number;
  onToggleSound: (sound: VibeSoundItem) => void;
  onChangeSoundVolume: (sound: VibeSoundItem, volume: number) => void;
  onToggleMasterPlay: () => void;
  onChangeMasterVolume: (vol: number) => void;
  onApplyPreset: (mix: Record<string, number>) => void;
  onRandomMix: () => void;
  onClearMix: () => void;
}

export const NevaiVibeModal: React.FC<NevaiVibeModalProps> = ({
  isOpen,
  onClose,
  activeMix,
  isPlaying,
  masterVolume,
  onToggleSound,
  onChangeSoundVolume,
  onToggleMasterPlay,
  onChangeMasterVolume,
  onApplyPreset,
  onRandomMix,
  onClearMix,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VibeCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBodyScrolled, setIsBodyScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Lock background page scroll while modal is open so wheel events stay 100% inside the modal
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const maxScroll = target.scrollHeight - target.clientHeight;
    setIsBodyScrolled(scrollTop > 24);
    setScrollProgress(maxScroll > 0 ? Math.min(100, Math.round((scrollTop / maxScroll) * 100)) : 0);
  };

  const scrollToTopOfModal = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: VibeCategory | 'All') => {
    setSelectedCategory(cat);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleCategoryCollapse = (cat: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const getCategoryIcon = (category: VibeCategory) => {
    switch (category) {
      case 'Nature':
        return Trees;
      case 'Rain':
        return CloudRain;
      case 'Animals':
        return Bird;
      case 'Urban':
        return Car;
      case 'Places':
        return Coffee;
      case 'Transport':
        return Train;
      case 'Things':
        return Keyboard;
      case 'Noise':
        return Radio;
      default:
        return Headphones;
    }
  };

  const getSoundIcon = (sound: VibeSoundItem) => {
    const name = sound.name.toLowerCase();
    if (name.includes('rain') || name.includes('thunder')) return CloudRain;
    if (
      name.includes('wave') ||
      name.includes('river') ||
      name.includes('waterfall') ||
      name.includes('underwater') ||
      name.includes('boat') ||
      name.includes('submarine')
    )
      return Waves;
    if (name.includes('fire')) return Flame;
    if (name.includes('wind')) return Wind;
    if (name.includes('tree') || name.includes('jungle') || name.includes('leaves')) return Trees;
    if (name.includes('drop') || name.includes('bubble')) return Droplets;
    if (sound.category === 'Animals') {
      if (name.includes('cat')) return Cat;
      if (name.includes('cricket') || name.includes('bee')) return Bug;
      return Bird;
    }
    if (sound.category === 'Urban') return Car;
    if (sound.category === 'Places') return Coffee;
    if (sound.category === 'Transport') {
      if (name.includes('plane')) return Plane;
      return Train;
    }
    if (name.includes('keyboard') || name.includes('typewriter')) return Keyboard;
    if (name.includes('clock') || name.includes('wiper')) return Clock;
    if (name.includes('vinyl') || name.includes('bowl')) return Disc;
    if (sound.category === 'Noise') return Radio;
    return Headphones;
  };

  const activeSoundIds = Object.keys(activeMix);
  const activeCount = activeSoundIds.length;

  const categoriesToDisplay =
    selectedCategory === 'All' ? VIBE_CATEGORIES : [selectedCategory];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop - transparent so background is never hidden */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-transparent"
            onClick={onClose}
          />

          {/* Main Ahmed Vibe Studio Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="relative w-full max-w-6xl bg-zinc-950/85 text-white rounded-[32px] border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-hidden z-10 flex flex-col h-[90vh] max-h-[92vh] liquid-glass"
          >
            {/* Top Header (Auto-compacts when scrolling the sounds list) */}
            <div
              className={`px-5 sm:px-8 border-b border-white/15 bg-zinc-950/90 backdrop-blur-2xl transition-all duration-200 shrink-0 ${
                isBodyScrolled ? 'py-3 space-y-2.5' : 'py-4 sm:py-5 space-y-3.5'
              }`}
            >
              {/* Row 1: Editorial Identity + Search Input + Close Button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg shrink-0">
                    <AudioLines className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">
                        AHMED VIBE STUDIO
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-bold text-white">
                        84 Sounds
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                        <Shield className="w-3 h-3 text-white" />
                        Secure · Private · Unified
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white font-zara">
                      Ambient Sounds — For Focus and Calm
                    </h2>
                  </div>
                </div>

                {/* Right side of Row 1: Search Bar & Close Button */}
                <div className="flex items-center gap-2.5 self-end md:self-auto w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search 84 ambient sounds..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors shrink-0"
                    aria-label="Close Ahmed Vibe"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Row 2: Master Transport Deck & Presets */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={onToggleMasterPlay}
                    className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  >
                    {isPlaying && activeCount > 0 ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pause ({activeCount})</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Mix</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onRandomMix}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Generate random 3-sound ambient mix"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Random</span>
                  </button>

                  {activeCount > 0 && (
                    <button
                      onClick={onClearMix}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}

                  {/* Sleek Master Volume Capsule */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15">
                    <button
                      type="button"
                      onClick={() => onChangeMasterVolume(masterVolume > 0 ? 0 : 0.8)}
                      className="text-zinc-300 hover:text-white"
                      aria-label="Mute or unmute master volume"
                    >
                      {masterVolume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={masterVolume}
                      onChange={(e) => onChangeMasterVolume(parseFloat(e.target.value))}
                      aria-label="Master Volume"
                      className="w-20 sm:w-24 cursor-pointer h-1.5 bg-zinc-500/30 rounded-lg"
                    />
                    <span className="text-[10px] font-mono font-bold text-white w-7 text-right">
                      {Math.round(masterVolume * 100)}%
                    </span>
                  </div>
                </div>

                {/* Curated Focus Soundscape Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-0.5 sm:pb-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mr-1 hidden sm:inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-white" />
                    Presets:
                  </span>
                  {VIBE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => onApplyPreset(preset.mix)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/15 text-[11px] font-mono font-medium text-zinc-200 whitespace-nowrap transition-all cursor-pointer shrink-0"
                      title={preset.subtitle}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Full-Width Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-0.5 sm:pb-0">
                <button
                  onClick={() => handleSelectCategory('All')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedCategory === 'All'
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  All (84)
                </button>
                {VIBE_CATEGORIES.map((cat) => {
                  const CatIcon = getCategoryIcon(cat);
                  const countInCat = VIBE_SOUNDS.filter((s) => s.category === cat).length;
                  const activeInCat = VIBE_SOUNDS.filter(
                    (s) => s.category === cat && (activeMix[s.id] || 0) > 0
                  ).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-white text-black shadow-sm'
                          : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      <CatIcon className="w-3 h-3" />
                      <span>{cat}</span>
                      <span className="text-[10px] font-mono opacity-60">
                        {activeInCat > 0 ? `${activeInCat}/${countInCat}` : countInCat}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Smooth Scroll Progress Hairline */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>

            {/* SELECTED ELEMENT: High-Performance Smooth Scroll Container for 84 Sounds */}
            <div
              ref={scrollContainerRef}
              onScroll={handleContainerScroll}
              className="relative p-5 sm:p-7 overflow-y-auto overscroll-contain scroll-smooth space-y-8 flex-1 min-h-0"
            >
              {categoriesToDisplay.map((category) => {
                const soundsInCat = VIBE_SOUNDS.filter(
                  (s) =>
                    s.category === category &&
                    (searchQuery.trim() === '' ||
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                );

                if (soundsInCat.length === 0) return null;

                const isCollapsed = Boolean(collapsedCategories[category]);
                const displayedSounds = isCollapsed ? soundsInCat.slice(0, 6) : soundsInCat;
                const CatIcon = getCategoryIcon(category);
                const activeInCatCount = soundsInCat.filter(
                  (s) => (activeMix[s.id] || 0) > 0
                ).length;

                return (
                  <div key={category} id={`vibe-cat-${category}`} className="space-y-3.5 scroll-mt-4">
                    {/* Category Section Header Bar inside Scroll View */}
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/15">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white font-zara tracking-wide">
                            {category}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300">
                            {soundsInCat.length} Sounds
                          </span>
                          {activeInCatCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-mono font-bold">
                              {activeInCatCount} Active
                            </span>
                          )}
                        </div>
                      </div>

                      {soundsInCat.length > 6 && (
                        <button
                          onClick={() => toggleCategoryCollapse(category)}
                          className="text-xs font-mono font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
                        >
                          <span>
                            {isCollapsed
                              ? `Show All (${soundsInCat.length})`
                              : 'Show Less'}
                          </span>
                          {isCollapsed ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronUp className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Hardware-Accelerated Sound Tiles Grid (Zero Scroll Jank) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {displayedSounds.map((sound) => {
                        const Icon = getSoundIcon(sound);
                        const vol = activeMix[sound.id] || 0;
                        const isSoundActive = vol > 0;
                        const pct = Math.round(vol * 100);

                        return (
                          <div
                            key={sound.id}
                            className={`group relative p-3.5 rounded-2xl border transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] flex flex-col justify-between gap-3 ${
                              isSoundActive
                                ? 'bg-white/15 border-white/50 text-white shadow-xl'
                                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/30 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            {isSoundActive && (
                              <span className="absolute top-2.5 right-2.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white text-black">
                                {pct}%
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => onToggleSound(sound)}
                              className="w-full flex flex-col items-center gap-2 pt-1 cursor-pointer"
                            >
                              <div
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-150 ${
                                  isSoundActive
                                    ? 'bg-white text-black shadow-lg scale-105'
                                    : 'bg-white/5 border border-white/10 text-zinc-300 group-hover:border-white/25 group-hover:text-white'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-xs font-semibold text-center leading-tight line-clamp-1">
                                {sound.name}
                              </span>
                            </button>

                            {/* Custom Volume Fill Bar */}
                            <div className="relative w-full h-4 flex items-center">
                              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-white rounded-full transition-all duration-100"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.02}
                                value={vol}
                                onChange={(e) =>
                                  onChangeSoundVolume(sound, parseFloat(e.target.value))
                                }
                                aria-label={`${sound.name} volume`}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Floating Scroll-to-Top Pill inside the Sounds Scroll Container */}
              {isBodyScrolled && (
                <div className="sticky bottom-2 flex justify-end pointer-events-none z-30">
                  <button
                    type="button"
                    onClick={scrollToTopOfModal}
                    className="pointer-events-auto px-3.5 py-2 rounded-full bg-white text-black font-bold text-xs shadow-2xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    aria-label="Scroll to top of sounds"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Top ({scrollProgress}%)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400 shrink-0">
              <span>Ahmed Vibe — Ambient Sound Mixer and Focus Enhancer by Ahmed Abo Bakr.</span>
              <span className="text-white font-semibold">
                {activeCount > 0
                  ? `${activeCount} sound${activeCount > 1 ? 's' : ''} active in continuous mix`
                  : 'Click any sound tile to start mixing'}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
