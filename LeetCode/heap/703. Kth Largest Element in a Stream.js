/*  0115 : 703. Kth Largest Element in a Stream (easy) // tags : Heap, Design

  Design a class to find the `kth` largest element in a stream. 
  Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.


  Implement KthLargest class:
    KthLargest(int `k`, int[] `nums`) Initializes the object with the integer `k` and the stream of integers `nums`.
    int `add`(int `val`) Returns the element representing the `kth` largest element in the stream.


  Constraints:
    1 <= k <= 104
    0 <= nums.length <= 10^4
    -104 <= nums[i] <= 10^4
    -104 <= val <= 10^4
    At most 10^4 calls will be made to `add`.
    It is guaranteed that there will be at least `k` elements in the array when you search for the `kth` element.


  Example 1:
    Input
      ["KthLargest", "add", "add", "add", "add", "add"]
      [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

    Output
      [null, 4, 5, 5, 8, 8]

    Explanation
      KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);  [ 8,5,4,2] 4
      kthLargest.add(3);   // return 4                          [ 8,5,4,3,2] 4
      kthLargest.add(5);   // return 5                          [ 8,5,5,4,3,2] 5
      kthLargest.add(10);  // return 5                          [10,8,5,5,4,3,2] 5
      kthLargest.add(9);   // return 8                          [10,9,8,5,5,4,3,2] 8
      kthLargest.add(4);   // return 8                          [10,9,8,5,5,4,4,3,2] 8
  
*/

/**
 * @param {number} k
 * @param {number[]} nums
 */

/*  내가 제출한 답

  시간복잡도 : O(nlogn) / O(k)) : new KthLargest()에서 sort()를 하고 시작한다 / add 메소드가 실행될때마다 맨 뒤의 값이 자리바꿈으로 앞으로 밀려 올라오는데, 제일 앞까지 올 수도 있으므로 최악의 경우 this.heap의 길이인 O(k)일 수 있다
  공간복잡도 : O(1) : add 메소드가 실행된다고 해서 특정 변수가 공간을 많이 차지하지는 않음 (1회당 1개씩 this.nums 배열이 커질수는 있다)

  Runtime: 416 ms, faster than 54.05% of JavaScript online submissions for Kth Largest Element in a Stream.
  Memory Usage: 48.6 MB, less than 43.34% of JavaScript online submissions for Kth Largest Element in a Stream.

*/
var KthLargest = function (k, nums) {
  this.targetIndex = k;
  this.nums = nums.sort((a, b) => b - a);
  this.heap = this.nums.slice(0, k);
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  // 새로운 값 val을 항상 this.nums의 맨 뒤에 넣고,
  // bubbleUp 처리로 자기 앞의 값과 비교해서, 알아서 자기 자리를 찾도록 하자
  this.heap.push(val);
  debugger;
  let currentIndex = this.heap.length - 1;

  while (currentIndex > 0) {
    let indexBefore = currentIndex - 1;
    if (this.heap[currentIndex] > this.heap[indexBefore]) {
      [this.heap[currentIndex], this.heap[indexBefore]] = [
        this.heap[indexBefore],
        this.heap[currentIndex],
      ];
      currentIndex = indexBefore;
    } else {
      break;
    }
  }

  if (this.heap.length > this.targetIndex) {
    this.heap.pop();
  }

  return this.heap[this.targetIndex - 1];
};

// 아래 Min Heap solution 코드를 실행해 보니, `MinHeap` 클래스 안의 this.data의 길이 자체가 애초에 this.k만큼뿐임
// this.k번째 값만 내놓으면 되니까, `MinHeap` 클래스에서는 this.k번째 뒤의 값은 신경쓸 필요가 없다.

// 그래서 내 코드를 수정한 코드가 위 코드이며, 기존 800ms(faster than 40.78%)에서 400ms(faster than 54.05%) 정도로 줄었음

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// ======================================================================================

// 다른 사람의 코드 : Min Heap solution
// 시간복잡도 : Construction: O(nlog(k)) / Add: O(log(k) + O(1) = O(log(k)) / Total: O(nlog(k))

// 토이에서 우선순위 큐를 만들어봐서 기본적인 개념은 이해했는데, 백지에서 만들어보라고 하면 어려울 듯
// bubbleUp에서 비트 shift연산자가 나오는 부분은 잘 모르는 내용임
// => `const parentIndex = (index - 1) >> 1;` : 부모 인덱스를 잡는 코드인데, 기억해 둘 필요 있을 듯

// heapShift 메소드는 원래는 poll이라는 이름이었는데, 내가 알아보기 쉽게 heapShift로 변경함
// heapPush 메소드는 원래는 offer라는 이름이었는데, 내가 알아보기 쉽게 heapShift로 변경함

var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = new MinHeap();
  nums.forEach((n) => this.add(n));
};

KthLargest.prototype.add = function (val) {
  if (this.heap.size() < this.k) {
    this.heap.heapPush(val);
  } else if (this.heap.peek() < val) {
    this.heap.heapPush(val);
    this.heap.heapShift();
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
  heapPush(value) {
    this.data.push(value);
    this.bubbleUp(this.size() - 1);
  }

  // O(log(n))
  heapShift() {
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
