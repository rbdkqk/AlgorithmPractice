/*  0214 : 347. (medium) Top K Frequent Elements  //  tag : Hash Table, Heap

  Given a non-empty array of integers, return the `k` most frequent elements.


  Note:
    You may assume `k` is always valid, `1 ≤ k ≤ number` of unique elements.
    Your algorithm's time complexity must be better than `O(n log n)`, where `n` is the array's size.
    It's guaranteed that the answer is unique, in other words the set of the top `k` frequent elements is unique.
    You can return the answer in any order.


  Example 1:
    Input: nums = [1,1,1,2,2,3], k = 2
    Output: [1,2]
  
  Example 2:
    Input: nums = [1], k = 1
    Output: [1]

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/*  내가 작성한 코드 : 
    => 앞 문제 다른 사람의 코드에서 참고한 heap 클래스를 가져와서, max heap 방식으로 해결함
    => 문제점 : 빈도 순서대로 k번째까지 뽑아야 하는데, heap 배열을 단순히 k번째까지 slice하면, 최대 heap이 정확히 잡히지 않게 됨
    => 해결 : heap에서 최대값을 가져올 때에는 필히 내장 메소드(여기서는 extractMax())를 사용해야, 최대값을 빼낸 후에 heap이 정확히 다시 졍렬된다
    => 의문점 : for 반복문 / Object.keys() / insert()에서 시간복잡도가 n^2logn일 것 같은데, 맞는지 확인 필요
    => 힙 공부자료 : https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html

  시간복잡도 : O(n^2logn) : 첫 recude에서 n, obj 순회에서 2n * nlogn(insert()), extractMax에서 nlogn * k
  공간복잡도 : O(3n => n) : nums 배열의 길이에 따라서, maxHeap, obj, answer 3개 변수의 크기가 달라짐

  Runtime: 92 ms, faster than 82.95% of JavaScript online submissions for Top K Frequent Elements.
  Memory Usage: 41.9 MB, less than 60.91% of JavaScript online submissions for Top K Frequent Elements.

*/
var topKFrequent = function (nums, k) {
  let maxHeap = new MaxHeap();

  let obj = nums.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  for (let key of Object.keys(obj)) {
    maxHeap.insert(new HeapObject(key, obj[key]));
  }

  let answer = [];

  for (let i = 0; i < k; i++) {
    answer.push(Number(maxHeap.extractMax().character));
  }

  return answer;
};

class HeapObject {
  constructor(character, count) {
    this.character = character;
    this.count = count;
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  values() {
    return this.heap;
  }

  insert(obj) {
    this.heap.push(obj);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (parent.count > element.count) break;

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMax() {
    let max;
    if (this.size()) {
      max = this.heap[0];
      if (this.size() > 1) {
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
      } else {
        this.heap.pop();
      }
    }
    return max;
  }

  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let largest = index;
    let length = this.size();
    if (left < length && this.heap[left].count > this.heap[largest].count) {
      largest = left;
    }
    if (right < length && this.heap[right].count > this.heap[largest].count) {
      largest = right;
    }
    if (largest !== index) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      this.sinkDown(largest);
    }
  }
}

// ======================================================================================

// 다른 사람의 코드 : JavaScript No Sorting O(N) Time
var topKFrequent = function (nums, k) {
  const freqMap = new Map();
  const bucket = [];
  const result = [];

  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  for (let [num, freq] of freqMap) {
    bucket[freq] = (bucket[freq] || new Set()).add(num);
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }
  return result;
};

// ======================================================================================

// 다른 사람의 코드 : [javascript] [hash map] [max heap] [priority queue] solution (1)
var topKFrequent = function (nums, k) {
  // results array
  let results = [];

  // 1) first step is to build a hash map, where "element -> its frequency"
  // it costs O(n), where n is nums.length
  let map = {};
  nums.forEach((n) => (map[n] ? (map[n] += 1) : (map[n] = 1)));

  let pq = new PriorityQueue();
  // 2) enqueue each map element to max binary heap priority queue
  for (let key in map) {
    // it costs O(log n), where n is nums.length
    pq.enqueue(key, map[key]);
  }

  // 3) k times dequeue element from priority queue and push it to results array
  for (let i = 0; i < k; i++) {
    // it costs O(log n), where n is nums.length
    results.push(pq.dequeue());
  }

  // return results array
  // as result we have O(n Log n) where n is length of nums
  return results;
};

class PriorityQueue {
  constructor() {
    this._values = [];
  }

  enqueue(val, priority) {
    this._values.push(new Node(val, priority));
    this._traverseUp();
  }

  dequeue() {
    const max = this._values[0];
    const end = this._values.pop();
    if (this._values.length > 0) {
      this._values[0] = end;
      this._traverseDown();
    }
    return max.val;
  }

  _traverseUp() {
    let idx = this._values.length - 1;
    const el = this._values[idx];
    while (idx > 0) {
      let pIdx = Math.floor((idx - 1) / 2);
      let parent = this._values[pIdx];
      if (el.priority <= parent.priority) break;
      this._values[pIdx] = el;
      this._values[idx] = parent;
      idx = pIdx;
    }
  }

