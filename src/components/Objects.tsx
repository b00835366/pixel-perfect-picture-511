import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function Lemon(props: P) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden {...props}>
      <ellipse cx="100" cy="85" rx="82" ry="62" fill="var(--lemon)" />
      <path d="M18 85 q-14 -4 -12 -14 q10 2 16 6z" fill="var(--lemon)" />
      <path d="M182 85 q14 4 12 14 q-10 -2 -16 -6z" fill="var(--lemon)" />
      <ellipse cx="72" cy="62" rx="22" ry="9" fill="var(--chalk)" opacity=".45" transform="rotate(-20 72 62)" />
      <path d="M100 24 q18 -22 46 -18 q-14 26 -46 18z" fill="var(--success)" />
      <path d="M100 24 q4 -10 2 -16" stroke="var(--ink)" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function Bag(props: P) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden {...props}>
      <path d="M60 80 q0 -50 40 -50 q40 0 40 50" stroke="var(--ink)" strokeWidth="8" fill="none" />
      <rect x="30" y="75" width="140" height="105" rx="52" fill="var(--tomato)" />
      <rect x="88" y="110" width="24" height="10" rx="5" fill="var(--lemon)" />
    </svg>
  );
}

export function Arch(props: P) {
  return (
    <svg viewBox="0 0 160 220" aria-hidden {...props}>
      <path d="M10 220 V80 a70 70 0 0 1 140 0 V220z" fill="var(--sky)" />
      <path d="M45 220 V95 a35 35 0 0 1 70 0 V220z" fill="var(--chalk)" />
    </svg>
  );
}

export function Sun(props: P) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden {...props}>
      <circle cx="60" cy="60" r="56" fill="var(--tomato)" />
    </svg>
  );
}

export function Parasol(props: P) {
  return (
    <svg viewBox="0 0 220 220" aria-hidden {...props}>
      <defs>
        <clipPath id="parasol-clip">
          <path d="M10 100 a100 90 0 0 1 200 0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#parasol-clip)">
        <rect x="0" y="0" width="220" height="110" fill="var(--chalk)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={i * 40 - 10} y="0" width="20" height="110" fill="var(--blush)" />
        ))}
      </g>
      <path d="M10 100 a100 90 0 0 1 200 0z" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <line x1="110" y1="100" x2="110" y2="215" stroke="var(--ink)" strokeWidth="5" />
    </svg>
  );
}

export const OBJECTS = { lemon: Lemon, bag: Bag, arch: Arch, parasol: Parasol, sun: Sun };
