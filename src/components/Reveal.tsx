import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Line-by-line mask reveal. Pass an array of lines (strings or nodes). */
export function RevealLines({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.12 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