  _traverseDown() {
    let leftChildIdx = null;
    let rightChildIdx = null;
    let leftChild = null;
    let rightChild = null;
    let swapIdx = null;

    let idx = 0;
    const el = this._values[idx];
    while (true) {
      swapIdx = null;
      leftChildIdx = 2 * idx + 1;
      rightChildIdx = 2 * idx + 2;

      if (leftChildIdx < this._values.length) {
        leftChild = this._values[leftChildIdx];
        if (leftChild.priority > el.priority) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < this._values.length) {
        rightChild = this._values[rightChildIdx];
        if (
          (swapIdx === null && rightChild.priority > el.priority) ||
          (swapIdx !== null && rightChild.priority > leftChild.priority)
        ) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;
      this._values[idx] = this._values[swapIdx];
      this._values[swapIdx] = el;
      idx = swapIdx;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

// ======================================================================================

// 다른 사람의 코드 : [javascript] [hash map] [max heap] [priority queue] solution (2)
// also there is one more simple solution that actually has same time coplexity:
// O(n Log n) where n is length of nums
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent2 = function (nums, k) {
  // results array
  let results = [];

  // 1) first step is to build a hash map, where "element -> its frequency"
  // it costs O(n), where n is nums.length
  let map = {};
  nums.forEach((n) => (map[n] ? (map[n] += 1) : (map[n] = 1)));

  // 2) sort the map keys array based on its frequency
  // it costs O(log n), where n is nums.length
  let sortedKeys = Object.keys(map).sort((a, b) => map[b] - map[a]);

  // 3) take first k results
  for (let i = 0; i < k; i++) {
    results.push(sortedKeys[i]);
  }

  // as result we have O(n Log n) where n is length of nums
  return results;
};

// ======================================================================================

// 다른 사람의 코드 : JS solution using min heap
var topKFrequent = function (nums, k) {
  let frequency = getFrequency(nums);
  let minHeap = new Heap((a, b) => b.freq - a.freq, k);

  Object.keys(frequency).forEach((num) => {
    minHeap.insert({
      num: num,
      freq: frequency[num],
    });
  });

  let result = [];
  for (let i = 1; i <= k; i++) {
    result.push(parseInt(minHeap._heap[i].num, 10));
  }
  return result;
};

function getFrequency(nums) {
  let result = {};
  nums.forEach((num) => {
    result[num] = result[num] ? result[num] + 1 : 1;
  });
  return result;
}

/**
 * It is max heap by default
 * @usage:
 * let maxHeap = new Heap();
 * let maxHeap = new Heap(100, (a, b) => a.value - b.value);
 * let minHeap = new Heap(100, (a, b) => b-a);
 */
class Heap {
  constructor(compareFn = (a, b) => a - b, capacity = Heap.DEFAULT_HEAP_SIZE) {
    this.capacity = capacity;
    this._heap = [];
    if (typeof compareFn === 'function') {
      this.compare = compareFn;
    }
  }

  get size() {
    return this._heap.length - 1;
  }

  get rootNode() {
    return this._heap[1] ? this._heap[1] : null;
  }

  set rootNode(node) {
    this._heap[1] = node;
  }

  insert(obj) {
    if (this.rootNode === null) {
      this.rootNode = obj;
      return this;
    }
    if (this.size >= this.capacity) {
      if (this.compare(this.rootNode, obj) > 0) {
        this.rootNode = obj;
        this._down(1);
      }
    } else {
      this._heap.push(obj);
      this._up(this.size);
    }
    return this;
  }

  _down(index) {
    let childIndex = { left: index * 2, right: index * 2 + 1 };
    let biggerChildIndex = null;
    if (childIndex.left > this.size) {
      return;
    }
    if (childIndex.left === this.size) {
      biggerChildIndex = childIndex.left;
    } else {
      biggerChildIndex =
        this.compare(
          this._heap[childIndex.left],
          this._heap[childIndex.right]
        ) > 0
          ? childIndex.left
          : childIndex.right;
    }
    if (this.compare(this._heap[biggerChildIndex], this._heap[index]) > 0) {
      this._swap(index, biggerChildIndex);
      this._down(biggerChildIndex);
    }
  }

  _up(index) {
    let parentIndex = index >= 2 ? Math.floor(index / 2) : 0;
    if (
      parentIndex > 0 &&
      this.compare(this._heap[parentIndex], this._heap[index]) < 0
    ) {
      this._swap(parentIndex, index);
      this._up(parentIndex);
    }
  }

  _swap(index1, index2) {
    let item1 = this._heap[index1];
    this._heap[index1] = this._heap[index2];
    this._heap[index2] = item1;
  }
}
Heap.DEFAULT_HEAP_SIZE = 1000;

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean O(N) - Quick-Select
// I've explained the quick select approach in detail here
// https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/664455/JavaScript-Iterative-Quick-Select-O(N)-Heavily-Commented
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let n of nums) map.set(n, (map.get(n) || 0) + 1);
  const keys = [...map.keys()],
    finalIdx = keys.length - k;
  let start = 0,
    end = keys.length - 1;

  while (start <= end) {
    const pivot = Math.floor(Math.random() * (end - start + 1)) + start;
    const pivotIdx = pivotHelper(pivot, start, end);

    if (pivotIdx === finalIdx) return keys.slice(finalIdx);
    if (pivotIdx < finalIdx) start = pivotIdx + 1;
    else end = pivotIdx - 1;
  }

  function pivotHelper(pivot, start, end) {
    // move pivot away to the end
    swap(pivot, end);
    let swapIdx = start;

    for (let i = start; i < end; i++) {
      if (map.get(keys[i]) < map.get(keys[end])) {
        swap(swapIdx, i);
        swapIdx++;
      }
    }
    swap(swapIdx, end);
    return swapIdx;
  }

  function swap(i, j) {
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
};
