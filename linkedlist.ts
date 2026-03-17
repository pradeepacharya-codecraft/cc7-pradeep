/**
 * Represents a node used internally by the LinkedList.
 * Each node stores a value and a reference to the next node.
 *
 * This class is used as the building block for the linked list.
 */
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * A generic linked list implementation.
 * Stores elements in nodes connected by references.
 * Supports insertion, removal, search, and size retrieval.
 * @typeParam T - The type of elements stored in the list.
 */
export class LinkedList<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  private size = 0;

  addAtEnd(t: T): T {
    const node = new ListNode(t);

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail!.next = node;
      this.#tail = node;
    }

    this.size++;
    return t;
  }

  removeFromEnd(): T | null {
    if (!this.#head) return null;

    if (this.#head === this.#tail) {
      const value = this.#head.value;
      this.#head = null;
      this.#tail = null;
      this.size--;
      return value;
    }

    let current = this.#head;
    while (current.next !== this.#tail) {
      current = current.next!;
    }

    const value = this.#tail!.value;
    current.next = null;
    this.#tail = current;
    this.size--;

    return value;
  }

  addAtHead(t: T): T {
    const node = new ListNode(t);

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }

    this.size++;
    return t;
  }

  removeFromHead(): T | null {
    if (!this.#head) return null;

    const value = this.#head.value;
    this.#head = this.#head.next;

    if (!this.#head) this.#tail = null;

    this.size--;
    return value;
  }

  searchFor(t: T): boolean {
    let current = this.#head;

    while (current) {
      if (current.value === t) return true;
      current = current.next;
    }

    return false;
  }

  get head(): ListNode<T> | null {
    return this.#head;
  }

  get tail(): ListNode<T> | null {
    return this.#tail;
  }
  get length(): number {
    return this.size;
  }
}
