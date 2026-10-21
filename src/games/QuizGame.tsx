import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { QuizQuestion } from "@/data/games";
import { confetti } from "@/lib/confetti";

export function QuizGame({ questions, onFinish }: { questions: QuizQuestion[]; onFinish: (s: number, t: number) => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { setI(0); setPicked(null); setScore(0); setDone(false); };
  if (done) return <ResultsScreen score={score} total={questions.length} onReplay={reset} />;

  const q = questions[i];
  const correct = picked === q.answer;

  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) { setScore((s) => s + 1); confetti(18); }
  };
  const next = () => {
    if (i + 1 >= questions.length) { setDone(true); onFinish(score, questions.length); }
    else { setI(i + 1); setPicked(null); }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between gap-6">
        <span className="label whitespace-nowrap">Question {i + 1} / {questions.length}</span>
        <ProgressBar value={(i + (picked !== null ? 1 : 0)) / questions.length} label="Quiz progress" />
        <span className="label whitespace-nowrap">Score {score}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
          <h2 className="font-display text-3xl leading-tight md:text-5xl">{q.q}</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {q.options.map((o, k) => {
              const state = picked === null ? "" : k === q.answer ? "bg-lemon" : k === picked ? "bg-tomato text-chalk animate-shake" : "opacity-40";
              return (
                <motion.button
                  key={k}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pick(k)}
                  disabled={picked !== null}
                  className={`flex min-h-16 items-center gap-4 border border-ink p-5 text-left transition-colors ${picked === null ? "hover:bg-ink hover:text-chalk" : ""} ${state}`}
                >
                  <span className="font-display text-2xl italic">{"ABCD"[k]}</span>
                  <span>{o}</span>
                </motion.button>
              );
            })}
          </div>
          {picked !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 border-t border-ink pt-6" aria-live="polite">
              <p className="font-display text-3xl italic">{correct ? "OKAY, GENIUS!" : "NOT QUITE. KEEP GOING!"}</p>
              <p className="mt-2 text-muted-foreground">{q.explanation}</p>
              <button onClick={next} className="btn-ink mt-6">{i + 1 >= questions.length ? "See results →" : "Next question →"}</button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
