/**
 * Nevai Vibe — Ambient Sound Mixer and Focus Enhancer by Nevai
 * 84 Procedural Continuous Ambient Sounds across 8 Categories
 * Powered by Web Audio API — Zero external dependencies, never stops.
 */

export type VibeCategory =
  | 'Nature'
  | 'Rain'
  | 'Animals'
  | 'Urban'
  | 'Places'
  | 'Transport'
  | 'Things'
  | 'Noise';

export interface VibeSoundItem {
  id: string;
  name: string;
  category: VibeCategory;
  synthType:
    | 'river'
    | 'waves'
    | 'campfire'
    | 'wind'
    | 'howling-wind'
    | 'trees'
    | 'waterfall'
    | 'Crunch'
    | 'droplets'
    | 'jungle'
    | 'light-rain'
    | 'heavy-rain'
    | 'thunder'
    | 'rain-surface'
    | 'birds'
    | 'crickets'
    | 'low-call'
    | 'purr'
    | 'whale'
    | 'buzz'
    | 'tapping'
    | 'traffic'
    | 'siren'
    | 'murmur'
    | 'fireworks'
    | 'hum'
    | 'chimes'
    | 'bowl'
    | 'tick'
    | 'white-noise'
    | 'pink-noise'
    | 'brown-noise';
  baseFreq: number;
  modRate: number;
}

export const VIBE_CATEGORIES: VibeCategory[] = [
  'Nature',
  'Rain',
  'Animals',
  'Urban',
  'Places',
  'Transport',
  'Things',
  'Noise',
];

