// Tiny DOM confetti — no dependency. Respects reduced motion.
const COLORS = ["var(--lemon)", "var(--lavender)", "var(--sky)", "var(--tomato)", "var(--blush)"];

export function confetti(count = 40) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.createElement("div");
  root.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:100;overflow:hidden";
  document.body.appendChild(root);
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const size = 6 + Math.random() * 8;
    p.style.cssText = `position:absolute;left:${50 + (Math.random() - 0.5) * 30}%;top:45%;width:${size}px;height:${size * (Math.random() > 0.5 ? 1 : 0.4)}px;background:${COLORS[i % COLORS.length]};border-radius:${Math.random() > 0.5 ? "50%" : "1px"}`;
    root.appendChild(p);
    const x = (Math.random() - 0.5) * 900;
    const y = -200 - Math.random() * 300;
    p.animate(
      [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${x * 0.6}px,${y}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x}px,${400}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ],
      { duration: 1600 + Math.random() * 800, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
    );
  }
  setTimeout(() => root.remove(), 2600);
}
