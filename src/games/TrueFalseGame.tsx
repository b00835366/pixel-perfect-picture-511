import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { TFStatement } from "@/data/games";
import { confetti } from "@/lib/confetti";

export function TrueFalseGame({ statements, onFinish }: { statements: TFStatement[]; onFinish: (s: number, t: number) => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { setI(0); setPicked(null); setScore(0); setDone(false); };
  if (done) return <ResultsScreen score={score} total={statements.length} onReplay={reset} />;

  const s = statements[i];
  const pick = (v: boolean) => {
    if (picked !== null) return;
    setPicked(v);
    if (v === s.answer) { setScore((x) => x + 1); confetti(14); }
  };
  const next = () => {
    if (i + 1 >= statements.length) { setDone(true); onFinish(score, statements.length); }
    else { setI(i + 1); setPicked(null); }
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) pick(true);
    else if (info.offset.x < -100) pick(false);
  };
  const ok = picked === s.answer;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center gap-6">
        <span className="label whitespace-nowrap">Fact {i + 1} / {statements.length}</span>
        <ProgressBar value={(i + (picked !== null ? 1 : 0)) / statements.length} />
        <span className="label whitespace-nowrap">Score {score}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          drag={picked === null ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, rotate: -3, y: 30 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, x: picked ? 200 : -200, rotate: picked ? 8 : -8 }}
          className="cursor-grab border border-ink bg-blush p-8 active:cursor-grabbing md:p-12"
        >
          <span className="label">The statement</span>
          <p className="font-display mt-4 text-3xl leading-tight md:text-5xl">“{s.statement}”</p>
          <p className="label mt-6 text-muted-foreground md:hidden">Swipe → true · ← false</p>
        </motion.div>
      </AnimatePresence>
      {picked === null ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => pick(false)} className="font-display border border-ink py-8 text-4xl italic transition-colors hover:bg-tomato hover:text-chalk">False</button>
          <button onClick={() => pick(true)} className="font-display border border-ink py-8 text-4xl italic transition-colors hover:bg-lemon">True</button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 border-t border-ink pt-6" aria-live="polite">
          <p className="font-display text-3xl italic">{ok ? "OKAY, GENIUS!" : "NOT QUITE. KEEP GOING!"}</p>
          <p className="mt-2 text-muted-foreground">It's {s.answer ? "true" : "false"}. {s.explanation}</p>
          <button onClick={next} className="btn-ink mt-6">{i + 1 >= statements.length ? "See results →" : "Next fact →"}</button>
        </motion.div>
      )}
    </div>
  );
}
