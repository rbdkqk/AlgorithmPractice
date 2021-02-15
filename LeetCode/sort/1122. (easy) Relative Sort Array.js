/*  0215 : 1122. (easy) Relative Sort Array  // tag : Array, Sort

  Given two arrays `arr1` and `arr2`, 
    the elements of `arr2` are distinct, and all elements in `arr2` are also in `arr1`.

  Sort the elements of `arr1` such that the relative ordering of items in `arr1` are the same as in `arr2`.  
    Elements that don't appear in `arr2` should be placed at the end of `arr1` in ascending order.


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

/*  내가 작성한 코드 : 

  시간복잡도 : O(4nlogn => nlogn) : reduce에서 n, for 반복문 2회에서 2n, sort()에서 nlogn
  공간복잡도 : O(2n => n) : answer, elseElements 두 배열과 obj 객체는 주어진 매개변수의 길이에 따라 길어지게 됨

  Runtime: 80 ms, faster than 72.27% of JavaScript online submissions for Relative Sort Array.
  Memory Usage: 39.4 MB, less than 28.32% of JavaScript online submissions for Relative Sort Array.

*/
var relativeSortArray = function (arr1, arr2) {
  let obj = arr1.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  let answer = [];
  let elseElements = [];

  for (let element of arr2) {
    while (obj[element] > 0) {
      answer.push(element);
      obj[element] = obj[element] - 1;
    }
    delete obj[element];
  }

  for (let key in obj) {
    while (obj[key] > 0) {
      elseElements.push(key);
      obj[key] = obj[key] - 1;
    }
    delete obj[key];
  }

  return answer.concat(elseElements.sort((a, b) => a - b));
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
