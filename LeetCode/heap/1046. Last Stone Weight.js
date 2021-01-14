/*  0115 : 1046. Last Stone Weight (easy) // tags : Heap, Greedy

  We have a collection of stones, each stone has a positive integer weight.

  Each turn, we choose the two heaviest stones and smash them together. 
  Suppose the stones have weights `x` and `y` with `x <= y`.  
  
  The result of this smash is:
    If `x == y`, both stones are totally destroyed;
    If `x != y`, the stone of weight `x` is totally destroyed, and the stone of weight `y` has new weight `y-x`.

  At the end, there is at most 1 stone left.  
  Return the weight of this stone (or 0 if there are no stones left.)


  Constraints:
    1 <= stones.length <= 30
    1 <= stones[i] <= 1000


  Example 1:
    Input
      [2,7,4,1,8,1]

    Output
      1

    Explanation
      We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
      we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
      we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
      we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.

*/

/*  What’s a heap?

  A `heap` is a tree-like data structure where each node must be ordered with respect to the value of its children. 
  This ordering must persist throughout the entire heap. 
  Put simply, a parent node’s value must always be greater (or less) than its children’s values. 
  
  There are two types of heap: max heap and min heap. 
    As you may have guessed, in a max heap, parent node values are greater than those of their children, 
    whereas the opposite is true in a min heap.

*/

/**
 * @param {number[]} stones
 * @return {number}
 */
// 이진트리 형태를 만들고 값을 끌어올리거나 끌어내리는 방식을 택해야 하는건가 했는데,
// 그렇게 하는 방식이나 매번 sort()하는 방식이나 어차피 복잡도는 동일하지 않나?

/*  내가 제출한 답

  시간복잡도 : 매우 별로임 : 매번 sort()가 진행되고 이는 보통 O(nlogn) / 이 연산을 stones의 길이만큼 하니까 O(n) / shift() 처리를 할때마다 O(n) / pop()으로 하면 O(1)이라 그나마 나음
  공간복잡도 : O(1) : ping 메소드가 실행된다고 해서 특정 변수가 공간을 많이 차지하지는 않음 (1회당 1개씩 this.queue 배열이 커질수는 있다)

  Runtime: 72 ms, faster than 95.99% of JavaScript online submissions for Last Stone Weight.
  Memory Usage: 40.5 MB, less than 27.09% of JavaScript online submissions for Last Stone Weight.

*/

// `shift()`를 활용해서 상대적으로 더 비효율적임 // shift() : O(n)
var lastStoneWeight = function (stones) {
  while (stones.length > 1) {
    let sortedStones = stones.sort((a, b) => b - a);
    if (sortedStones[0] === sortedStones[1]) {
      sortedStones.shift();
      sortedStones.shift();
    } else {
      sortedStones[1] = sortedStones[0] - sortedStones[1];
      sortedStones.shift();
    }
    stones = sortedStones;
  }

  return stones[0] || 0;
};

// `pop()`를 활용해서 그나마 조금 나아짐 // pop() : O(1)
var lastStoneWeight = function (stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => a - b);
    let length = stones.length;
    if (stones[length - 1] === stones[length - 2]) {
      stones.pop();
      stones.pop();
    } else {
      stones[length - 2] = stones[length - 1] - stones[length - 2];
      stones.pop();
    }
  }

  return stones[0] || 0;
};

// ======================================================================================

// 다른 사람의 코드
// 발상은 내 코드와 대강 비슷한 것 같지만, 재귀와 concat을 활용해서 코드를 짧게 줄임

const lastStoneWeight = (stones) =>
  1 === stones.length
    ? stones[0]
    : lastStoneWeight(
        stones.sort((a, b) => a - b).concat(stones.pop() - stones.pop())
      );

// ======================================================================================

// 다른 사람의 코드 : Priority Queue Solution O(N)
// 토이에서 우선순위 큐를 만들어봐서 기본적인 개념은 이해했는데, 백지에서 만들어보라고 하면 어려울 듯
// bubbleUp에서 비트 shift연산자가 나오는 부분은 잘 모르는 내용임
// => `const parentIndex = (index - 1) >> 1;` : 부모 인덱스를 잡는 코드인데, 기억해 둘 필요 있을 듯

// heapShift 메소드는 원래는 poll이라는 이름이었는데, 내가 알아보기 쉽게 heapShift로 변경함
// heapPush 메소드는 원래는 offer라는 이름이었는데, 내가 알아보기 쉽게 heapShift로 변경함
var lastStoneWeight = function (stones) {
  const heap = new MaxHeap(stones);
  while (heap.size() > 1) {
    const max1 = heap.heapShift();
    const max2 = heap.heapShift();
    if (max1 > max2) heap.heapPush(max1 - max2);
  }
  return heap.size() === 1 ? heap.heapShift() : 0;
};

class MaxHeap {
  constructor(data = []) {
    this.data = data;
    this.comparator = (a, b) => b - a;
    this.heapify();
  }

  // O(nlog(n)). In fact, O(n)
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
