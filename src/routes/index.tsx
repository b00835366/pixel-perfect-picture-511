import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Arch, Bag, Lemon, Parasol, Sun } from "@/components/Objects";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { SessionCard } from "@/components/SessionCard";
import { sessions } from "@/data/sessions";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Récré: Class, but make it chic." },
      { name: "description", content: "Issue Nº 01 of Récré: guest speaker sessions reimagined as a playable fashion magazine." },
      { property: "og:title", content: "Récré: Class, but make it chic." },
      { property: "og:description", content: "Big ideas. Little games. A whole lot of learning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SPANS = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:-mt-16"];

function Index() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const p = (f: number) => ({ x: useTransform(sx, (v) => v * f), y: useTransform(sy, (v) => v * f) });
  const l1 = p(30), l2 = p(-20), l3 = p(14), l4 = p(-34), l5 = p(22);

  const big = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: big, offset: ["start end", "end start"] });
  const lemonY = useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]);
  const lemonR = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  const { progress } = useProgress();

  return (
    <>
      {/* COVER */}
      <section
        className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-10"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-ink pb-3">
            <span className="label">Issue Nº 01</span>
            <span className="label hidden sm:inline">Class, but make it chic.</span>
            <span className="label">Price: Free</span>
          </div>
          <h1 className="font-display text-center text-[26vw] leading-[0.85] italic md:text-[19vw]">
            <RevealLines lines={["Récré"]} />
          </h1>

          <div className="relative mt-4 grid items-end gap-10 md:grid-cols-12">
            <div className="z-10 md:col-span-4">
              <p className="label">Cover story: Your brain</p>
              <h2 className="font-display mt-4 text-5xl leading-[0.95] md:text-6xl">
                <RevealLines lines={["Welcome to", <em key="r" className="text-tomato">Récré.</em>]} delay={0.3} />
              </h2>
              <p className="mt-6 max-w-xs">Big ideas. Little games. A whole lot of learning.</p>
              <Link to="/explore" className="btn-ink mt-8">Let's play →</Link>
            </div>

            <div className="relative h-[52vh] md:col-span-8 md:h-[60vh]" aria-hidden>
              <motion.div style={l1} className="absolute left-[18%] top-[8%] w-[62%] max-w-lg">
                <Lemon className="animate-float w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.12)]" />
              </motion.div>
              <motion.div style={l2} className="absolute right-[4%] top-0 w-20 md:w-28"><Sun className="w-full" /></motion.div>
              <motion.div style={l3} className="absolute bottom-0 left-0 w-28 md:w-40"><Arch className="w-full" /></motion.div>
              <motion.div style={l4} className="absolute bottom-[4%] right-[10%] w-32 md:w-48"><Bag className="animate-float w-full [animation-delay:-3s]" /></motion.div>
              <motion.div style={l5} className="absolute -left-4 top-[2%] hidden w-36 md:block"><Parasol className="w-full -rotate-12" /></motion.div>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex flex-col items-center gap-2">
              <span className="label">Scroll</span>
              <span className="animate-scrollline block h-12 w-px bg-ink" />
            </div>
            <div className="flex h-10 items-end gap-[2px]" aria-label="Barcode decoration">
              {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1].map((w, k) => <span key={k} className="h-full bg-ink" style={{ width: w }} />)}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section ref={big} className="relative overflow-hidden border-t border-ink bg-chalk py-32 md:py-48">
        <motion.div style={{ y: lemonY, rotate: lemonR }} className="pointer-events-none absolute -right-[20vw] top-0 w-[80vw] opacity-90" aria-hidden>
          <Lemon className="w-full" />
        </motion.div>
        <motion.h2 style={{ x: wordX }} className="font-display relative whitespace-nowrap text-[18vw] leading-[0.9]">
          Who said <em>learning</em>
        </motion.h2>
        <h2 className="font-display relative px-5 text-[12vw] leading-[0.9] md:px-10">
          <RevealLines lines={["had to be", <em key="b" className="text-tomato">boring?</em>]} />
        </h2>
      </section>

      {/* SECTION 2 — editor's letter */}
      <section className="border-t border-ink px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="label">The editor's letter</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] md:text-7xl">
            <RevealLines lines={["One semester.", <em key="i">Big ideas.</em>, "Endless possibilities."]} />
          </h2>
          <div className="rule my-12" />
          <FadeIn className="grid gap-10 md:grid-cols-3">
            <p className="md:col-span-1 first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:italic">
              Every guest speaker session this semester becomes a chapter in our magazine. You read the story, then you play
              it — because knowledge sticks better when it has a little fun with you.
            </p>
            <p className="md:col-span-1">
              Each chapter comes with its own mini-game: a questionnaire, a pairing, a deadline or a fact check. Replay as
              often as you like. Your best scores are kept right here, on your browser.
            </p>
            <blockquote className="font-display border-l border-ink pl-6 text-3xl italic leading-tight">
              “The break between classes is where the good ideas hang out.”
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3 — contents */}
      <section className="border-t border-ink px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-5xl md:text-7xl"><RevealLines lines={[<>Choose your <em>adventure.</em></>]} /></h2>
            <span className="label">Contents · Demo content</span>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            {sessions.map((s, k) => (
              <SessionCard key={s.id} session={s} className={SPANS[k % SPANS.length]} done={progress[s.id]?.completed} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="relative overflow-hidden bg-lemon px-5 py-32 text-center md:px-10">
        <p className="label">Final page</p>
        <h2 className="font-display mt-6 text-[14vw] leading-[0.85] md:text-[10vw]">
          <RevealLines lines={["Ready to test", <em key="y">your brain?</em>]} />
        </h2>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className="mt-12 inline-block">
          <Link to="/games" className="font-display flex h-44 w-44 items-center justify-center rounded-full bg-ink text-3xl italic text-chalk transition-colors hover:bg-tomato md:h-56 md:w-56">
            Play →
          </Link>
        </motion.div>
      </section>
    </>
  );
}
