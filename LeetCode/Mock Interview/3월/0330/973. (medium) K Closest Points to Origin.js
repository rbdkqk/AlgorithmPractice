/*  0330 Mock Interview : 973. (medium) K Closest Points to Origin  // tag : Divide and Conquer, Heap, Sort

  Given an array of `points` 
    where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, 
    return the `k` closest points to the origin `(0, 0)`.

  The distance between two points on the X-Y plane is the Euclidean distance 
    (i.e., √(x1 - x2)^2 + (y1 - y2)^2).

  You may return the answer in any order. 
    The answer is guaranteed to be unique (except for the order that it is in).


  Constraints:
    1 <= k <= points.length <= 104
    -10^4 < xi, yi < 10^4


  Example 1:
    Input: points = [[1,3],[-2,2]], k = 1
    Output: [[-2,2]]
    Explanation:
      The distance between (1, 3) and the origin is sqrt(10).
      The distance between (-2, 2) and the origin is sqrt(8).
      Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
      We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

  Example 2:
    Input: points = [[3,3],[5,-1],[-2,4]], k = 2
    Output: [[3,3],[-2,4]]
    Explanation: The answer [[-2,4],[3,3]] would also be accepted.

*/

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */

// 성공 : 30분 소요 (sort()와 slice() 처리를 했으므로 O(nlogn)일 것임 - sort() 외에 다른 방법은 없을까?)
// Runtime: 192 ms
// Memory Usage: 51.7 MB
var kClosest = function (points, k) {
  points.sort((a, b) => {
    let aDistance = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
    let bDistance = Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2));

    return aDistance - bDistance;
  });

  return points.slice(0, k);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript ~very~ simple and easy to understand

// 위 글의 댓글에 달린 질문과 그 답변 : 'can you explain how this solution is O(nLogn) ? how can we for sure say the sort algo here runs in O(nlogn)?'
// 'Firefox uses merge sort. Chrome, as of version 70, uses a hybrid of merge sort and insertion sort called Timsort.'
// refer: https://stackoverflow.com/questions/57763205/what-is-array-prototype-sort-time-complexity
var kClosest = function (points, K) {
  return points.sort((a, b) => getLength(a) - getLength(b)).slice(0, K);
};

// we don't need to find square root of c here
// squared length is enough to determine order
var getLength = function ([x, y]) {
  return x * x + y * y;
};

// ======================================================================================

// 다른 사람의 코드 : javascript sort, minHeap and maxHeap solutions

// sort approach: (생략)

/*
min heap approach:
we can create a minHeap of the whole data set in O(n) time if we start from n/2 and heapify down each parent (see floyd method https://en.wikipedia.org/wiki/Binary_heap#Building_a_heap)

then we remove k times from the heap -> k * log(n) (need to heapify down on each removal)
runtime: O(N + k log (N))
space: O(1) since we are doing it in place
*/
var kClosest = function (points, k) {
  // we can build the heap in place
  let p = Math.floor((points.length - 2) / 2); // last parent
  for (let i = p; i >= 0; i--) {
    heapifyDown(points, i, distance);
  }

  // now we need to remove the smallest (points[0]) k times
  let solution = [];
  for (let i = 0; i < k; i++) {
    solution.push(remove(points, distance));
  }

  return solution;

  // read 0, replace 0 with last position, heapifyDown
  function remove(heap, weightFunction) {
    let val = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0, weightFunction);
    return val;
  }

  // compare with children, swap with smallest, repeat
  function heapifyDown(heap, idx, weightFunction) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let smallest = left;

    if (left >= heap.length) return;

    if (
      right < heap.length &&
      weightFunction(heap[left]) > weightFunction(heap[right])
    ) {
      smallest = right;
    }

    if (weightFunction(heap[idx]) > weightFunction(heap[smallest])) {
      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      heapifyDown(heap, smallest, weightFunction);
    }
  }

  function distance(point) {
    return point[0] * point[0] + point[1] * point[1];
  }
};