export const VIBE_SOUNDS: VibeSoundItem[] = [
  // 1. Nature (12)
  { id: 'nat-river', name: 'River', category: 'Nature', synthType: 'river', baseFreq: 420, modRate: 0.35 },
  { id: 'nat-waves', name: 'Waves', category: 'Nature', synthType: 'waves', baseFreq: 180, modRate: 0.14 },
  { id: 'nat-campfire', name: 'Campfire', category: 'Nature', synthType: 'campfire', baseFreq: 1100, modRate: 6.5 },
  { id: 'nat-wind', name: 'Wind', category: 'Nature', synthType: 'wind', baseFreq: 260, modRate: 0.18 },
  { id: 'nat-howling-wind', name: 'Howling Wind', category: 'Nature', synthType: 'howling-wind', baseFreq: 390, modRate: 0.22 },
  { id: 'nat-wind-trees', name: 'Wind in Trees', category: 'Nature', synthType: 'trees', baseFreq: 620, modRate: 0.25 },
  { id: 'nat-waterfall', name: 'Waterfall', category: 'Nature', synthType: 'waterfall', baseFreq: 320, modRate: 0.08 },
  { id: 'nat-walk-snow', name: 'Walk in Snow', category: 'Nature', synthType: 'Crunch', baseFreq: 950, modRate: 1.4 },
  { id: 'nat-walk-leaves', name: 'Walk on Leaves', category: 'Nature', synthType: 'Crunch', baseFreq: 1400, modRate: 1.6 },
  { id: 'nat-walk-gravel', name: 'Walk on Gravel', category: 'Nature', synthType: 'Crunch', baseFreq: 1800, modRate: 1.5 },
  { id: 'nat-droplets', name: 'Droplets', category: 'Nature', synthType: 'droplets', baseFreq: 1200, modRate: 2.2 },
  { id: 'nat-jungle', name: 'Jungle', category: 'Nature', synthType: 'jungle', baseFreq: 780, modRate: 0.45 },

  // 2. Rain (8)
  { id: 'rain-light', name: 'Light Rain', category: 'Rain', synthType: 'light-rain', baseFreq: 850, modRate: 0.2 },
  { id: 'rain-heavy', name: 'Heavy Rain', category: 'Rain', synthType: 'heavy-rain', baseFreq: 520, modRate: 0.15 },
  { id: 'rain-thunder', name: 'Thunder', category: 'Rain', synthType: 'thunder', baseFreq: 68, modRate: 0.12 },
  { id: 'rain-window', name: 'Rain on Window', category: 'Rain', synthType: 'rain-surface', baseFreq: 1150, modRate: 0.4 },
  { id: 'rain-car', name: 'Rain on Car Roof', category: 'Rain', synthType: 'rain-surface', baseFreq: 720, modRate: 0.35 },
  { id: 'rain-umbrella', name: 'Rain on Umbrella', category: 'Rain', synthType: 'rain-surface', baseFreq: 980, modRate: 0.42 },
  { id: 'rain-tent', name: 'Rain on Tent', category: 'Rain', synthType: 'rain-surface', baseFreq: 890, modRate: 0.38 },
  { id: 'rain-leaves', name: 'Rain on Leaves', category: 'Rain', synthType: 'rain-surface', baseFreq: 1320, modRate: 0.5 },

  // 3. Animals (16)
  { id: 'ani-birds', name: 'Birds', category: 'Animals', synthType: 'birds', baseFreq: 2400, modRate: 3.2 },
  { id: 'ani-seagulls', name: 'Seagulls', category: 'Animals', synthType: 'birds', baseFreq: 1650, modRate: 1.4 },
  { id: 'ani-crickets', name: 'Crickets', category: 'Animals', synthType: 'crickets', baseFreq: 3800, modRate: 4.5 },
  { id: 'ani-wolf', name: 'Wolf', category: 'Animals', synthType: 'low-call', baseFreq: 340, modRate: 0.18 },
  { id: 'ani-owl', name: 'Owl', category: 'Animals', synthType: 'low-call', baseFreq: 480, modRate: 0.6 },
  { id: 'ani-frog', name: 'Frog', category: 'Animals', synthType: 'crickets', baseFreq: 680, modRate: 1.8 },
  { id: 'ani-dog', name: 'Dog Barking', category: 'Animals', synthType: 'low-call', baseFreq: 520, modRate: 1.2 },
  { id: 'ani-horse', name: 'Horse Gallop', category: 'Animals', synthType: 'tapping', baseFreq: 280, modRate: 3.4 },
  { id: 'ani-cat', name: 'Cat Purring', category: 'Animals', synthType: 'purr', baseFreq: 55, modRate: 0.8 },
  { id: 'ani-crows', name: 'Crows', category: 'Animals', synthType: 'birds', baseFreq: 920, modRate: 1.1 },
  { id: 'ani-whale', name: 'Whale', category: 'Animals', synthType: 'whale', baseFreq: 140, modRate: 0.12 },
  { id: 'ani-beehive', name: 'Beehive', category: 'Animals', synthType: 'buzz', baseFreq: 195, modRate: 0.4 },
  { id: 'ani-woodpecker', name: 'Woodpecker', category: 'Animals', synthType: 'tapping', baseFreq: 1100, modRate: 7.5 },
  { id: 'ani-chickens', name: 'Chickens', category: 'Animals', synthType: 'birds', baseFreq: 740, modRate: 2.1 },
  { id: 'ani-cows', name: 'Cows', category: 'Animals', synthType: 'low-call', baseFreq: 160, modRate: 0.25 },
  { id: 'ani-sheep', name: 'Sheep', category: 'Animals', synthType: 'low-call', baseFreq: 310, modRate: 0.4 },

  // 4. Urban (7)
  { id: 'urb-highway', name: 'Highway', category: 'Urban', synthType: 'traffic', baseFreq: 190, modRate: 0.22 },
  { id: 'urb-road', name: 'Road', category: 'Urban', synthType: 'traffic', baseFreq: 240, modRate: 0.3 },
  { id: 'urb-siren', name: 'Ambulance Siren', category: 'Urban', synthType: 'siren', baseFreq: 660, modRate: 0.9 },
  { id: 'urb-street', name: 'Busy Street', category: 'Urban', synthType: 'murmur', baseFreq: 380, modRate: 0.4 },
  { id: 'urb-crowd', name: 'Crowd', category: 'Urban', synthType: 'murmur', baseFreq: 460, modRate: 0.55 },
  { id: 'urb-traffic', name: 'Traffic', category: 'Urban', synthType: 'traffic', baseFreq: 165, modRate: 0.18 },
  { id: 'urb-fireworks', name: 'Fireworks', category: 'Urban', synthType: 'fireworks', baseFreq: 420, modRate: 1.5 },

  // 5. Places (16)
  { id: 'pla-cafe', name: 'Cafe', category: 'Places', synthType: 'murmur', baseFreq: 510, modRate: 0.35 },
  { id: 'pla-airport', name: 'Airport', category: 'Places', synthType: 'hum', baseFreq: 210, modRate: 0.15 },
  { id: 'pla-church', name: 'Church', category: 'Places', synthType: 'bowl', baseFreq: 220, modRate: 0.08 },
  { id: 'pla-temple', name: 'Temple', category: 'Places', synthType: 'bowl', baseFreq: 330, modRate: 0.1 },
  { id: 'pla-construction', name: 'Construction Site', category: 'Places', synthType: 'tapping', baseFreq: 350, modRate: 1.8 },
  { id: 'pla-underwater', name: 'Underwater', category: 'Places', synthType: 'whale', baseFreq: 95, modRate: 0.16 },
  { id: 'pla-bar', name: 'Crowded Bar', category: 'Places', synthType: 'murmur', baseFreq: 580, modRate: 0.6 },
  { id: 'pla-night-village', name: 'Night Village', category: 'Places', synthType: 'crickets', baseFreq: 2900, modRate: 2.2 },
  { id: 'pla-subway', name: 'Subway Station', category: 'Places', synthType: 'hum', baseFreq: 145, modRate: 0.25 },
  { id: 'pla-office', name: 'Office', category: 'Places', synthType: 'hum', baseFreq: 310, modRate: 0.3 },
  { id: 'pla-supermarket', name: 'Supermarket', category: 'Places', synthType: 'murmur', baseFreq: 440, modRate: 0.28 },
  { id: 'pla-carousel', name: 'Carousel', category: 'Places', synthType: 'chimes', baseFreq: 523.25, modRate: 0.9 },
  { id: 'pla-laboratory', name: 'Laboratory', category: 'Places', synthType: 'hum', baseFreq: 260, modRate: 0.4 },
  { id: 'pla-laundry', name: 'Laundry Room', category: 'Places', synthType: 'hum', baseFreq: 125, modRate: 1.1 },
  { id: 'pla-restaurant', name: 'Restaurant', category: 'Places', synthType: 'murmur', baseFreq: 540, modRate: 0.45 },
  { id: 'pla-library', name: 'Library', category: 'Places', synthType: 'trees', baseFreq: 390, modRate: 0.12 },

  // 6. Transport (6)
  { id: 'tra-train', name: 'Train', category: 'Transport', synthType: 'tapping', baseFreq: 180, modRate: 2.6 },
  { id: 'tra-inside-train', name: 'Inside a Train', category: 'Transport', synthType: 'hum', baseFreq: 115, modRate: 1.4 },
  { id: 'tra-airplane', name: 'Airplane', category: 'Transport', synthType: 'brown-noise', baseFreq: 110, modRate: 0.05 },
  { id: 'tra-submarine', name: 'Submarine', category: 'Transport', synthType: 'whale', baseFreq: 82, modRate: 0.14 },
  { id: 'tra-sailboat', name: 'Sailboat', category: 'Transport', synthType: 'waves', baseFreq: 230, modRate: 0.2 },
  { id: 'tra-rowing', name: 'Rowing Boat', category: 'Transport', synthType: 'river', baseFreq: 340, modRate: 0.45 },

  // 7. Things (16)
  { id: 'thi-keyboard', name: 'Keyboard', category: 'Things', synthType: 'tapping', baseFreq: 1600, modRate: 4.8 },
  { id: 'thi-typewriter', name: 'Typewriter', category: 'Things', synthType: 'tapping', baseFreq: 2100, modRate: 3.6 },
  { id: 'thi-paper', name: 'Paper', category: 'Things', synthType: 'Crunch', baseFreq: 1700, modRate: 0.9 },
  { id: 'thi-clock', name: 'Clock', category: 'Things', synthType: 'tick', baseFreq: 1400, modRate: 1.0 },
  { id: 'thi-chimes', name: 'Wind Chimes', category: 'Things', synthType: 'chimes', baseFreq: 1046.5, modRate: 1.2 },
  { id: 'thi-bowl', name: 'Singing Bowl', category: 'Things', synthType: 'bowl', baseFreq: 432, modRate: 0.12 },
  { id: 'thi-fan', name: 'Ceiling Fan', category: 'Things', synthType: 'hum', baseFreq: 135, modRate: 2.2 },
  { id: 'thi-dryer', name: 'Dryer', category: 'Things', synthType: 'hum', baseFreq: 155, modRate: 0.8 },
  { id: 'thi-projector', name: 'Slide Projector', category: 'Things', synthType: 'hum', baseFreq: 210, modRate: 0.5 },
  { id: 'thi-radio', name: 'Tuning Radio', category: 'Things', synthType: 'white-noise', baseFreq: 950, modRate: 1.4 },
  { id: 'thi-morse', name: 'Morse Code', category: 'Things', synthType: 'chimes', baseFreq: 800, modRate: 4.2 },
  { id: 'thi-washer', name: 'Washing Machine', category: 'Things', synthType: 'hum', baseFreq: 105, modRate: 0.95 },
  { id: 'thi-vinyl', name: 'Vinyl Effect', category: 'Things', synthType: 'campfire', baseFreq: 1950, modRate: 4.0 },
  { id: 'thi-wipers', name: 'Windshield Wipers', category: 'Things', synthType: 'tick', baseFreq: 420, modRate: 0.75 },
  { id: 'thi-bubbles', name: 'Bubbles', category: 'Things', synthType: 'droplets', baseFreq: 680, modRate: 3.1 },
  { id: 'thi-tape', name: 'Tape Recorder', category: 'Things', synthType: 'pink-noise', baseFreq: 720, modRate: 0.3 },

  // 8. Noise (3)
  { id: 'noi-white', name: 'White Noise', category: 'Noise', synthType: 'white-noise', baseFreq: 1200, modRate: 0.05 },
  { id: 'noi-pink', name: 'Pink Noise', category: 'Noise', synthType: 'pink-noise', baseFreq: 600, modRate: 0.05 },
  { id: 'noi-brown', name: 'Brown Noise', category: 'Noise', synthType: 'brown-noise', baseFreq: 220, modRate: 0.05 },
];

