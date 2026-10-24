import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Github,
  Linkedin,
  Mail,
  Download,
  Activity,
  Layers,
  Cpu,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
  Camera,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenSimulator: () => void;
  onOpenResume: () => void;
}

type PortraitStyleMode = 'studio' | 'natural' | 'warm' | 'mono' | 'avatar-3d';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSimulator,
  onOpenResume,
}) => {
  const [portraitMode, setPortraitMode] = useState<PortraitStyleMode>('studio');
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Precision True-Color Studio Portrait Renderer:
  // Crops out the empty top 20.5% white margin & 3.5% right-side scanner line from /assets/avatar_pages.jpg,
  // preserves 100% authentic warm skin tones and the white cable-knit turtleneck sweater,
  // and uses exact algebraic alpha unmixing on the exterior studio wall for zero-halo studio lighting.
  useEffect(() => {
    if (portraitMode === 'avatar-3d') {
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (cancelled || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      // Precision portrait crop: balanced headroom above hair, removes top empty margin and right grey artifact line
      const sx = Math.round(w * 0.035);
      const sy = Math.round(h * 0.205);
      const sw = Math.round(w * 0.925);
      const sh = Math.round(h * 0.785);

      const outW = 680;
      const outH = 800;
      canvas.width = outW;
      canvas.height = outH;

      // Draw cropped source image to offscreen buffer
      const offscreen = document.createElement('canvas');
      offscreen.width = outW;
      offscreen.height = outH;
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = 'high';
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

      if (portraitMode === 'natural' || portraitMode === 'warm') {
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.filter =
          portraitMode === 'warm'
            ? 'contrast(1.03) saturate(1.08) sepia(0.06) brightness(1.01)'
            : 'contrast(1.02) saturate(1.04)';
        ctx.drawImage(offscreen, 0, 0);
        ctx.restore();
        setCanvasReady(true);
        return;
      }

      const srcImgData = octx.getImageData(0, 0, outW, outH);
      const data = srcImgData.data;

      // Connected-component exterior wall discovery from top/left/right borders (above coat/sweater)
      const visited = new Uint8Array(outW * outH);
      const queue = new Int32Array(outW * outH);
      let qHead = 0;
      let qTail = 0;

      const isExteriorWall = (idx: number) => {
        const r = data[idx * 4];
        const g = data[idx * 4 + 1];
        const b = data[idx * 4 + 2];
        // Matches exterior bright studio wall (including warm bounce light near ears/cheeks)
        // while stopping cleanly at dark hair/coat (b < 90) and warm skin contour (b < 185).
        // The white turtleneck is enclosed inside the dark coat lapels and chin so border flood-fill never enters it.
        return b > 196 && g > 204 && r > 210;
      };

      for (let x = 0; x < outW; x++) {
        if (isExteriorWall(x)) {
          visited[x] = 1;
          queue[qTail++] = x;
        }
      }
      for (let y = 0; y < Math.floor(outH * 0.76); y++) {
        const idxL = y * outW;
        const idxR = y * outW + (outW - 1);
        if (!visited[idxL] && isExteriorWall(idxL)) {
          visited[idxL] = 1;
          queue[qTail++] = idxL;
        }
        if (!visited[idxR] && isExteriorWall(idxR)) {
          visited[idxR] = 1;
          queue[qTail++] = idxR;
        }
      }

      while (qHead < qTail) {
        const curr = queue[qHead++];
        const cx = curr % outW;
        const cy = (curr - cx) / outW;

        if (cx > 0) {
          const n = curr - 1;
          if (!visited[n] && isExteriorWall(n)) {
            visited[n] = 1;
            queue[qTail++] = n;
          }
        }
        if (cx < outW - 1) {
          const n = curr + 1;
          if (!visited[n] && isExteriorWall(n)) {
            visited[n] = 1;
            queue[qTail++] = n;
          }
        }
        if (cy > 0) {
          const n = curr - outW;
          if (!visited[n] && isExteriorWall(n)) {
            visited[n] = 1;
            queue[qTail++] = n;
          }
        }
        if (cy < outH - 1) {
          const n = curr + outW;
          if (!visited[n] && isExteriorWall(n)) {
            visited[n] = 1;
            queue[qTail++] = n;
          }
        }
      }

      // Expand exterior zone by 4px into anti-aliased boundary pixels adjacent to the exterior wall
      let distMap = new Uint8Array(outW * outH);
      for (let i = 0; i < outW * outH; i++) {
        if (visited[i]) distMap[i] = 1;
      }
      for (let step = 1; step <= 4; step++) {
        const nextDist = new Uint8Array(distMap);
        for (let y = 1; y < Math.floor(outH * 0.78); y++) {
          for (let x = 1; x < outW - 1; x++) {
            const idx = y * outW + x;
            if (distMap[idx] === 0) {
              if (
                distMap[idx - 1] > 0 ||
                distMap[idx + 1] > 0 ||
                distMap[idx - outW] > 0 ||
                distMap[idx + outW] > 0
              ) {
                nextDist[idx] = step + 1;
              }
            }
          }
        }
        distMap = nextDist;
      }

      // Compute continuous white-wall alpha inside the exterior zone using the blue channel
      // (since skin, hair, and coat at the contour have low blue channel b <= 135, whereas the white wall has b >= 248)
      let alphaMap = new Float32Array(outW * outH);
      for (let i = 0; i < outW * outH; i++) {
        const d = distMap[i];
        if (d === 1) {
          alphaMap[i] = 1.0;
        } else if (d > 1) {
          const b = data[i * 4 + 2];
          if (b > 130) {
            const w = Math.min(1, Math.max(0, (b - 130) / (245 - 130)));
            alphaMap[i] = w;
          }
        }
      }

      // 2-pass smooth box filter for silky hair, ear, and coat transitions
      for (let pass = 0; pass < 2; pass++) {
        const nextAlpha = new Float32Array(outW * outH);
        for (let y = 1; y < outH - 1; y++) {
          for (let x = 1; x < outW - 1; x++) {
            let sum = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                sum += alphaMap[(y + dy) * outW + (x + dx)];
              }
            }
            nextAlpha[y * outW + x] = sum / 9;
          }
        }
        alphaMap = nextAlpha;
      }

      // Draw soft editorial studio spotlight backdrop on main canvas
      const grad = ctx.createRadialGradient(
        outW * 0.5,
        outH * 0.4,
        outW * 0.05,
        outW * 0.5,
        outH * 0.46,
        outW * 0.75
      );
      grad.addColorStop(0, '#444450');
      grad.addColorStop(0.52, '#222229');
      grad.addColorStop(1, '#101014');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, outW, outH);

      const bgPixels = ctx.getImageData(0, 0, outW, outH).data;
      const finalImg = ctx.createImageData(outW, outH);
      const out = finalImg.data;

      // Algebraic color unmixing: out = pixel - bgWeight * (whiteWall - studioBg)
      // Completely eliminates white/grey edge halos while leaving foreground skin & white sweater 100% authentic
      for (let i = 0; i < outW * outH; i++) {
        const bgW = alphaMap[i];
        let r = data[i * 4];
        let g = data[i * 4 + 1];
        let b = data[i * 4 + 2];

        // Unmix exterior white wall (252, 252, 252) and replace with studio backdrop
        const bgR = bgPixels[i * 4];
        const bgG = bgPixels[i * 4 + 1];
        const bgB = bgPixels[i * 4 + 2];

        r = Math.min(255, Math.max(0, Math.round(r - bgW * (252 - bgR))));
        g = Math.min(255, Math.max(0, Math.round(g - bgW * (252 - bgG))));
        b = Math.min(255, Math.max(0, Math.round(b - bgW * (252 - bgB))));

        if (portraitMode === 'mono') {
          const lum = Math.min(
            255,
            Math.max(0, Math.round((0.299 * r + 0.587 * g + 0.114 * b - 120) * 1.08 + 124))
          );
          r = lum;
          g = lum;
          b = lum;
        }

        out[i * 4] = r;
        out[i * 4 + 1] = g;
        out[i * 4 + 2] = b;
        out[i * 4 + 3] = 255;
      }

      ctx.putImageData(finalImg, 0, 0);
      setCanvasReady(true);
    };

    img.src = '/assets/avatar_pages.jpg';
    return () => {
      cancelled = true;
    };
  }, [portraitMode]);

  return (
    <section id="hero" className="relative pt-28 pb-12 sm:pt-36 sm:pb-24 px-3.5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Availability & GitHub Highlights Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs font-mono text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="w-2 h-2 rounded-full bg-white -ml-4" />
            <span>OPEN TO COLLABORATE • @NEVAI-ORG FOUNDER</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs text-zinc-300 font-mono">
            <GitPullRequest className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Pull Shark x2 · Quickdraw · GitHub Pro</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
            <span className="truncate">Cairo, Egypt · {PERSONAL_INFO.email}</span>
          </div>
        </motion.div>

        {/* Hero Card with Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-10 md:p-12 liquid-glass border border-white/20 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        >
          {/* Ambient monochrome lighting accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-center justify-between relative z-10">
            {/* Left Column: Executive Identity, Bio & Actions */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span>{PERSONAL_INFO.title}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-zinc-200 text-[11px] sm:text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Top Performer — AI & ML Track</span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-zara leading-[1.03]">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="mt-3 text-[11px] sm:text-sm font-mono text-zinc-200 tracking-wide uppercase bg-white/[0.05] border border-white/10 rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 inline-block leading-relaxed">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Architecting scalable, high-performance, cost-optimized data ecosystems — from{' '}
                <span className="text-white font-semibold">35-source Kimball data warehouses</span> and{' '}
                <span className="text-white font-semibold">216-endpoint FastAPI platforms</span> to the{' '}
                <span className="text-white font-semibold">Heros 6-extension browser suite</span>.
              </p>

              {/* Key Architecture Highlights Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 max-w-2xl">
                <div className="px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Spark & Airflow</div>
                    <div className="text-[10px] font-mono text-zinc-400">Distributed ETL/ELT</div>
                  </div>
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Kimball & Lakehouse</div>
                    <div className="text-[10px] font-mono text-zinc-400">Delta · Iceberg · SQL</div>
                  </div>
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">RAG & LLMOps</div>
                    <div className="text-[10px] font-mono text-zinc-400">AWS EKS · Azure ML</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons — Mobile 2x2 Grid & Desktop Inline Row */}
              <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  className="px-4 sm:px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all duration-150 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Get in Touch</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#projects"
                  className="px-3.5 sm:px-4 py-2.5 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 border border-white/20 font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Projects ({PROJECTS.length})</span>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenSimulator}
                  className="px-3.5 sm:px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-white shrink-0" />
                  <span>Simulator</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenResume}
                  className="px-3.5 sm:px-4 py-2.5 rounded-full bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Resume PDF</span>
                </motion.button>
              </div>
            </div>

            {/* Right Column: Executive Studio Portrait Frame & Color Grade Switcher */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-end">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="relative group"
              >
                {/* Outer ambient studio rim glow */}
                <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-b from-white/35 via-white/10 to-white/25 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Main Studio Portrait Container */}
                <div className="relative w-64 h-72 sm:w-68 sm:h-80 rounded-[28px] overflow-hidden border-2 border-white/30 bg-[#f4f4f6] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
                  {/* Top Verified Badge — Theme-proof dark glass */}
                  <div className="portrait-glass-badge absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-white shrink-0" />
                    <span className="text-[10px] font-mono text-white tracking-wider uppercase whitespace-nowrap font-semibold">
                      Verified Portrait
                    </span>
                  </div>

                  {/* Studio Processed Canvas or 3D Avatar */}
                  {portraitMode === 'avatar-3d' ? (
                    <img
                      src="/assets/avatar_github.jpg"
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <canvas
                        ref={canvasRef}
                        aria-label={PERSONAL_INFO.name}
                        className={`w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ${
                          canvasReady ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {!canvasReady && (
                        <img
                          src={PERSONAL_INFO.avatar}
                          alt={PERSONAL_INFO.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-[48%_36%] scale-125"
                        />
                      )}
                    </>
                  )}

                  {/* Bottom Glass Identity Caption — Theme-proof dark glass */}
                  <div className="portrait-glass-badge absolute bottom-2.5 left-2.5 right-2.5 px-3.5 py-2 rounded-2xl flex items-center justify-between z-20 shadow-lg">
                    <div>
                      <div className="text-[11px] font-bold text-white leading-tight">
                        Ahmed Abo Bakr
                      </div>
                      <div className="text-[10px] font-mono text-zinc-200">
                        Helwan CS • 3.0 GPA
                      </div>
                    </div>
                    <span className="portrait-pill-tag px-2 py-0.5 rounded-lg bg-white text-black text-[10px] font-mono font-bold">
                      8K+
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Studio Portrait Color Grade Switcher */}
              <div className="mt-3 flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md">
                <Camera className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-0.5 shrink-0" />
                {(
                  [
                    { id: 'studio', label: 'Studio' },
                    { id: 'natural', label: 'Natural' },
                    { id: 'warm', label: 'Warm' },
                    { id: 'mono', label: 'Mono' },
                    { id: 'avatar-3d', label: '3D' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPortraitMode(mode.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                      portraitMode === mode.id
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Social Channels */}
              <div className="mt-3 flex items-center gap-2 self-center">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all flex items-center gap-1.5 text-xs font-mono border border-white/15"
                  aria-label="GitHub Profile"
                  title="GitHub Profile (137 Repositories • 2,160 Contributions)"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all flex items-center gap-1.5 text-xs font-mono border border-white/15"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile (8,048+ followers)"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all border border-white/15"
                  aria-label="Email Ahmed Abo Bakr"
                  title="Direct Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                73
              </div>
              <div className="text-xs text-zinc-300 mt-1 font-semibold">
                Certifications (8 Domains)
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                Oxford, Google, AWS, UN, IBM
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                137
              </div>
              <div className="text-xs text-zinc-300 mt-1 font-semibold">
                GitHub Repositories
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                22 Flagship · 6 Heros MV3
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                2,160
              </div>
              <div className="text-xs text-zinc-300 mt-1 font-semibold">
                Yearly Contributions
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                99% Pull Requests · 410 Core
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Marquee Pills */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
          {[
            'Apache Spark',
            'Apache Airflow',
            'Apache Kafka',
            'Apache Flink',
            'Delta Lake & Iceberg',
            'Kimball Warehousing',
            'AWS EKS & SageMaker',
            'Microsoft Azure',
            'Python & FastAPI',
            'React 19 & Angular 17',
            'RAG & LLMOps',
            'RBAC & AES-256',
            'Chromium MV3 & Pyodide WASM',
          ].map((tech) => (
            <span
              key={tech}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

