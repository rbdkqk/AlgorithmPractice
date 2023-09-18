export interface IQueue<T> {
  size(): number;
  enqueue(node: T): void;
  dequeue(): T;
  peek(): T;
  clear(): void;
  isEmpty(): boolean;
  toArray(): T[];
}

export class Queue<T> implements IQueue<T> {
  private _storage: Record<`${typeof this._front | typeof this._rear}`, T> = {};
  private _front: number = 0;
  private _rear: number = 0;

  size(): number {
    if (this._storage[`${this._rear}`] === undefined) {
      return 0;
    }

    return this._rear - this._front + 1;
  }

  enqueue(node: T): void {
    if (this.isEmpty()) {
      this._storage['0'] = node;
      return;
    }

    this._rear++;
    this._storage[`${this._rear}`] = node;
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }

    if (this._front === this._rear) {
      const aloneNode = this.peek();
      delete this._storage[`${this._front}`];
      this._front = this._rear = 0;
      return aloneNode;
    }

    const dequeueNode = this.peek();
    delete this._storage[`${this._front}`];
    this._front++;

    return dequeueNode;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }

    return this._storage[`${this._front}`];
  }

  clear(): void {
    this._storage = {};
    this._front = this._rear = 0;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  toArray(): T[] {
    if (this.isEmpty()) {
      return [];
    }

    const arr: T[] = [];
    for (let index = this._front; index <= this._rear; index++) {
      if (index in this._storage) {
        arr.push(this._storage[`${index}`]);
      }
    }

    return arr;
  }
}
