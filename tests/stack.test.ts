import { describe, it, expect, beforeEach } from "vitest";
import { Stack } from "../stack";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it("starts empty", () => {
    expect(stack.length).toBe(0);
    expect(stack.top()).toBeNull();
  });

  it("pushes correctly", () => {
    stack.push(1);
    stack.push(2);

    expect(stack.length).toBe(2);
    expect(stack.top()).toBe(2);
  });

  it("pops correctly", () => {
    stack.push(10);
    stack.push(20);

    expect(stack.pop()).toBe(20);
    expect(stack.pop()).toBe(10);
    expect(stack.pop()).toBeNull();
  });

  it("returns top without removing", () => {
    stack.push(5);
    stack.push(15);

    expect(stack.top()).toBe(15);
    expect(stack.length).toBe(2);
  });

  it("handles empty stack", () => {
    expect(stack.pop()).toBeNull();
    expect(stack.top()).toBeNull();
  });
  it("isEmpty works correctly", () => {
    expect(stack.isEmpty).toBe(true);

    stack.push(1);
    expect(stack.isEmpty).toBe(false);

    stack.pop();
    expect(stack.isEmpty).toBe(true);
  });

  it("top on single element", () => {
    stack.push(99);

    expect(stack.top()).toBe(99);
    expect(stack.length).toBe(1);
  });
});
