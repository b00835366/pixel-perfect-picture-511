import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { COLOR_BG, GAME_META, type Session } from "@/data/sessions";
import { OBJECTS } from "./Objects";

export function SessionCard({ session, className = "", done }: { session: Session; className?: string; done?: boolean }) {
  const Obj = OBJECTS[session.object];
  return (
    <motion.div
      whileHover={{ y: -8, rotate: -0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      <Link
        to="/play/$sessionId"
        params={{ sessionId: session.id }}
        className={`group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden p-6 md:p-8 ${COLOR_BG[session.color]}`}
      >
        <div className="flex items-start justify-between">
          <span className="label">Chapter 0{session.number}</span>
          {done && <span className="label rounded-full bg-ink px-3 py-1 text-chalk">Read ✓</span>}
        </div>
        <span className="font-display pointer-events-none absolute -right-2 top-6 text-[11rem] leading-none italic md:text-[14rem]">
          {session.number}
        </span>
        <Obj className="pointer-events-none absolute bottom-24 right-6 w-24 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110" />
        <div className="relative max-w-[75%]">
          <p className="label mb-2">{GAME_META[session.game].editorial}</p>
          <h3 className="font-display text-2xl leading-tight md:text-3xl">{session.title}</h3>
          <p className="mt-2 text-sm">{session.description}</p>
          <span className="label mt-5 inline-block border-b border-ink pb-1">Play →</span>
        </div>
      </Link>
    </motion.div>
  );
}
