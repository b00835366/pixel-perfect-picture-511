import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { QuizQuestion } from "@/data/games";

const DURATION = 30;

export function ClockGame({ questions, onFinish }: { questions: QuizQuestion[]; onFinish: (s: number, t: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [round, setRound] = useState(0);
  const order = useMemo(() => [...questions].sort(() => Math.random() - 0.5), [questions, round]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const scoreRef = useRef(0);
  const answeredRef = useRef(0);

  useEffect(() => {
    if (phase !== "play") return;
    const start = Date.now();
    const t = setInterval(() => {
      const rem = Math.max(0, DURATION - (Date.now() - start) / 1000);
      setLeft(rem);
      if (rem <= 0) {
        clearInterval(t);
        setPhase("done");
        onFinish(scoreRef.current, Math.max(answeredRef.current, 1));
      }
    }, 100);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => { setRound((r) => r + 1); setI(0); setScore(0); setAnswered(0); scoreRef.current = 0; answeredRef.current = 0; setLeft(DURATION); setPhase("play"); };

  if (phase === "done") return <ResultsScreen score={score} total={Math.max(answered, 1)} onReplay={start} unit="answered correctly before the bell" />;

  if (phase === "ready")
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-[9rem] leading-none italic">30″</p>
        <p className="mt-4 text-lg">Answer as many as you can before the deadline. Speed is chic.</p>
        <button onClick={start} className="btn-ink mt-8">Start the clock →</button>
      </div>
    );

  const q = order[i % order.length];
  const answer = (k: number) => {
    const ok = k === q.answer;
    if (ok) { scoreRef.current += 1; setScore(scoreRef.current); }
    answeredRef.current += 1; setAnswered(answeredRef.current);
    setFlash(ok ? "ok" : "no");
    setTimeout(() => setFlash(null), 250);
    setI((x) => x + 1);
  };
  const r = 54, c = 2 * Math.PI * r;

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[auto_1fr]">
      <div className="relative mx-auto h-40 w-40" aria-label={`${Math.ceil(left)} seconds left`}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--ink)" strokeOpacity=".15" strokeWidth="6" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={left < 8 ? "var(--tomato)" : "var(--ink)"} strokeWidth="6" strokeDasharray={c} strokeDashoffset={c * (1 - left / DURATION)} strokeLinecap="round" />
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-5xl italic">{Math.ceil(left)}</span>
      </div>
      <div className={`border p-6 transition-colors md:p-10 ${flash === "ok" ? "border-ink bg-lemon" : flash === "no" ? "border-tomato bg-blush" : "border-ink"}`}>
        <div className="flex justify-between"><span className="label">Q{i + 1}</span><span className="label">Score {score}</span></div>
        <AnimatePresence mode="wait">
          <motion.h2 key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="font-display mt-6 text-3xl md:text-4xl">
            {q.q}
          </motion.h2>
        </AnimatePresence>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {q.options.map((o, k) => (
            <button key={k} onClick={() => answer(k)} className="btn-line justify-center !normal-case !tracking-normal !text-base">{o}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
