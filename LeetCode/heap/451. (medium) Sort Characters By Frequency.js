/*  0214 : 451. (medium) Sort Characters By Frequency   //  tag : Hash Table, Heap

  Given a string, sort it in decreasing order based on the frequency of characters.


  Example 1:
    Input: "tree"
    Output: "eert"
    Explanation:
      'e' appears twice while 'r' and 't' both appear once.
      So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

  Example 2:
    Input: "cccaaa"
    Output: "cccaaa"
    Explanation:
      Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
      Note that "cacaca" is incorrect, as the same characters must be together.

  Example 3:
    Input: "Aabb"
    Output: "bbAa"
    Explanation:
      "bbaA" is also a valid answer, but "Aabb" is incorrect.
      Note that 'A' and 'a' are treated as two different characters.

*/

/**
 * @param {string} s
 * @return {string}
 */

/*  내가 작성한 코드 : 이 문제의 2개의 태그 중 Hash Table에 해당하는 방법으로 풀은 것 같다. / Heap은 활용하지 않은 것 같음.
    => 가장 빈도가 높은 문자열이 먼저 표시되어야 하므로, '최대 힙'을 활용하라는 의도가 아닐까? (아래 다른 사람의 코드에 갖다놓음)
    => 힙 공부자료 : https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html

  시간복잡도 : O(4nlogn => nlogn) : 첫 반복문에서 n, Array.from에서 n, sort에서 nlogn, 다음 반복문에서 n
  공간복잡도 : O(3n => n) : s 문자열의 길이에 따라서, answer, map, array 3개 변수의 크기가 달라짐

  Runtime: 84 ms, faster than 98.66% of JavaScript online submissions for Sort Characters By Frequency.
  Memory Usage: 46.3 MB, less than 37.06% of JavaScript online submissions for Sort Characters By Frequency.

*/
var frequencySort = function (s) {
  let answer = '';

  let map = new Map();

  for (let letter of s) {
    if (!map.has(letter)) {
      map.set(letter, 1);
    } else {
      map.set(letter, map.get(letter) + 1);
    }
  }

  let array = Array.from(map);

  array.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    else if (a[1] > b[1]) return -1;
    else return 0;
  });

  for (let each of array) {
    let count = each[1];
    while (count > 0) {
      answer += each[0];
      count--;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean 3 liner Solution
// 발상은 비슷해 보이는데, 코드 작성 기술에서 아래와 같은 차이가 있다.
// (1) reduce를 통해 charMap 객체를 만드는 방법을 기억해 놓아야 하겠음
// (2) sort 방법도 이 코드가 보다 간편하다
// (3) 마지막 리턴값도 reduce를 활용해서 간단하게 표현함
var frequencySort = function (s) {
  const charMap = s.split('').reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const sortedArr = Object.keys(charMap).sort(
    (a, b) => charMap[b] - charMap[a]
  );

  return sortedArr.reduce((acc, cur) => acc + cur.repeat(charMap[cur]), '');
};

// ======================================================================================

// 다른 사람의 코드 : Javascript O(nlogn) using a Max Heap
var frequencySort = function (s) {
  let count = {};
  // O(n)
  for (const c of s) {
    if (!count[c]) count[c] = 0;
    count[c]++;
  }

  let heap = new MaxHeap();

  // O(nlogn)
  for (const key of Object.keys(count)) {
    heap.insert(new HeapObject(key, count[key]));
  }

  let output = '';
  // O(nlogn)
  while (heap.size()) {
    const obj = heap.extractMax();
    while (obj.count > 0) {
      output += obj.character;
      obj.count--;
    }
  }
  return output;
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
