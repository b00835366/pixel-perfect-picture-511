// DEMO CONTENT — game content keyed by session id. Replace freely.

export interface QuizQuestion { q: string; options: string[]; answer: number; explanation: string }
export interface MatchPair { concept: string; definition: string }
export interface TFStatement { statement: string; answer: boolean; explanation: string }

export const quizzes: Record<string, QuizQuestion[]> = {
  "session-1": [
    { q: "What does MVP stand for?", options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Proposition", "Market Validation Plan"], answer: 1, explanation: "A Minimum Viable Product is the simplest version that lets you learn from real users." },
    { q: "Incremental innovation is…", options: ["A complete industry overhaul", "A small improvement to something existing", "Only about technology", "Always illegal"], answer: 1, explanation: "Incremental innovation improves what exists, step by step." },
    { q: "Product–market fit means…", options: ["The product fits in a box", "A market strongly wants your product", "You have a big marketing budget", "Your competitor copies you"], answer: 1, explanation: "Fit is when a real market pulls the product from you." },
    { q: "Which is a classic disruptive pattern?", options: ["Starting at the low end of a market", "Raising prices every year", "Avoiding customers", "Only selling to luxury buyers"], answer: 0, explanation: "Disruptors often start with simpler, cheaper offers at the low end." },
    { q: "Why prototype early?", options: ["To impress investors only", "To learn cheaply before building big", "Because it's mandatory", "To delay launch"], answer: 1, explanation: "Early prototypes make mistakes cheap." },
  ],
};

export const pairs: Record<string, MatchPair[]> = {
  "session-2": [
    { concept: "Positioning", definition: "The place a brand occupies in the customer's mind" },
    { concept: "Brand equity", definition: "The extra value a brand name adds to a product" },
    { concept: "Tone of voice", definition: "How a brand sounds when it speaks" },
    { concept: "Heritage", definition: "A brand's history used as a source of meaning" },
    { concept: "Scarcity", definition: "Limiting supply to increase desirability" },
  ],
};

export const clockQuestions: Record<string, QuizQuestion[]> = {
  "session-3": [
    { q: "SWOT: the 'O' stands for…", options: ["Operations", "Opportunities"], answer: 1, explanation: "" },
    { q: "ROI measures…", options: ["Return on investment", "Rate of inflation"], answer: 0, explanation: "" },
    { q: "Porter's model has how many forces?", options: ["Five", "Three"], answer: 0, explanation: "" },
    { q: "KPI means…", options: ["Key Performance Indicator", "Known Price Index"], answer: 0, explanation: "" },
    { q: "B2B sells to…", options: ["Consumers", "Businesses"], answer: 1, explanation: "" },
    { q: "Churn is when customers…", options: ["Leave", "Upgrade"], answer: 0, explanation: "" },
    { q: "CAC stands for…", options: ["Customer Acquisition Cost", "Cash And Credit"], answer: 0, explanation: "" },
    { q: "A 'cash cow' has…", options: ["High share, low growth", "Low share, high growth"], answer: 0, explanation: "" },
    { q: "Gross margin is revenue minus…", options: ["Cost of goods sold", "Taxes only"], answer: 0, explanation: "" },
    { q: "A pivot is…", options: ["A change of strategy", "A type of loan"], answer: 0, explanation: "" },
    { q: "Blue ocean strategy seeks…", options: ["Crowded markets", "Uncontested markets"], answer: 1, explanation: "" },
    { q: "Break-even is when profit equals…", options: ["Zero", "Revenue"], answer: 0, explanation: "" },
  ],
};

export const statements: Record<string, TFStatement[]> = {
  "session-4": [
    { statement: "Greenwashing means making misleading environmental claims.", answer: true, explanation: "It's marketing that overstates sustainability." },
    { statement: "A subscription model always earns less than one-off sales.", answer: false, explanation: "Recurring revenue often creates more long-term value." },
    { statement: "Circular economy aims to keep materials in use as long as possible.", answer: true, explanation: "Reuse, repair and recycle are at its heart." },
    { statement: "Digital products have zero environmental footprint.", answer: false, explanation: "Servers, devices and data all consume energy." },
    { statement: "A marketplace connects buyers and sellers without owning stock.", answer: true, explanation: "Platforms typically take a commission instead." },
    { statement: "Scope 3 emissions only cover a company's own offices.", answer: false, explanation: "Scope 3 covers the wider value chain." },
  ],
};
