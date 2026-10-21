import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-ink bg-chalk">
      <div className="overflow-hidden border-b border-ink py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl italic">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-12">
              {["Class, but make it chic.", "Big ideas.", "Little games.", "Issue Nº 01", "Recess is the main event."].map((t) => (
                <span key={t}>{t} ✺</span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-6xl italic">récré.</p>
          <p className="label mt-3">Class, but make it chic.</p>
        </div>
        <ul className="space-y-2">
          {([["/", "Home"], ["/explore", "Explore"], ["/games", "Games"], ["/about", "About"]] as const).map(([to, l]) => (
            <li key={to}>
              <Link to={to} className="label hover:underline">
                {l}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          An ESSEC Business School student project. All session content is demo content and will be replaced.
          <br />
          <span className="label mt-4 block">© Issue Nº 01 · Price: Free</span>
        </p>
      </div>
    </footer>
  );
}
