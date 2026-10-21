import { motion } from "motion/react";

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="w-full" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)} aria-label={label ?? "Progress"}>
      <div className="h-px w-full bg-ink/20">
        <motion.div className="h-[3px] -translate-y-px bg-ink" animate={{ width: `${value * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </div>
  );
}
