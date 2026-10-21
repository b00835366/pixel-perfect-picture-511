import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Progress = Record<string, { best: number; total: number; completed: boolean }>;

export function scoreVerdict(pct: number) {
  if (pct >= 100) return "MAIN CHARACTER ENERGY.";
  if (pct >= 60) return "OKAY, YOU KNOW YOUR STUFF.";
  return "PLOT TWIST. LET'S TRY AGAIN.";
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>("progress", {});
  const record = (id: string, score: number, total: number) =>
    setProgress((p) => {
      const prev = p[id];
      const better = !prev || score / Math.max(total, 1) > prev.best / Math.max(prev.total, 1);
      return { ...p, [id]: better ? { best: score, total, completed: true } : { ...prev, completed: true } };
    });
  return { progress, record };
}