export interface VibePreset {
  id: string;
  name: string;
  subtitle: string;
  mix: Record<string, number>;
}

export const VIBE_PRESETS: VibePreset[] = [
  {
    id: 'preset-focus',
    name: 'Deep Focus Rain',
    subtitle: 'Light Rain • Singing Bowl • Brown Noise',
    mix: {
      'rain-light': 0.65,
      'thi-bowl': 0.45,
      'noi-brown': 0.35,
    },
  },
  {
    id: 'preset-nature',
    name: 'Nordic Wilderness',
    subtitle: 'River • Campfire • Wind in Trees',
    mix: {
      'nat-river': 0.6,
      'nat-campfire': 0.55,
      'nat-wind-trees': 0.45,
    },
  },
  {
    id: 'preset-ocean',
    name: 'Midnight Coast',
    subtitle: 'Waves • Wind • Whale',
    mix: {
      'nat-waves': 0.7,
      'nat-wind': 0.4,
      'ani-whale': 0.35,
    },
  },
  {
    id: 'preset-cafe',
    name: 'Late Night Coding',
    subtitle: 'Rain on Window • Cafe • Vinyl Effect',
    mix: {
      'rain-window': 0.65,
      'pla-cafe': 0.4,
      'thi-vinyl': 0.35,
    },
  },
];

