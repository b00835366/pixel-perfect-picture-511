import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { GAME_META, sessions } from "@/data/sessions";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "The games · Récré" },
      { name: "description", content: "Four mini-games: The Questionnaire, The Pairing, The Deadline and The Fact Check." },
      { property: "og:title", content: "The games · Récré" },
      { property: "og:description", content: "Little games to make big ideas stick." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Games,
});

function Games() {
  const { progress } = useProgress();
  return (
    <div className="px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="label">The playground</p>
        <h1 className="font-display mt-4 text-6xl leading-[0.9] md:text-8xl">
          <RevealLines lines={["Little games,", <em key="b">big ideas.</em>]} />
        </h1>
        <ul className="mt-16 border-t border-ink">
          {sessions.map((s, k) => {
            const p = progress[s.id];
            return (
              <FadeIn key={s.id} delay={k * 0.05}>
                <li>
                  <Link
                    to="/play/$sessionId"
                    params={{ sessionId: s.id }}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-ink py-8 transition-colors hover:bg-lemon md:px-6"
                  >
                    <span className="font-display text-6xl italic md:text-8xl">0{s.number}</span>
                    <span>
                      <span className="label block">{GAME_META[s.game].editorial} · Chapter 0{s.number}</span>
                      <span className="font-display block text-3xl md:text-5xl">{GAME_META[s.game].name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{GAME_META[s.game].blurb}</span>
                    </span>
                    <span className="label text-right">
                      {p ? `Best ${p.best}/${p.total}` : "Play"}
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">→</span>
                    </span>
                  </Link>
                </li>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
