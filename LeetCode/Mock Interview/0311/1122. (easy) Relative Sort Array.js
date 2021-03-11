/*  0311 Mock Interview : 1122. (easy) Relative Sort Array  // tag : Array, Sort
  (앞서 만나서 풀었던 문제 - 0215)

  Given two arrays `arr1` and `arr2`, 
    the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

  Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2.  
    Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.


  Constraints:
    1 <= arr1.length, arr2.length <= 1000
    0 <= arr1[i], arr2[i] <= 1000
    All the elements of arr2 are distinct.
    Each arr2[i] is in arr1.


  Example 1:
    Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
    Output:       [2,2,2,1,4,3,3,9,6,7,19]

*/

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */

// 성공 - 전에 만났던 문제인데, 더 효율적으로 푸는 방법이 있었는데 생각해 내지 못해 아쉬움
// Runtime: 76 ms
// Memory Usage: 38.6 MB
var relativeSortArray = function (arr1, arr2) {
  let arr1Map = new Map();
  let arr1ElseArray = [];

  let arr2Obj = arr2.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2Obj[arr1[i]]) {
      arr1ElseArray.push(arr1[i]);
    } else {
      arr1Map.set(arr1[i], (arr1Map.get(arr1[i]) || 0) + 1);
    }
  }

  let answer = [];

  for (let j = 0; j < arr2.length; j++) {
    let current = arr2[j];

    while (arr1Map.get(current) > 0) {
      answer.push(current);
      arr1Map.set(current, arr1Map.get(current) - 1);
    }
  }

  arr1ElseArray.sort((a, b) => a - b);

  return [...answer, ...arr1ElseArray];
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution with custom comparator
// 잘 이해되지 않음
var relativeSortArray = function (arr1, arr2) {
  const lookup = new Map();

  const N = arr2.length;

  arr2.forEach((a, i) => {
    lookup.set(a, i);
  });

  return arr1.sort((a, b) => {
    a = lookup.has(a) ? lookup.get(a) : N + a;
    b = lookup.has(b) ? lookup.get(b) : N + b;
    return a - b;
  });
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Solution
// 내 방법과 유사해 보임
var relativeSortArray = function (arr1, arr2) {
  const countMapping = {};
  const solArr = [];
  const restArr = [];

  for (const val of arr2) {
    countMapping[val] = 0;
  }

  for (const val of arr1) {
    if (countMapping[val] >= 0) {
      countMapping[val]++;
    } else {
      restArr.push(val);
    }
  }

  for (const val of arr2) {
    for (let i = 0; i < countMapping[val]; i++) {
      solArr.push(val);
    }
  }

  return [...solArr, ...restArr.sort((a, b) => (a > b ? 1 : -1))];
};

// ======================================================================================

// 다른 사람의 코드 : javascript
var relativeSortArray = function (arr1, arr2) {
  let h = {};

  for (let i = 0; i < arr2.length; ++i) {
    h[arr2[i]] = i;
  }

  for (const i of arr1) {
    if (!(i in h)) {
      h[i] = 1000 + i;
    }
  }

  arr1.sort((a, b) => h[a] - h[b]);

  return arr1;
};
