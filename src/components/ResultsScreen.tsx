import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";
import { confetti } from "@/lib/confetti";
import { scoreVerdict } from "@/lib/progress";

export function ResultsScreen({ score, total, onReplay, unit = "correct answers" }: { score: number; total: number; onReplay: () => void; unit?: string }) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  useEffect(() => {
    if (pct >= 60) confetti(pct === 100 ? 80 : 40);
  }, [pct]);
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-3xl border border-ink bg-chalk p-8 text-center md:p-14"
      aria-live="polite"
    >
      <div className="flex justify-between">
        <span className="label">The Review</span>
        <span className="label">Issue Nº 01</span>
      </div>
      <div className="rule my-6" />
      <p className="font-display text-[7rem] leading-none italic md:text-[10rem]">{pct}%</p>
      <h2 className="font-display mt-4 text-4xl md:text-5xl">{scoreVerdict(pct)}</h2>
      <p className="label mt-6">
        {score} / {total} {unit}
      </p>
      <div className="rule my-8" />
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button onClick={onReplay} className="btn-ink justify-center">
          Replay ↺
        </button>
        <Link to="/explore" className="btn-line justify-center">
          Back to sessions
        </Link>
      </div>
    </motion.section>
  );
}
