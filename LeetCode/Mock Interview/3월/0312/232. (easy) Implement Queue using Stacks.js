/*  0312 Mock Interview : 232. (easy) Implement Queue using Stacks  // tag : Stack, Design

  Implement a first in first out (FIFO) queue using only two stacks. 
    The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

  Implement the MyQueue class:
    `void push(int x)` Pushes element x to the back of the queue.
    `int pop()` Removes the element from the front of the queue and returns it.
    `int peek()` Returns the element at the front of the queue.
    `boolean empty()` Returns true if the queue is empty, false otherwise.

  Notes:
    You must use only standard operations of a stack, 
      which means only push to top, peek/pop from top, size, and is empty operations are valid.
    Depending on your language, the stack may not be supported natively. 
      You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
  
  Follow-up: 
    Can you implement the queue such that each operation is amortized O(1) time complexity? 
      In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.


  Constraints:
    1 <= x <= 9
    At most 100 calls will be made to push, pop, peek, and empty.
    All the calls to pop and peek are valid.


  Example 1:
    Input
      ["MyQueue", "push", "push", "peek", "pop", "empty"]
      [[], [1], [2], [], [], []]
      
    Output
      [null, null, null, 1, 1, false]

    Explanation
      MyQueue myQueue = new MyQueue();
      myQueue.push(1); // queue is: [1]
      myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
      myQueue.peek(); // return 1
      myQueue.pop(); // return 1, queue is [2]
      myQueue.empty(); // return false

*/

// 성공 - 20분 소요 (Follow-up에서 주어진 O(1) 시간복잡도 조건은 .pop() 메소드 부분에서 지키지 못한 것 같다)
// Runtime: 80 ms
// Memory Usage: 38.6 MB

/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.queue = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.queue.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  let tempStack = [];

  let queueLength = this.queue.length;

  for (let i = 0; i < queueLength; i++) {
    tempStack.push(this.queue.pop());
  }

  let popped = tempStack.pop();

  let tempStackLength = tempStack.length;

  for (let j = 0; j < tempStackLength; j++) {
    this.queue.push(tempStack.pop());
  }

  return popped;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return this.queue[0];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.queue.length > 0 ? false : true;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution Beats 98%R and 100%S
// peek를 왜 저렇게 길게 해야 하는지 잘 모르겠음. this.stack1[0]으로 즉시 접근할 수 있지 않나?

/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  while (this.stack1.length !== 0) {
    this.stack2.push(this.stack1.pop());
  }

  var pop = this.stack2.pop();

  while (this.stack2.length !== 0) {
    this.stack1.push(this.stack2.pop());
  }

  return pop;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  while (this.stack1.length !== 0) {
    this.stack2.push(this.stack1.pop());
  }

  var pop = this.stack2.pop();
  this.stack2.push(pop);
  while (this.stack2.length !== 0) {
    this.stack1.push(this.stack2.pop());
  }

  return pop;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack1.length === 0 ? true : false;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
