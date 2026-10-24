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
  Cpu
} from 'lucide-react';
import { BackgroundStyle } from './ThreeBackground';

interface AccountControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onSetTheme: (t: 'dark' | 'light') => void;
  bgStyle: BackgroundStyle;
  onSetBgStyle: (s: BackgroundStyle) => void;
  silentMode: boolean;
  onSetSilentMode: (s: boolean) => void;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - transparent so background is never hidden */}
      <div
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-zinc-950/85 text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-y-auto max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200 space-y-6 liquid-glass">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Account & Portfolio Control Center
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Custom rendering preferences & system controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
            aria-label="Close controls modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Mode Switcher */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
            Visual Theme Mode
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSetTheme('dark')}
              className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                theme === 'dark'
                  ? 'bg-white/15 border-white text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Moon className="w-5 h-5 text-white" />
              <div className="text-left">
                <span className="block text-xs font-bold text-white">Onyx Dark Mode</span>
                <span className="text-[11px] text-zinc-400">Deep monochrome contrast</span>
              </div>
            </button>

            <button
              onClick={() => onSetTheme('light')}
              className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                theme === 'light'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Sun className="w-5 h-5 text-current" />
              <div className="text-left">
                <span className="block text-xs font-bold">Minimal White Mode</span>
                <span className="text-[11px] text-zinc-500">Pristine daylight layout</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. 3D Background Engine Preset */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
              3D Background Engine
            </span>
            <span className="text-[10px] font-mono text-white">
              Autonomous 60 FPS
            </span>
          </div>

          <div className="space-y-2">
            {bgStyles.map((item) => (
              <button
                key={item.id}
                onClick={() => onSetBgStyle(item.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-colors ${
                  bgStyle === item.id
                    ? 'bg-white/15 border-white text-white'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{item.label}</span>
                    {bgStyle === item.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                </div>
                <Boxes className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* 3. Cursor & Motion Discipline */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
            Interaction & Transition Discipline
          </span>

          <div className="space-y-2 text-xs">
            {/* Cursor Interaction Lock */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MousePointer className="w-4 h-4 text-white" />
                <div>
                  <span className="font-bold text-white block">Cursor Interference Lock</span>
                  <span className="text-[11px] text-zinc-400">
                    Cursor does not tilt or shake 3D background (per instruction)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-white font-mono text-[10px] font-bold">
                LOCKED OFF
              </span>
            </div>

            {/* Silent Smooth Reload Transitions */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-white" />
                <div>
                  <span className="font-bold text-white block">Silent Navigation</span>
                  <span className="text-[11px] text-zinc-400">
                    Zero jarring animations or flickering reloads
                  </span>
                </div>
              </div>
              <button
                onClick={() => onSetSilentMode(!silentMode)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-colors ${
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

        {/* 4. System Diagnostics */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-400 space-y-1.5">
          <div className="flex items-center justify-between text-zinc-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              Runtime Telemetry
            </span>
            <span className="text-white">OPTIMAL</span>
          </div>
          <div className="flex justify-between">
            <span>Scrollbar Status:</span>
            <span className="text-white">Hidden Globally</span>
          </div>
          <div className="flex justify-between">
            <span>Renderer Pipeline:</span>
            <span className="text-white">Three.js WebGL (Alpha Antialiased)</span>
          </div>
          <div className="flex justify-between">
            <span>Responsive Viewport:</span>
            <span className="text-white">Mobile + Tablet + Desktop Native</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
