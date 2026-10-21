// DEMO CONTENT — replace with real guest speaker sessions.
// Add/remove/edit a session here; pages and games are generated from this list.

export type GameType = "quiz" | "match" | "clock" | "truefalse";
export type SessionColor = "lemon" | "lavender" | "sky" | "blush";
export type SessionObject = "lemon" | "bag" | "arch" | "parasol";

export interface Session {
  id: string;
  number: number;
  speaker: string;
  title: string;
  description: string;
  objectives: string[];
  game: GameType;
  color: SessionColor;
  object: SessionObject;
}

export const GAME_META: Record<GameType, { name: string; editorial: string; blurb: string }> = {
  quiz: { name: "The Knowledge Challenge", editorial: "The Questionnaire", blurb: "Four options. One right answer. No pressure." },
  match: { name: "Match It!", editorial: "The Pairing", blurb: "Every concept deserves its perfect definition." },
  clock: { name: "Beat the Clock", editorial: "The Deadline", blurb: "Thirty seconds. As many answers as you can." },
  truefalse: { name: "True or False", editorial: "The Fact Check", blurb: "Fact or fiction? Trust your instinct." },
};

export const sessions: Session[] = [
  {
    id: "session-1",
    number: 1,
    speaker: "Guest Speaker Name (placeholder)",
    title: "Session Title (placeholder): Innovation Basics",
    description: "A demo chapter on how new ideas are born, tested and brought to market.",
    objectives: ["Define innovation types", "Understand the MVP", "Recognise product–market fit"],
    game: "quiz",
    color: "lemon",
    object: "lemon",
  },
  {
    id: "session-2",
    number: 2,
    speaker: "Guest Speaker Name (placeholder)",
    title: "Session Title (placeholder): Brand Building",
    description: "A demo chapter on brand identity, positioning and the language of luxury.",
    objectives: ["Match brand vocabulary", "Positioning vs. identity", "Brand equity"],
    game: "match",
    color: "lavender",
    object: "bag",
  },
  {
    id: "session-3",
    number: 3,
    speaker: "Guest Speaker Name (placeholder)",
    title: "Session Title (placeholder): Strategy Under Pressure",
    description: "A demo chapter on fast decisions, frameworks and thinking on your feet.",
    objectives: ["Recall key frameworks", "Quick strategic reasoning", "Core business metrics"],
    game: "clock",
    color: "sky",
    object: "arch",
  },
  {
    id: "session-4",
    number: 4,
    speaker: "Guest Speaker Name (placeholder)",
    title: "Session Title (placeholder): Digital & Sustainability",
    description: "A demo chapter separating myths from facts in digital and sustainable business.",
    objectives: ["Spot common myths", "Sustainability basics", "Digital business models"],
    game: "truefalse",
    color: "blush",
    object: "parasol",
  },
];

export const getSession = (id: string) => sessions.find((s) => s.id === id);

export const COLOR_BG: Record<SessionColor, string> = {
  lemon: "bg-lemon",
  lavender: "bg-lavender",
  sky: "bg-sky",
  blush: "bg-blush",
};