/*
max heap approach:
have a max heap of size k, so we would do N insertions that take log(k)
for this case we would need to implement heapify up (insert) and heapify down (remove)

runtime: O(N log(k))
space: O(k)
*/
var kClosest = function (points, k) {
  let heap = [];

  // now we need to try to add all points to the heap
  for (let i = 0; i < points.length; i++) {
    if (heap.length >= k && distance(points[i]) > distance(heap[0])) {
      // it's bigger than the max, we can just skip it
      continue;
    }
    add(heap, points[i], distance);
    if (heap.length > k) {
      remove(heap, distance);
    }
  }

  return heap;

  // add at end, heapify up
  function add(heap, node, weightFunction) {
    heap.push(node);
    heapifyUp(heap, heap.length - 1, weightFunction);
  }

  // compare with parent and swap if needed, repeat
  function heapifyUp(heap, idx, weightFunction) {
    if (idx === 0) return;
    let parent = Math.floor((idx - 1) / 2);
    if (weightFunction(heap[idx]) > weightFunction(heap[parent])) {
      [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
      heapifyUp(heap, parent, weightFunction);
    }
  }

  // read 0, replace 0 with last position, heapifyDown
  function remove(heap, weightFunction) {
    let val = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0, weightFunction);
    return val;
  }

  // compare with children, swap with biggest, repeat
  function heapifyDown(heap, idx, weightFunction) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let biggest = left;

    if (left >= heap.length) return;

    if (
      right < heap.length &&
      weightFunction(heap[left]) < weightFunction(heap[right])
    ) {
      biggest = right;
    }

    if (weightFunction(heap[idx]) < weightFunction(heap[biggest])) {
      [heap[idx], heap[biggest]] = [heap[biggest], heap[idx]];
      heapifyDown(heap, biggest, weightFunction);
    }
  }

  function distance(point) {
    return point[0] * point[0] + point[1] * point[1];
  }
};

// ======================================================================================

// 다른 사람의 코드 : Javascript quickselect
// FYI, this is not my original solution. I rewrote the answer from the fastest sample solution.
var kClosest = function (points, K) {
  const swap = (i1, i2) => {
    [points[i1], points[i2]] = [points[i2], points[i1]];
  };
  const distance = (point) => point[0] ** 2 + point[1] ** 2;

  const partition = (lo, hi) => {
    // pick last one as pivot
    const pivotDist = distance(points[hi]);
    let targetPivotIdx = lo,
      searchIdx = lo;
    // compare from lo to hi
    while (searchIdx < hi) {
      const dist = distance(points[searchIdx]);
      if (dist <= pivotDist) {
        swap(searchIdx, targetPivotIdx);
        targetPivotIdx += 1;
      }
      searchIdx += 1;
    }
    // hi goes to target pivot
    swap(hi, targetPivotIdx);
    return targetPivotIdx;
  };

  const quickSelect = (lo, hi, target) => {
    const pivot = partition(lo, hi);
    if (pivot === target - 1) return;
    if (pivot < target - 1) {
      quickSelect(pivot + 1, hi, target);
    } else {
      quickSelect(lo, pivot - 1, target);
    }
  };

  quickSelect(0, points.length - 1, K);
  return points.slice(0, K);
};

// ======================================================================================

// 다른 사람의 코드 :JavaScript || Beats 99.89% || Runtime:144ms || Memory:46.3MB
var kClosest = function (points, K) {
  let l = 0;
  let r = points.length - 1;

  while (l <= r) {
    let m = partition(points, l, r);
    if (m === K) {
      break;
    } else if (m < K) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  return points.slice(0, K);
};

function partition(points, l, r) {
  let pivot = points[l];

  while (l < r) {
    while (l < r && compare(points[r], pivot) >= 0) r--;
    points[l] = points[r];
    while (l < r && compare(points[l], pivot) <= 0) l++;
    points[r] = points[l];
  }

  points[l] = pivot;
  return l;
}

function compare(a, b) {
  return a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]);
}
