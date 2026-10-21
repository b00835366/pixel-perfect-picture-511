import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { MatchPair } from "@/data/games";

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

/** Drag a concept onto a definition (desktop) or tap concept, then tap definition (touch). */
export function MatchGame({ pairs, onFinish }: { pairs: MatchPair[]; onFinish: (s: number, t: number) => void }) {
  const [round, setRound] = useState(0);
  const defs = useMemo(() => shuffle(pairs.map((p, i) => ({ ...p, i }))), [pairs, round]);
  const concepts = useMemo(() => shuffle(pairs.map((p, i) => ({ ...p, i }))), [pairs, round]);
  const [matched, setMatched] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { setRound((r) => r + 1); setMatched([]); setSelected(null); setMistakes(0); setDone(false); };
  const score = Math.max(0, pairs.length - mistakes);
  if (done) return <ResultsScreen score={score} total={pairs.length} onReplay={reset} unit="points (mistakes cost a point)" />;

  const attempt = (concept: number, def: number) => {
    if (concept === def) {
      const m = [...matched, def];
      setMatched(m);
      setSelected(null);
      if (m.length === pairs.length) {
        setTimeout(() => { setDone(true); onFinish(score, pairs.length); }, 600);
      }
    } else {
      setMistakes((x) => x + 1);
      setWrong(def);
      setSelected(null);
      setTimeout(() => setWrong(null), 400);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center gap-6">
        <span className="label whitespace-nowrap">{matched.length} / {pairs.length} paired</span>
        <ProgressBar value={matched.length / pairs.length} label="Pairs matched" />
        <span className="label whitespace-nowrap">Slips {mistakes}</span>
      </div>
      <p className="label mb-6 text-muted-foreground">Drag a concept onto its definition — or tap one, then tap its match.</p>
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-3">
          {concepts.map((c) => {
            const isDone = matched.includes(c.i);
            return (
              <li key={c.i}>
                <button
                  draggable={!isDone}
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", String(c.i))}
                  onClick={() => !isDone && setSelected(selected === c.i ? null : c.i)}
                  disabled={isDone}
                  aria-pressed={selected === c.i}
                  className={`font-display w-full cursor-grab rounded-full border border-ink px-6 py-4 text-left text-xl italic transition-all active:cursor-grabbing ${
                    isDone ? "border-transparent bg-lemon opacity-40 line-through" : selected === c.i ? "bg-ink text-chalk" : "hover:bg-lavender"
                  }`}
                >
                  {c.concept}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-3">
          {defs.map((d) => {
            const isDone = matched.includes(d.i);
            return (
              <motion.li key={d.i} animate={isDone ? { scale: [1, 1.03, 1] } : {}}>
                <button
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); attempt(Number(e.dataTransfer.getData("text/plain")), d.i); }}
                  onClick={() => selected !== null && !isDone && attempt(selected, d.i)}
                  disabled={isDone}
                  className={`w-full border p-4 text-left text-sm transition-colors md:text-base ${
                    isDone ? "border-ink bg-lemon" : wrong === d.i ? "animate-shake border-tomato bg-tomato text-chalk" : selected !== null ? "border-dashed border-ink hover:bg-lavender" : "border-ink/40"
                  }`}
                >
                  {isDone && <span className="label mr-2">{d.concept} ✓</span>}
                  {d.definition}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