export function filterVibeSounds(
  sounds: VibeSoundItem[],
  category: VibeCategory | 'All',
  searchQuery: string
): VibeSoundItem[] {
  const q = searchQuery.trim().toLowerCase();
  return sounds.filter((s) => {
    const matchesCategory = category === 'All' || s.category === category;
    const matchesSearch =
      q === '' ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

interface ActiveTrackNodes {
  gainNode: GainNode;
  cleanup: () => void;
}

class VibeAudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private tracks: Map<string, ActiveTrackNodes> = new Map();
  private noiseBuffers: Map<'white' | 'pink' | 'brown', AudioBuffer> = new Map();
  private isMasterPlaying: boolean = false;
  private masterVolume: number = 0.75;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getNoiseBuffer(type: 'white' | 'pink' | 'brown'): AudioBuffer {
    const ctx = this.ensureContext();
    const cached = this.noiseBuffers.get(type);
    if (cached) return cached;

    const bufferSize = ctx.sampleRate * 4; // 4-second seamless loop buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    this.noiseBuffers.set(type, buffer);
    return buffer;
  }

  public setSoundVolume(sound: VibeSoundItem, volume: number) {
    if (volume <= 0) {
      this.stopSound(sound.id);
      return;
    }

    const existing = this.tracks.get(sound.id);
    if (existing && this.ctx) {
      existing.gainNode.gain.setTargetAtTime(volume * 0.35, this.ctx.currentTime, 0.08);
      return;
    }

    this.startSound(sound, volume);
  }

  private startSound(sound: VibeSoundItem, volume: number) {
    const ctx = this.ensureContext();
    if (!this.masterGain) return;

    const trackGain = ctx.createGain();
    trackGain.gain.setValueAtTime(0.001, ctx.currentTime);
    trackGain.gain.setTargetAtTime(volume * 0.35, ctx.currentTime, 0.15);
    trackGain.connect(this.masterGain);

    const nodesToStop: AudioScheduledSourceNode[] = [];
    const nodesToDisconnect: AudioNode[] = [trackGain];

    if (
      sound.synthType === 'bowl' ||
      sound.synthType === 'chimes' ||
      sound.synthType === 'whale' ||
      sound.synthType === 'birds' ||
      sound.synthType === 'crickets' ||
      sound.synthType === 'low-call' ||
      sound.synthType === 'siren'
    ) {
      // Harmonic / Melodic / Atmospheric Oscillator Synthesis
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = sound.synthType === 'bowl' || sound.synthType === 'whale' ? 'sine' : 'triangle';
      osc1.frequency.value = sound.baseFreq;

      osc2.type = 'sine';
      osc2.frequency.value = sound.baseFreq * (sound.synthType === 'bowl' ? 1.5 : 1.005);

      lfo.type = 'sine';
      lfo.frequency.value = sound.modRate;
      lfoGain.gain.value = sound.baseFreq * 0.08;

      filter.type = 'lowpass';
      filter.frequency.value = sound.baseFreq * 2.5;

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);

      const subGain = ctx.createGain();
      subGain.gain.value = 0.25;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(subGain);
      subGain.connect(trackGain);

      osc1.start();
      osc2.start();
      lfo.start();

      nodesToStop.push(osc1, osc2, lfo);
      nodesToDisconnect.push(osc1, osc2, lfo, lfoGain, filter, subGain);
    } else {
      // Filtered & LFO-Sculpted Continuous Acoustic Noise Synthesis
      const noiseType =
        sound.synthType === 'brown-noise' ||
        sound.synthType === 'thunder' ||
        sound.synthType === 'waterfall' ||
        sound.synthType === 'waves' ||
        sound.synthType === 'purr'
          ? 'brown'
          : sound.synthType === 'white-noise' ||
            sound.synthType === 'light-rain' ||
            sound.synthType === 'droplets'
          ? 'white'
          : 'pink';

      const source = ctx.createBufferSource();
      source.buffer = this.getNoiseBuffer(noiseType);
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type =
        sound.synthType === 'howling-wind' ||
        sound.synthType === 'wind' ||
        sound.synthType === 'campfire' ||
        sound.synthType === 'rain-surface' ||
        sound.synthType === 'tapping' ||
        sound.synthType === 'tick'
          ? 'bandpass'
          : 'lowpass';
      filter.frequency.value = sound.baseFreq;
      filter.Q.value = sound.synthType === 'howling-wind' ? 4.5 : 1.2;

      // Amplitude / Filter modulation LFO for organic movement (waves, wind, breathing rain)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = sound.modRate;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = sound.baseFreq * 0.35;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      source.connect(filter);
      filter.connect(trackGain);

      source.start();
      lfo.start();

      nodesToStop.push(source, lfo);
      nodesToDisconnect.push(source, lfo, lfoGain, filter);
    }

    this.isMasterPlaying = true;

    this.tracks.set(sound.id, {
      gainNode: trackGain,
      cleanup: () => {
        nodesToStop.forEach((n) => {
          try {
            n.stop();
          } catch {}
        });
        nodesToDisconnect.forEach((n) => {
          try {
            n.disconnect();
          } catch {}
        });
      },
    });
  }

  public stopSound(soundId: string) {
    const existing = this.tracks.get(soundId);
    if (!existing) return;
    existing.cleanup();
    this.tracks.delete(soundId);
    if (this.tracks.size === 0) {
      this.isMasterPlaying = false;
    }
  }

  public stopAll() {
    this.tracks.forEach((t) => t.cleanup());
    this.tracks.clear();
    this.isMasterPlaying = false;
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMasterPlaying ? this.masterVolume : 0,
        this.ctx.currentTime,
        0.05
      );
    }
  }

  public setMasterPlaying(playing: boolean) {
    this.isMasterPlaying = playing;
    if (!this.ctx || !this.masterGain) return;
    if (playing) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.08);
    } else {
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.08);
    }
  }
}

export const vibeAudio = new VibeAudioController();
