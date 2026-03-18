import { LinkedList } from './linkedlist.ts';

export class Stack<T> {
  readonly #items: LinkedList<T>;

  constructor() {
    this.#items = new LinkedList<T>();
  }

  push(value: T): T {
    return this.#items.addAtHead(value);
  }

  pop(): T | null {
    return this.#items.removeFromHead();
  }

  top(): T | null {
    return this.#items.head?.value ?? null;
  }

  get length(): number {
    return this.#items.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }
}
