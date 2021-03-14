/*  0314-1 Mock Interview : 703. (easy) Kth Largest Element in a Stream  // tag : Heap, Design

  Design a class to find the `kth` largest element in a stream. 

  Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

    Implement KthLargest class:
      `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
      `int add(int val)` Returns the element representing the `kth` largest element in the stream.


  Constraints:
    1 <= k <= 104
    0 <= nums.length <= 104
    -104 <= nums[i] <= 104
    -104 <= val <= 104
    At most 104 calls will be made to add.
    It is guaranteed that there will be at least k elements in the array when you search for the kth element.


  Example 1:
    Input
      ["KthLargest", "add", "add", "add", "add", "add"]
      [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

    Output
      [null, 4, 5, 5, 8, 8]

    Explanation
      KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
      kthLargest.add(3);   // return 4
      kthLargest.add(5);   // return 5
      kthLargest.add(10);  // return 5
      kthLargest.add(9);   // return 8
      kthLargest.add(4);   // return 8

*/

// 성공 : 30분 소요 (무식하게 새로운 값의 적절한 자리를 찾아서 넣어주는 방식을 택했는데, 이 과정에서 시간복잡도가 증가한다)
// Runtime: 908 ms
// Memory Usage: 63.6 MB

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.nums = nums.sort((a, b) => b - a);
  this.realK = k - 1;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.nums.length === 0 || this.nums[this.nums.length - 1] > val) {
    this.nums.push(val);
  } else {
    for (let i = 0; i < this.nums.length; i++) {
      if (val >= this.nums[i]) {
        let front = this.nums.slice(0, i);
        let back = this.nums.slice(i);
        this.nums = [...front, val, ...back];
        break;
      }
    }
  }

  return this.nums[this.realK];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// ======================================================================================

// 다른 사람의 코드 : JavaScript Min Heap solution (O(nlog(k)))
var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = new MinHeap();
  nums.forEach((n) => this.add(n));
};

KthLargest.prototype.add = function (val) {
  if (this.heap.size() < this.k) {
    this.heap.offer(val);
  } else if (this.heap.peek() < val) {
    this.heap.offer(val);
    this.heap.poll();
  }
  return this.heap.peek();
};

class MinHeap {
  constructor(data = []) {
    this.data = data;
    this.comparator = (a, b) => a - b;
    this.heapify();
  }

  // O(nlog(n))
  heapify() {
    if (this.size() < 2) return;
    for (let i = 1; i < this.size(); i++) {
      this.bubbleUp(i);
    }
  }

  // O(1)
  peek() {
    if (this.size() === 0) return null;
    return this.data[0];
  }

  // O(log(n))
  offer(value) {
    this.data.push(value);
    this.bubbleUp(this.size() - 1);
  }

  // O(log(n))
  poll() {
    if (this.size() === 0) return null;
    const result = this.data[0];
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return result;
  }

  // O(log(n))
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // O(log(n))
  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;
      let findIndex = index;
      if (
        leftIndex <= lastIndex &&
        this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
      ) {
        findIndex = leftIndex;
      }
      if (
        rightIndex <= lastIndex &&
        this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
      ) {
        findIndex = rightIndex;
      }
      if (index !== findIndex) {
        this.swap(index, findIndex);
        index = findIndex;
      } else {
        break;
      }
    }
  }

  // O(1)
  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  // O(1)
  size() {
    return this.data.length;
  }
}

// ======================================================================================

// 다른 사람의 코드 : Easiest Solution For Javascript
var KthLargest = function (k, nums) {
  this.k = k;
  this.arr = nums.sort((a, b) => b - a);
  this.arr.length = this.arr.length > k ? k : this.arr.length;
};

KthLargest.prototype.add = function (val) {
  const insert = () => {
    if (this.arr[this.arr.length - 1] < val || this.arr.length < this.k) {
      this.arr.push(val);
      this.arr = this.arr.sort((a, b) => b - a);
      this.arr.length = this.arr.length > this.k ? this.k : this.arr.length;
    }
  };
  insert();
  return this.arr[this.arr.length - 1];
};
