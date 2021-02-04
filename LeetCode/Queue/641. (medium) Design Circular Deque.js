/*  0203 : 641. (medium) Design Circular Deque  //  tag : Design, Queue

  Design your implementation of the circular double-ended queue (deque).

  Your implementation should support following operations:
    - MyCircularDeque(k): Constructor, set the size of the deque to be k.
    - insertFront(): Adds an item at the front of Deque. Return true if the operation is successful.
    - insertLast(): Adds an item at the rear of Deque. Return true if the operation is successful.
    - deleteFront(): Deletes an item from the front of Deque. Return true if the operation is successful.
    - deleteLast(): Deletes an item from the rear of Deque. Return true if the operation is successful.
    - getFront(): Gets the front item from the Deque. If the deque is empty, return -1.
    - getRear(): Gets the last item from Deque. If the deque is empty, return -1.
    - isEmpty(): Checks whether Deque is empty or not. 
    - isFull(): Checks whether Deque is full or not.


  Constraints:
    All values will be in the range of [0, 1000].
    The number of operations will be in the range of [1, 1000].
    Please do not use the built-in Deque library.


  Example 1:
    MyCircularDeque circularDeque = new MycircularDeque(3); // set the size to be 3
    circularDeque.insertLast(1);			                      // return true
    circularDeque.insertLast(2);			                      // return true
    circularDeque.insertFront(3);			                      // return true
    circularDeque.insertFront(4);			                      // return false, the queue is full
    circularDeque.getRear();  			                        // return 2
    circularDeque.isFull();				                          // return true
    circularDeque.deleteLast();			                        // return true
    circularDeque.insertFront(4);			                      // return true
    circularDeque.getFront();			                          // return 4s "aaca", of which only "aa" is possible, 

*/

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */

// 실패함 : 개념을 잘 이해하지 못해서, 다른 사람의 코드를 붙여놓음

/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.size = k;
  this.tail = 0;
  this.head = 0;
  this.len = 0;
  this.list = [];
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (!this.isFull()) {
    this.head = (this.head + this.size - 1) % this.size;
    this.list[this.head] = value;
    this.len++;
    return true;
  }
  return false;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (!this.isFull()) {
    // 注意不应该直接push
    this.list[this.tail] = value;
    this.tail = (this.tail + 1) % this.size;
    this.len++;
    return true;
  }
  return false;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (!this.isEmpty()) {
    this.head = (this.head + 1) % this.size;
    this.len--;
    return true;
  }
  return false;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (!this.isEmpty()) {
    this.tail = (this.tail + this.size - 1) % this.size;
    this.len--;
    return true;
  }
  return false;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (!this.isEmpty()) {
    return this.list[this.head];
  }
  return -1;
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (!this.isEmpty()) {
    return this.list[(this.tail + this.size - 1) % this.size];
  }
  return -1;
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.len == 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return this.len == this.size;
};
