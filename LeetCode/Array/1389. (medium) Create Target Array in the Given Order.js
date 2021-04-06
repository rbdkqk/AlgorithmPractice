/*  0406 : 1389. (medium) Create Target Array in the Given Order  //  tag : Array

  Given two arrays of integers `nums` and `index`. 

  Your task is to create target array under the following rules:
    Initially `target` array is empty.
    From left to right read nums[i] and index[i], insert at index index[i] the value nums[i] in target array.
    Repeat the previous step until there are no elements to read in nums and index.

  Return the target array.

  It is guaranteed that the insertion operations will be valid.


  Constraints:
    1 <= nums.length, index.length <= 100
    nums.length == index.length
    0 <= nums[i] <= 100
    0 <= index[i] <= i


  Example 1:
    Input: nums = [0,1,2,3,4], index = [0,1,2,2,1]
    Output: [0,4,1,3,2]
    Explanation:
      nums       index     target
      0            0        [0]
      1            1        [0,1]
      2            2        [0,1,2]
      3            2        [0,1,3,2]
      4            1        [0,4,1,3,2]

  Example 2:
    Input: nums = [1,2,3,4,0], index = [0,1,2,3,0]
    Output: [0,1,2,3,4]
    Explanation:
      nums       index     target
      1            0        [1]
      2            1        [1,2]
      3            2        [1,2,3]
      4            3        [1,2,3,4]
      0            0        [0,1,2,3,4]

  Example 3:
    Input: nums = [1], index = [0]
    Output: [1]

*/

/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */

// 성공 : 10분 소요 (slice()와 spread operator 처리 때문에 시간복잡도에서 불리할 것 같다)
// Runtime: 80 ms, faster than 51.20% of JavaScript online submissions for Create Target Array in the Given Order.
// Memory Usage: 40.7 MB, less than 6.16% of JavaScript online submissions for Create Target Array in the Given Order.
var createTargetArray = function (nums, index) {
  let target = [];

  for (let i = 0; i < nums.length; i++) {
    if (target[index[i]] === undefined) {
      target[index[i]] = nums[i];
    } else {
      let before = target.slice(0, index[i]);
      let after = target.slice(index[i]);
      target = [...before, nums[i], ...after];
    }
  }

  return target;
};

// ======================================================================================

// 다른 사람의 코드 : Easy JavaScript Solution 95.24%
var createTargetArray = function (nums, index) {
  let result = [];

  for (let number of nums) {
    let idx = index.shift();
    result.splice(idx, 0, number);
  }

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : Fast & Simple JavaScript Solution

// w/ Splice
const createTargetArray = (nums, idx) => {
  let target = [];
  for (const i in nums) target.splice(idx[i], 0, nums[i]);
  return target;
};

// You can also preprocess the idxArr to avoiding having to shift elements:
const createTargetArray = (nums, idxArr) => {
  let target = [];
  for (let i = 0; i < idxArr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (idxArr[i] <= idxArr[j]) idxArr[j]++;
    }
  }
  for (const i in nums) target[idxArr[i]] = nums[i];
  return target;
};

// Optimization: only loop when necessary
const createTargetArray = (nums, idxArr) => {
  let target = [],
    max = -1;
  for (let i = 0; i < idxArr.length; i++) {
    if (idxArr[i] <= max) {
      for (let j = 0; j < i; j++) {
        if (idxArr[i] <= idxArr[j]) idxArr[j]++;
        if (idxArr[j] > max) max = idxArr[j];
      }
    }
    max = Math.max(max, idxArr[i]);
  }
  for (const i in nums) target[idxArr[i]] = nums[i];
  return target;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution
var createTargetArray = function (nums, index) {
  return index.reduce((result, index, i) => {
    const leftSide = result.slice(0, index);
    const rightSide = result.slice(index);
    return [...leftSide, nums[i], ...rightSide];
  }, []);
};
