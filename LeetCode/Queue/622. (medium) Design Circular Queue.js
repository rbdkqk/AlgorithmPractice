/*  0213 : 622. (medium) Design Circular Queue   //  tag : Design, Queue

  Design your implementation of the circular queue. 
    The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle 
    and the last position is connected back to the first position to make a circle. 
    It is also called "Ring Buffer".

  One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. 
    In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. 
    But using the circular queue, we can use the space to store new values.

  Implementation the `MyCircularQueue` class:
    - `MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.
    - `int Front()` Gets the front item from the queue. If the queue is empty, return -1.
    - `int Rear()` Gets the last item from the queue. If the queue is empty, return -1.
    - `boolean enQueue(int value)` Inserts an element into the circular queue. Return true if the operation is successful.
    - `boolean deQueue()` Deletes an element from the circular queue. Return true if the operation is successful.
    - `boolean isEmpty()` Checks whether the circular queue is empty or not.
    - `boolean isFull()` Checks whether the circular queue is full or not.


  Constraints:
    1 <= k <= 1000
    0 <= value <= 1000
    At most 3000 calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.


  Example 1:
    Input
      ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
      [[3], [1], [2], [3], [4], [], [], [], [4], []]
    Output
      [null, true, true, true, false, 3, true, true, true, 4]

    Explanation
      MyCircularQueue myCircularQueue = new MyCircularQueue(3);
      myCircularQueue.enQueue(1); // return True
      myCircularQueue.enQueue(2); // return True
      myCircularQueue.enQueue(3); // return True
      myCircularQueue.enQueue(4); // return False
      myCircularQueue.Rear();     // return 3
      myCircularQueue.isFull();   // return True
      myCircularQueue.deQueue();  // return True
      myCircularQueue.enQueue(4); // return True
      myCircularQueue.Rear();     // return 4

*/

/**
 * @param {number} k
 */

/*  내가 작성한 코드 : 통과는 했는데, 이게 `Circular`와 무슨 관계가 있는건지 모르겠음. 이건 그냥 queue를 구현한 것 아닌가?
    => `Circular Queue`의 개념 자체를 이해하지 못한 상태이므로, 아래 다른 사람 코드로 제출했음. 공부 필요

  시간복잡도 : O(1) : 각 메소드 등에서 순회하거나 하는 등의 처리가 없음
  공간복잡도 : O(n) : this.storage는 최대 k만큼 길어질 수 있음

  Runtime: 136 ms, faster than 27.65% of JavaScript online submissions for Design Circular Queue.
  Memory Usage: 45.4 MB, less than 28.03% of JavaScript online submissions for Design Circular Queue.

*/
var MyCircularQueue = function (k) {
  this.maximumSize = k;
  this.storage = [];
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false;
  } else {
    this.storage.push(value);
    return true;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  } else {
    this.storage.shift();
    return true;
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.storage[0];
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.storage[this.storage.length - 1];
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  if (this.storage.length === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  if (this.storage.length === this.maximumSize) {
    return true;
  } else {
    return false;
  }
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

// ======================================================================================

// 다른 사람의 코드 : Javascript - Easy to understand & beats 100%
var MyCircularQueue = function (k) {
  this.storage = [];
  this.currentSize = 0;
  this.maxSize = k;
  this.front = 0;
  this.rear = -1;
};

MyCircularQueue.prototype.enQueue = function (value) {
  if (this.currentSize >= this.maxSize) {
    return false;
  }

  this.rear = ++this.rear % this.maxSize;
  this.storage[this.rear] = value;
  this.currentSize++;

  return true;
};

MyCircularQueue.prototype.deQueue = function () {
  if (this.currentSize === 0) {
    return false;
  }

  this.front = ++this.front % this.maxSize;
  this.currentSize--;

  return true;
};

MyCircularQueue.prototype.Front = function () {
  return this.currentSize === 0 ? -1 : this.storage[this.front];
};

MyCircularQueue.prototype.Rear = function () {
  return this.currentSize === 0 ? -1 : this.storage[this.rear];
};

MyCircularQueue.prototype.isEmpty = function () {
  return this.currentSize === 0;
};

MyCircularQueue.prototype.isFull = function () {
  return this.currentSize === this.maxSize;
};
