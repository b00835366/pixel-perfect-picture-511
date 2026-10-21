import { describe, expect, it } from "vitest";
import { scoreVerdict } from "@/lib/progress";

describe("scoreVerdict", () => {
  it("perfect score", () => expect(scoreVerdict(100)).toBe("MAIN CHARACTER ENERGY."));
  it("high score", () => expect(scoreVerdict(80)).toBe("OKAY, YOU KNOW YOUR STUFF."));
  it("low score", () => expect(scoreVerdict(20)).toBe("PLOT TWIST. LET'S TRY AGAIN."));
});
