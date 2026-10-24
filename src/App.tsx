import React, { useState, useEffect } from 'react';
import { ThreeBackground, BackgroundStyle } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { BottomDock } from './components/BottomDock';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { PipelineSimulator } from './components/PipelineSimulator';
import { CertificationsSection } from './components/CertificationsSection';
import { SkillsSection } from './components/SkillsSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AccountControlsModal } from './components/AccountControlsModal';
import { ResumeModal } from './components/ResumeModal';
import { NevaiVibeModal } from './components/NevaiVibeModal';
import { CommandPalette } from './components/CommandPalette';
import { vibeAudio, VIBE_SOUNDS, VIBE_PRESETS, VibeSoundItem } from './utils/vibeAudioEngine';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [bgStyle, setBgStyle] = useState<BackgroundStyle>(() => {
    const saved = localStorage.getItem('portfolio-bg-style');
    return (saved as BackgroundStyle) || 'constellation';
  });

  const [silentMode, setSilentMode] = useState<boolean>(() => {
    return localStorage.getItem('portfolio-silent-mode') === 'true';
  });

  // Modals state
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isVibeOpen, setIsVibeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Continuous Nevai Vibe Audio State (Never stops on modal close or navigation)
  const [activeMix, setActiveMix] = useState<Record<string, number>>({});
  const [isVibePlaying, setIsVibePlaying] = useState<boolean>(true);
  const [masterVolume, setMasterVolume] = useState<number>(0.8);

  // Global ⌘K / Ctrl+K shortcut to toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Sync bgStyle
  useEffect(() => {
    localStorage.setItem('portfolio-bg-style', bgStyle);
  }, [bgStyle]);

  // Sync silentMode
  useEffect(() => {
    localStorage.setItem('portfolio-silent-mode', String(silentMode));
  }, [silentMode]);

  // Scrollspy to update active section
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'experience',
      'projects',
      'simulator',
      'certifications',
      'skills',
      'articles',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: silentMode ? 'auto' : 'smooth' });
    }
  };

  // Nevai Vibe Audio Handlers
  const handleToggleSound = (sound: VibeSoundItem) => {
    setActiveMix((prev) => {
      const next = { ...prev };
      if (next[sound.id] !== undefined) {
        delete next[sound.id];
        vibeAudio.stopSound(sound.id);
      } else {
        const defaultVol = 0.65;
        next[sound.id] = defaultVol;
        if (!isVibePlaying) {
          vibeAudio.setMasterPlaying(true);
          setIsVibePlaying(true);
        }
        vibeAudio.setSoundVolume(sound, defaultVol);
      }
      return next;
    });
  };

  const handleChangeSoundVolume = (sound: VibeSoundItem, volume: number) => {
    setActiveMix((prev) => {
      const next = { ...prev };
      if (volume <= 0.01) {
        delete next[sound.id];
        vibeAudio.stopSound(sound.id);
      } else {
        next[sound.id] = volume;
        if (!isVibePlaying) {
          vibeAudio.setMasterPlaying(true);
          setIsVibePlaying(true);
        }
        vibeAudio.setSoundVolume(sound, volume);
      }
      return next;
    });
  };

  const handleToggleVibePlay = () => {
    // If no sounds are active yet when clicking Play, load the default "Deep Focus" mix automatically
    if (Object.keys(activeMix).length === 0) {
      const defaultMix = VIBE_PRESETS[0].mix;
      setActiveMix(defaultMix);
      vibeAudio.setMasterPlaying(true);
      setIsVibePlaying(true);
      Object.entries(defaultMix).forEach(([id, vol]) => {
        const soundItem = VIBE_SOUNDS.find((s) => s.id === id);
        if (soundItem) {
          vibeAudio.setSoundVolume(soundItem, vol);
        }
      });
      return;
    }

    const nextPlaying = !isVibePlaying;
    setIsVibePlaying(nextPlaying);
    vibeAudio.setMasterPlaying(nextPlaying);
  };

  const handleChangeMasterVolume = (val: number) => {
    setMasterVolume(val);
    vibeAudio.setMasterVolume(val);
  };

  const handleApplyPreset = (presetMix: Record<string, number>) => {
    vibeAudio.stopAll();
    vibeAudio.setMasterPlaying(true);
    setIsVibePlaying(true);
    setActiveMix(presetMix);
    Object.entries(presetMix).forEach(([id, vol]) => {
      const soundItem = VIBE_SOUNDS.find((s) => s.id === id);
      if (soundItem) {
        vibeAudio.setSoundVolume(soundItem, vol);
      }
    });
  };

  const handleRandomMix = () => {
    vibeAudio.stopAll();
    vibeAudio.setMasterPlaying(true);
    setIsVibePlaying(true);
    const shuffled = [...VIBE_SOUNDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    const nextMix: Record<string, number> = {};
    shuffled.forEach((s) => {
      const vol = Number((0.35 + Math.random() * 0.45).toFixed(2));
      nextMix[s.id] = vol;
      vibeAudio.setSoundVolume(s, vol);
    });
    setActiveMix(nextMix);
  };

  const handleClearMix = () => {
    vibeAudio.stopAll();
    setActiveMix({});
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 ${
        theme === 'light' ? 'light bg-white text-[#09090b]' : 'dark bg-black text-white'
      }`}
    >
      {/* 1. Autonomous 3D Flowing Lines Background (Zero cursor interference) */}
      <ThreeBackground theme={theme} style={bgStyle} />

      {/* 2. Floating Rounded Top Bar with Apple Dynamic Island & Vibe Button */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenControls={() => setIsControlsOpen(true)}
        onOpenVibe={() => setIsVibeOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
        activeMix={activeMix}
        isVibePlaying={isVibePlaying}
        masterVolume={masterVolume}
        onToggleVibePlay={handleToggleVibePlay}
        onChangeMasterVolume={handleChangeMasterVolume}
        onRandomMix={handleRandomMix}
        onApplyPreset={handleApplyPreset}
      />

      {/* 3. Main Page Content */}
      <main className="relative z-10">
        <HeroSection
          onOpenSimulator={() => handleNavigateSection('simulator')}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenControls={() => setIsControlsOpen(true)}
        />

        <AboutSection />

        <ExperienceTimeline />

        <ProjectsSection />

        <PipelineSimulator />

        <CertificationsSection />

        <SkillsSection />

        <ArticlesSection />

        <ContactSection />
      </main>

      {/* 4. Rounded Liquid Glass Footer */}
      <Footer />

      {/* 5. Floating Rounded Bottom Quick Actions Dock */}
      <BottomDock
        onOpenVibe={() => setIsVibeOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenControls={() => setIsControlsOpen(true)}
        activeSection={activeSection}
        activeVibeCount={Object.keys(activeMix).length}
        isVibePlaying={isVibePlaying}
      />

      {/* 6. Account & Portfolio Control Center Modal (All Windows, Audio, Sections, 3D & Theme) */}
      <AccountControlsModal
        isOpen={isControlsOpen}
        onClose={() => setIsControlsOpen(false)}
        theme={theme}
        onSetTheme={setTheme}
        bgStyle={bgStyle}
        onSetBgStyle={setBgStyle}
        silentMode={silentMode}
        onSetSilentMode={setSilentMode}
        onOpenVibe={() => setIsVibeOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        activeVibeCount={Object.keys(activeMix).length}
        isVibePlaying={isVibePlaying}
        masterVolume={masterVolume}
        onToggleVibePlay={handleToggleVibePlay}
        onChangeMasterVolume={handleChangeMasterVolume}
        onRandomMix={handleRandomMix}
        onApplyPreset={handleApplyPreset}
      />

      {/* 7. ATS-Optimized Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* 8. Nevai Vibe — Ambient Sound Mixer and Focus Enhancer (84 Sounds) */}
      <NevaiVibeModal
        isOpen={isVibeOpen}
        onClose={() => setIsVibeOpen(false)}
        activeMix={activeMix}
        isPlaying={isVibePlaying}
        masterVolume={masterVolume}
        onToggleSound={handleToggleSound}
        onChangeSoundVolume={handleChangeSoundVolume}
        onToggleMasterPlay={handleToggleVibePlay}
        onChangeMasterVolume={handleChangeMasterVolume}
        onApplyPreset={handleApplyPreset}
        onClearMix={handleClearMix}
        onRandomMix={handleRandomMix}
      />

      {/* 9. Global Command Palette & Instant Search (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={handleNavigateSection}
        onToggleTheme={handleToggleTheme}
        onOpenSimulator={() => handleNavigateSection('simulator')}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenControls={() => setIsControlsOpen(true)}
        onOpenVibe={() => setIsVibeOpen(true)}
        theme={theme}
      />
    </div>
  );
}
