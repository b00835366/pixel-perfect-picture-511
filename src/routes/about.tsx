import { createFileRoute, Link } from "@tanstack/react-router";
import { Bag, Lemon, Parasol } from "@/components/Objects";
import { FadeIn, RevealLines } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Récré" },
      { name: "description", content: "Learning looks better when it's fun. The story behind Récré, an ESSEC student project." },
      { property: "og:title", content: "About · Récré" },
      { property: "og:description", content: "Learning looks better when it's fun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PILLARS = [
  { word: "Learn.", Obj: Lemon, bg: "bg-lemon", text: "Guest speakers bring the big ideas. We bottle the essentials." },
  { word: "Play.", Obj: Bag, bg: "bg-lavender", text: "Each chapter turns into a game you can replay whenever you like." },
  { word: "Remember.", Obj: Parasol, bg: "bg-sky", text: "Play makes it stick — long after the session ends." },
];

function About() {
  return (
    <div className="pt-32">
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="label">The editor's letter</p>
          <h1 className="font-display mt-4 text-6xl leading-[0.9] md:text-8xl">
            <RevealLines lines={["Learning looks", "better when", <em key="f" className="text-tomato">it's fun.</em>]} />
          </h1>
          <FadeIn className="mt-12 max-w-2xl text-lg">
            Récré transforms guest speaker insights into interactive challenges that make knowledge easier to revisit,
            understand and remember. Think of it as the magazine you read during the break — except every story asks you
            to play along.
          </FadeIn>
        </div>
      </section>
      <section className="grid md:grid-cols-3">
        {PILLARS.map(({ word, Obj, bg, text }) => (
          <div key={word} className={`flex min-h-[28rem] flex-col justify-between border-t border-ink p-8 md:border-r ${bg}`}>
            <Obj className="animate-float w-36" />
            <div>
              <h2 className="font-display text-6xl italic md:text-7xl">{word}</h2>
              <p className="mt-3">{text}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="border-t border-ink px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="label">Colophon</p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">An ESSEC Business School project.</h2>
          </div>
          <div className="space-y-4">
            <p>Récré was created as part of a university assignment: build a website with a tab for each guest speaker session, each one an interactive game to consolidate what was learned.</p>
            <p className="label">Credits: [Team names placeholder]</p>
            <p className="text-sm text-muted-foreground">All sessions, speakers and questions currently shown are demo content.</p>
            <Link to="/explore" className="btn-ink mt-4">Read the chapters →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
