import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Lemon } from "@/components/Objects";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-chalk px-4 text-center">
      <Lemon className="animate-float w-40" />
      <p className="label mt-8">Page 404 · Missing from this issue</p>
      <h1 className="font-display mt-4 text-6xl italic md:text-8xl">Lost at recess.</h1>
      <p className="mt-4 text-muted-foreground">This page skipped class. Let's get you back.</p>
      <Link to="/" className="btn-ink mt-8">Back to the cover →</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-chalk px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-4xl italic">This page didn't load.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-ink">Try again</button>
          <a href="/" className="btn-line">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Récré: Class, but make it chic." },
      { name: "description", content: "Récré turns guest speaker sessions into a playable magazine: one chapter, one mini-game." },
      { property: "og:title", content: "Récré: Class, but make it chic." },
      { property: "og:description", content: "Big ideas. Little games. A whole lot of learning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=DM+Sans:wght@400;500;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Loader() {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("recre:loaded")) { setShow(false); return; }
    const t = setInterval(() => setN((x) => {
      if (x >= 100) { clearInterval(t); setTimeout(() => { setShow(false); sessionStorage.setItem("recre:loaded", "1"); }, 250); return 100; }
      return x + 4;
    }), 28);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-chalk" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <div className="relative w-40">
            <Lemon className="w-40 opacity-20" />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(${100 - n}% 0 0 0)` }}>
              <Lemon className="w-40" />
            </div>
          </div>
          <p className="label mt-6">Récré, Issue Nº 01, loading… {n}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <Loader />
      <Navigation />
      <motion.main key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <Outlet />
      </motion.main>
      <Footer />
    </QueryClientProvider>
  );
}
