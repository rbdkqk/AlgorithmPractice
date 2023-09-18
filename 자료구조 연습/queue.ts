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
  private _storage: Map<number, T> = new Map<number, T>();
  private _front: number = 0;
  private _rear: number = 0;

  private getNode(key: number): T {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._storage.get(key);
  }

  private setNode(key: number, node: T): void {
    this._storage.set(key, node);
  }

  private removeNode(key): void {
    this._storage.delete(key);
  }

  size(): number {
    if (this.getNode(this._rear) === undefined) {
      return 0;
    }

    return this._rear - this._front + 1;
  }

  enqueue(node: T): void {
    if (this.isEmpty()) {
      this.setNode(0, node);
      return;
    }

    this._rear++;
    this.setNode(this._rear, node);
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }

    if (this._front === this._rear) {
      const aloneNode = this.peek();
      this.removeNode(this._front);
      this._front = this._rear = 0;
      return aloneNode;
    }

    const dequeueNode = this.peek();
    this.removeNode(this._front);
    this._front++;

    return dequeueNode;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }

    return this.getNode(this._front);
  }

  clear(): void {
    this._storage.clear();
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
      arr.push(this.getNode(index));
    }

    return arr;
  }
}
