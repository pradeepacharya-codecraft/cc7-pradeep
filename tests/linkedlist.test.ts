/**
 * @description Unit tests for the LinkedList class using Vitest.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList } from "../linkedlist";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("starts empty", () => {
    expect(list.length).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it("adds at end", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);

    expect(list.length).toBe(2);
    expect(list.head?.value).toBe(1);
    expect(list.tail?.value).toBe(2);
  });

  it("adds at head correctly", () => {
    list.addAtHead(1);
    list.addAtHead(2);

    expect(list.length).toBe(2);
    expect(list.head?.value).toBe(2);
    expect(list.tail?.value).toBe(1);
  });

  it("removes from head", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.removeFromHead()).toBe(10);
    expect(list.length).toBe(1);
    expect(list.head?.value).toBe(20);
  });

  it("removes from end (multiple elements)", () => {
    list.addAtEnd(4);
    list.addAtEnd(56);

    expect(list.removeFromEnd()).toBe(56);
    expect(list.removeFromEnd()).toBe(4);

    expect(list.removeFromHead()).toBeNull();
    expect(list.length).toBe(0);
  });

  it("removes from empty list", () => {
    expect(list.removeFromHead()).toBeNull();
    expect(list.removeFromEnd()).toBeNull();
  });

  it("handles single element removal from end", () => {
    list.addAtEnd(100);

    expect(list.removeFromEnd()).toBe(100);
    expect(list.length).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it("search finds value at head", () => {
    list.addAtEnd(99);
    list.addAtEnd(100);

    expect(list.searchFor(99)).toBe(true);
  });

  it("search finds value in middle", () => {
    list.addAtEnd(5);
    list.addAtEnd(15);
    list.addAtEnd(25);

    expect(list.searchFor(15)).toBe(true);
  });

  it("search returns false when not found", () => {
    list.addAtEnd(5);
    list.addAtEnd(15);

    expect(list.searchFor(999)).toBe(false);
  });

  it("search on empty list returns false", () => {
    expect(list.searchFor(10)).toBe(false);
  });

  it("head getter work", () => {
    expect(list.head).toBeNull();

    list.addAtEnd(1);
    expect(list.head).not.toBeNull();
    expect(list.head?.value).toBe(1);

    list.removeFromHead();
    expect(list.head).toBeNull();
  });

  it("tail getter work", () => {
    expect(list.tail).toBeNull();

    list.addAtEnd(1);
    expect(list.tail?.value).toBe(1);

    list.addAtEnd(2);
    expect(list.tail?.value).toBe(2);
  });

  it("removes from end with more than two elements", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);
    list.addAtEnd(3);

    expect(list.removeFromEnd()).toBe(3);
    expect(list.tail?.value).toBe(2);
    expect(list.length).toBe(2);
  });

  it("length getter updates correctly", () => {
    expect(list.length).toBe(0);

    list.addAtEnd(1);
    list.addAtHead(2);

    expect(list.length).toBe(2);

    list.removeFromHead();
    expect(list.length).toBe(1);

    list.removeFromEnd();
    expect(list.length).toBe(0);
  });
});
