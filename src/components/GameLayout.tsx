import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { COLOR_BG, GAME_META, type Session } from "@/data/sessions";
import { OBJECTS } from "./Objects";

export function GameLayout({ session, children }: { session: Session; children: ReactNode }) {
  const meta = GAME_META[session.game];
  const Obj = OBJECTS[session.object];
  return (
    <div className="min-h-screen">
      <section className={`relative overflow-hidden px-5 pb-14 pt-32 md:px-10 ${COLOR_BG[session.color]}`}>
        <div className="mx-auto max-w-6xl">
          <Link to="/explore" className="label hover:underline">
            ← All chapters
          </Link>
          <div className="mt-8 flex items-end gap-6">
            <span className="font-display text-[8rem] leading-[0.8] italic md:text-[12rem]">{session.number}</span>
            <div className="pb-3">
              <p className="label">Chapter 0{session.number} · {meta.editorial} · Demo content</p>
              <h1 className="font-display mt-2 text-4xl md:text-6xl">{meta.name}</h1>
              <p className="mt-2 text-sm">{session.title}</p>
            </div>
          </div>
        </div>
        <Obj className="animate-float pointer-events-none absolute -right-6 top-24 hidden w-56 md:block" />
      </section>
      <section className="px-5 py-12 md:px-10 md:py-20">{children}</section>
    </div>
  );
}
