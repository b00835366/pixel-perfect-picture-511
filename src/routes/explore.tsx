import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { OBJECTS } from "@/components/Objects";
import { ProgressBar } from "@/components/ProgressBar";
import { RevealLines } from "@/components/Reveal";
import { COLOR_BG, GAME_META, sessions } from "@/data/sessions";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the chapters · Récré" },
      { name: "description", content: "Pick your next adventure: every guest speaker session as a chapter with its own mini-game." },
      { property: "og:title", content: "Explore the chapters · Récré" },
      { property: "og:description", content: "Every great idea deserves a little playtime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [active, setActive] = useState(sessions[0]?.id);
  const { progress } = useProgress();
  const done = sessions.filter((s) => progress[s.id]?.completed).length;
  const s = sessions.find((x) => x.id === active) ?? sessions[0];
  const Obj = OBJECTS[s.object];
  const p = progress[s.id];

  return (
    <div className="px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="label">Table of contents · Demo content</p>
        <h1 className="font-display mt-4 text-6xl leading-[0.9] md:text-8xl">
          <RevealLines lines={["Pick your next", <em key="a">adventure.</em>]} />
        </h1>
        <p className="mt-6 text-lg">Every great idea deserves a little playtime.</p>

        <div className="mt-10 flex items-center gap-6">
          <span className="label whitespace-nowrap">{done} of {sessions.length} chapters read</span>
          <ProgressBar value={done / sessions.length} label="Chapters read" />
        </div>

        <div role="tablist" aria-label="Sessions" className="mt-12 flex gap-2 overflow-x-auto border-b border-ink">
          {sessions.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === active}
              onClick={() => setActive(x.id)}
              className={`label whitespace-nowrap px-5 py-4 transition-colors ${x.id === active ? "bg-ink text-chalk" : "hover:bg-muted"}`}
            >
              Session {x.number} {progress[x.id]?.completed && "✓"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={s.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`relative grid gap-10 overflow-hidden p-6 md:grid-cols-12 md:p-12 ${COLOR_BG[s.color]}`}
          >
            <div className="md:col-span-4">
              <span className="font-display block text-[10rem] leading-[0.8] italic md:text-[14rem]">{s.number}</span>
              <Obj className="animate-float mt-6 w-32 md:w-44" />
            </div>
            <div className="md:col-span-8">
              <p className="label">{s.speaker}</p>
              <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg">{s.description}</p>
              <div className="rule my-8" />
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="label mb-3">Learning objectives</p>
                  <ul className="space-y-2">
                    {s.objectives.map((o) => <li key={o} className="font-display text-xl italic">— {o}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="label mb-3">The game</p>
                  <p className="font-display text-2xl">{GAME_META[s.game].name}</p>
                  <p className="text-sm">{GAME_META[s.game].blurb}</p>
                  {p && <p className="label mt-4">Best: {p.best}/{p.total} ✓</p>}
                </div>
              </div>
              <Link to="/play/$sessionId" params={{ sessionId: s.id }} className="btn-ink mt-10">
                {p ? "Play again →" : "Start →"}
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
