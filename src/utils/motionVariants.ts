import type { Variants } from 'motion/react';

/**
 * Viewport configuration for section scroll animations.
 * Uses a low intersection threshold (0.02) and bottom rootMargin (-40px)
 * so tall sections (such as 73+ Certifications or Projects on mobile)
 * reliably trigger their staggered entrance as soon as they enter the viewport.
 */
export const sectionViewportConfig = {
  once: true,
  amount: 0.02,
  margin: '0px 0px -20px 0px',
} as const;

/**
 * Parent container variants that orchestrate a staggered fade-in
 * across direct motion children when the section enters the viewport.
 */
export const sectionContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.03,
    },
  },
};

/**
 * Direct child block variants (headers, filter bars, panels, grids)
 * inside a staggered section container.
 */
export const sectionItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Nested grid container variants for staggering cards inside a section block.
 */
export const staggerGridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

/**
 * Individual card item variants inside a staggered grid.
 */
export const staggerCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Computes a bounded stagger delay for dynamically filtered card lists
 * so cards animate smoothly without excessive wait times on large lists.
 */
export function getBoundedStaggerDelay(
  index: number,
  stepSeconds = 0.045,
  maxDelaySeconds = 0.36
): number {
  const safeIndex = Math.max(0, index);
  return Number(Math.min(safeIndex * stepSeconds, maxDelaySeconds).toFixed(3));
}
