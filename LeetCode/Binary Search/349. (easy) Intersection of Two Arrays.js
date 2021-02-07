/*  0207 : 349. (easy) Intersection of Two Arrays //  tag : Hash Table, Two Pointers, Binary Search, Sort

  Given two arrays, write a function to compute their intersection.


  Constraints:
    Each element in the result must be unique.
    The result can be in any order.


  Example 1: 
    Input: nums1 = [1,2,2,1], nums2 = [2,2]
    Output: [2]

  Example 2:
    Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    Output: [9,4]

*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

/*  내가 작성한 코드  (이진탐색 방법이 아니라 배열 방법이라 좀 그렇다...)

  시간복잡도 : O(4n => n) : getObjectWithUniqueElements 2번에서 반복문 2회, 그 후 반복문 2회(hasOwnProperty는 순회하지 않고 처리 가능할 듯) 
  공간복잡도 : O(3n => n) : obj1 / obj2 / answer 3개의 객체 및 배열이 필요

  Runtime: 84 ms, faster than 58.48% of JavaScript online submissions for Intersection of Two Arrays.
  Memory Usage: 41.1 MB, less than 9.62% of JavaScript online submissions for Intersection of Two Arrays.

*/
var intersection = function (nums1, nums2) {
  let obj1 = getObjectWithUniqueElements(nums1);
  let obj2 = getObjectWithUniqueElements(nums2);

  for (let key in obj2) {
    if (obj1.hasOwnProperty(key)) {
      obj1[key] = true;
    }
  }

  let answer = [];

  for (let el in obj1) {
    if (obj1[el]) {
      answer.push(Number(el));
    }
  }

  return answer;
};

function getObjectWithUniqueElements(array) {
  let obj = {};

  for (let each of array) {
    if (!obj[each]) {
      obj[each] = false;
    }
  }

  return obj;
}

// ======================================================================================

// 다른 사람의 코드 : javascript solutions: brute force, hashmap, set

// Brute Force Solution: O(n logn)
function intersect(nums1, nums2) {
  let sortedNums1 = nums1.sort((a, b) => a - b);
  let sortedNums2 = nums2.sort((a, b) => a - b);
  let result = [];
  let i = 0;
  let j = 0;

  while (i < sortedNums1.length && j < sortedNums2.length) {
    if (sortedNums1[i] === sortedNums2[j]) {
      if (!result.includes(sortedNums1[i])) result.push(sortedNums1[i]);
      i++;
      j++;
    } else if (sortedNums1[i] < sortedNums2[j]) i++;
    else j++;
  }
  return result;
}

// HashMap Solution: O(n)
function intersect(nums1, nums2) {
  let map = new Map();
  for (let num of nums1) {
    if (!map.has(num)) map.set(num, 1);
  }

  return nums2.filter((n) => {
    if (map.has(n)) {
      map.delete(n);
      return true;
    } else return false;
  });
}

// Solutions using Set - Solution 1: O(n)
function intersect(nums1, nums2) {
  let result = [];
  let setNum1 = new Set(nums1);
  let setNum2 = new Set(nums2);

  let [smallSet, largeSet] =
    setNum1.length < setNum2.length ? [setNum1, setNum2] : [setNum2, setNum1];

  smallSet.forEach((num) => {
    largeSet.has(num) && result.push(num);
  });

  return result;
}

// Solutions using Set - Solution 2: O(n)
function intersect(nums1, nums2) {
  let setNum1 = new Set(nums1);

  return [...new Set(nums2.filter((num) => setNum1.has(num)))];
}

// ======================================================================================

// 다른 사람의 코드 : Javascript idiomatic solution (beats 99% runtime, 100% memory)
var intersection = function (nums1, nums2) {
  return nums1
    .filter((n1) => nums2.includes(n1))
    .filter((e, i, s) => s.indexOf(e) === i);
};

// ======================================================================================

// 다른 사람의 코드 : Easy solution with Set
var intersection = function (nums1, nums2) {
  const num1Set = new Set(nums1);
  const num2Set = new Set(nums2);

  const result = [];

  for (var value of num1Set) {
    if (num2Set.has(value)) {
      result.push(value);
    }
  }

  return result;
};
