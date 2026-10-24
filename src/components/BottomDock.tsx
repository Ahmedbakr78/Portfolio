import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  UserCheck,
  Briefcase,
  Layers,
  Award,
  Activity,
  Database,
  Mail,
  AudioLines,
  FileText,
  ArrowUp
} from 'lucide-react';

interface BottomDockProps {
  onOpenVibe: () => void;
  onOpenResume?: () => void;
  activeSection: string;
  activeVibeCount: number;
  isVibePlaying: boolean;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onOpenVibe,
  onOpenResume,
  activeSection,
  activeVibeCount,
  isVibePlaying,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setIsScrolled(scrollY > 100);
      // Detect when scrolled near the very end of the page
      setIsAtEnd(scrollY + windowHeight >= docHeight - 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dockItems = [
    { id: 'about', label: 'About', icon: UserCheck, mobileHidden: true },
    { id: 'experience', label: 'Exp', icon: Briefcase, mobileHidden: true },
    { id: 'projects', label: 'Projects', icon: Layers, mobileHidden: false },
    { id: 'certifications', label: 'Certs', icon: Award, mobileHidden: false },
    { id: 'simulator', label: 'Simulator', icon: Activity, mobileHidden: false },
    { id: 'skills', label: 'Skills', icon: Database, mobileHidden: true },
  ];

  // Hide text labels when scrolled down or at the end of the page unless hovered or active
  const collapseLabels = isScrolled || isAtEnd;

  return (
    <aside
      aria-label="Quick Actions Dock"
      className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-40 px-2.5 sm:px-4 pointer-events-none flex justify-center"
    >
      {/* Scroll-Animated Bottom Dock Pill — Mobile-Responsive & Scrollable */}
      <motion.div
        layout
        initial={{ y: 40, opacity: 0 }}
        animate={{
          y: isAtEnd ? 4 : 0,
          opacity: 1,
          scale: isAtEnd ? 0.94 : isScrolled ? 0.97 : 1,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full liquid-glass-pill shadow-2xl max-w-[calc(100vw-20px)]"
      >
        <motion.button
          layout
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setHoveredItem('top')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0"
          title="Return to top"
        >
          <Home className="w-4 h-4 shrink-0" />
          <AnimatePresence initial={false}>
            {(!collapseLabels || hoveredItem === 'top') && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block overflow-hidden whitespace-nowrap"
              >
                Top
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="w-[1px] h-4 bg-white/15 mx-0.5 shrink-0" />

        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          const showText = (!collapseLabels && !isAtEnd) || isActive || isHovered;

          return (
            <motion.button
              layout
              key={item.id}
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => scrollTo(item.id)}
              aria-label={`Jump to ${item.label}`}
              className={`${item.mobileHidden ? 'hidden md:flex' : 'flex'} relative p-2 sm:px-3 sm:py-1.5 rounded-full transition-colors items-center gap-1.5 text-xs font-medium shrink-0 ${
                isActive
                  ? 'active-nav-btn text-black font-semibold'
                  : 'hover:bg-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-dock-active-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="active-nav-bg absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              <AnimatePresence initial={false}>
                {showText && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:inline-block overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Ahmed Vibe Button */}
        <motion.button
          layout
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setHoveredItem('vibe')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onOpenVibe}
          aria-label="Open Ahmed Vibe Ambient Sounds"
          className={`p-2 sm:px-3 sm:py-1.5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0 ${
            isVibePlaying && activeVibeCount > 0
              ? 'bg-white text-black font-bold'
              : 'hover:bg-white/10 text-zinc-300 hover:text-white'
          }`}
          title="Ahmed Vibe — Ambient Sound Mixer (84 Sounds)"
        >
          <AudioLines className="w-4 h-4 shrink-0" />
          <AnimatePresence initial={false}>
            {(!collapseLabels || hoveredItem === 'vibe') && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block overflow-hidden whitespace-nowrap"
              >
                Vibe
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {onOpenResume && (
          <motion.button
            layout
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => setHoveredItem('cv')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onOpenResume}
            aria-label="Open Interactive Resume PDF"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0"
            title="Resume / CV PDF"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <AnimatePresence initial={false}>
              {(!collapseLabels || hoveredItem === 'cv') && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:inline-block overflow-hidden whitespace-nowrap"
                >
                  CV
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        <div className="w-[1px] h-4 bg-white/15 mx-0.5 shrink-0" />

        <motion.button
          layout
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setHoveredItem('hire')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => scrollTo('contact')}
          aria-label="Jump to Contact"
          className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <AnimatePresence initial={false}>
            {(!isAtEnd || hoveredItem === 'hire') && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap inline-block"
              >
                Hire Me
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </aside>
  );
};

