import { describe, it, expect, vi } from "vitest";
import { delay } from "../promise5.ts";

describe("delay function", () => {
  it("should resolve after given milliseconds", async () => {
    vi.useFakeTimers(); // Vitest takes control of timers

    const promise = delay(1000); // start delay

    await vi.advanceTimersByTimeAsync(1000); // simulate 1 second passing

    expect(promise).resolves.toBeUndefined(); // verify promise resolved

    vi.useRealTimers(); // restore real timers
  });
});
