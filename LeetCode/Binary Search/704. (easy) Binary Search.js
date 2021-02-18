/*  0218 : 704. (easy) Binary Search  //  tag : Array, Two Pointers, Binary Search

  Given a sorted (in ascending order) integer array `nums` of `n` elements and a `target` value, 
    write a function to search `target` in `nums`. 
  
  If target exists, then return its index, otherwise return `-1`.


  Constraints:
    You may assume that all elements in nums are unique.
    n will be in the range [1, 10000].
    The value of each element in nums will be in the range [-9999, 9999].


  Example 1:
    Input: nums = [-1,0,3,5,9,12], target = 9
    Output: 4
    Explanation: 9 exists in nums and its index is 4

  Example 2:
    Input: nums = [-1,0,3,5,9,12], target = 2
    Output: -1
    Explanation: 2 does not exist in nums so return -1

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/* 내가 작성한 코드

  시간복잡도 : 잘 모르겠음
  공간복잡도 : 잘 모르겠음

  Runtime: 100 ms, faster than 13.66% of JavaScript online submissions for Binary Search.
  Memory Usage: 43.6 MB, less than 9.15% of JavaScript online submissions for Binary Search.

*/
var search = function (nums, target) {
  function recursion(array, index) {
    let middleIndex = parseInt(array.length / 2);

    index += middleIndex;

    if (nums[index] === target) {
      return index;
    } else if (
      array.length === 0 ||
      (array.length === 1 && array[0] !== target)
    ) {
      return -1;
    }

    let left = array.slice(0, middleIndex);
    let right = array.slice(middleIndex);

    if (left[0] <= target && target <= left[left.length - 1]) {
      return recursion(left, index - middleIndex);
    } else {
      return recursion(right, index);
    }
  }

  return recursion(nums, 0);
};

// ======================================================================================

// 다른 사람의 코드 : Binary Search 101
// https://leetcode.com/problems/binary-search/discuss/423162/Binary-Search-101
var search = function (nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo < hi) {
    let mid = lo + Math.floor((hi - lo + 1) / 2);
    if (target < nums[mid]) {
      hi = mid - 1;
    } else {
      lo = mid;
    }
  }
  return nums[lo] == target ? lo : -1;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript beats 90% runtime
var search = function (nums, target) {
  let start = 0,
    end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
};
