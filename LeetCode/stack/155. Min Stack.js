/*  0113 : 155. Min Stack (easy)

  Design a stack that supports push, pop, top, and retrieving 
    the minimum element in constant time.

  push(x) -- Push element x onto stack.
  pop() -- Removes the element on top of the stack.
  top() -- Get the top element.
  getMin() -- Retrieve the minimum element in the stack.


  Constraints:
    Methods pop, top and getMin operations will always be called on non-empty stacks.


  Example 1:
    Input
      ["MinStack","push","push","push","getMin","pop","top","getMin"]
      [[],[-2],[0],[-3],[],[],[],[]]

    Output
      [null,null,null,null,-3,null,0,-2]

    Explanation
      MinStack minStack = new MinStack();
      minStack.push(-2);
      minStack.push(0);
      minStack.push(-3);
      minStack.getMin(); // return -3
      minStack.pop();
      minStack.top();    // return 0
      minStack.getMin(); // return -2

*/

/**
 * initialize your data structure here.
 */

/*  내가 제출한 답

  시간복잡도 : O(n) : getMin 메소드에 관하여, Math.min 처리를 위해서는 this.stack 배열을 한바퀴 돌아야 할 것임
  공간복잡도 : o(1) : 공간복잡도 면에서는 별다른 것이 없을 듯

  Runtime: 236 ms, faster than 25.39% of JavaScript online submissions for Min Stack.
  Memory Usage: 45.3 MB, less than 83.59% of JavaScript online submissions for Min Stack.

*/

var MinStack = function () {
  this.stack = [];
  return null;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  return null;
};

/**
 * @return {void}
 */
// 의문점 :
// 여기서는 pop에서 리턴값이 없다. 문제 조건이나 예시에서도 '@returns {void}' / '[]' 라고 했음
// 그러나, 개념상 pop의 결과물을 다른데서 써먹으려면 return하는게 맞지 않나?
// top으로 대신하나?
MinStack.prototype.pop = function () {
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return Math.min.apply(null, this.stack);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// ======================================================================================

// 다른 사람의 답
// getMin 메소드에 관하여, 나는 Math.min을 this.stack 전체에 돌리기 때문에 O(n)이 된다.
// 아래 답은 getMin을 위한 별도의 stack을 관리하기 때문에 훨씬 간편함

/**
 * @constructor
 */
var MinStack = function () {
  this.minStack = [];
  this.container = [];
};

/**
 * @param {number} x
 * @returns {void}
 */
MinStack.prototype.push = function (x) {
  this.container.push(x);
  if (
    this.minStack.length === 0 ||
    x <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(x);
  }
};

/**
 * @returns {void}
 */
MinStack.prototype.pop = function () {
  var x = this.container.pop();
  if (x === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @returns {number}
 */
MinStack.prototype.top = function () {
  return this.container[this.container.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

var MinStack = function () {
  this.elements = [];
};

// ======================================================================================

// 다른 사람의 답
// getMin을 위한 별도의 stack을 관리하지 않고, 각 값마다 min이라는 키/값을 저장해주고 있음

/**
 * @param {number} x
 * @returns {void}
 */
MinStack.prototype.push = function (x) {
  this.elements.push({
    value: x,
    min: this.elements.length === 0 ? x : Math.min(x, this.getMin()),
  });
};

/**
 * @returns {void}
 */
MinStack.prototype.pop = function () {
  this.elements.pop();
};

/**
 * @returns {number}
 */
MinStack.prototype.top = function () {
  return this.elements[this.elements.length - 1].value;
};

/**
 * @returns {number}
 */
MinStack.prototype.getMin = function () {
  return this.elements[this.elements.length - 1].min;
};
