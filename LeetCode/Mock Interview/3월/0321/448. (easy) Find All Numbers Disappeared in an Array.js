/*  0321 Mock Interview : 448. (easy) Find All Numbers Disappeared in an Array  // tag : Array

  Given an array of integers where `1 ≤ a[i] ≤ n` (n = size of array), 
    some elements appear twice and others appear once.

  Find all the elements of `[1, n]` inclusive that do not appear in this array.

  Could you do it without extra space and in O(n) runtime? 
    You may assume the returned list does not count as extra space.


  Example 1:
    Input: [4,3,2,7,8,2,3,1]
    Output: [5,6]

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 해결법을 떠올리지 못해서, 아래 링크에서 방법을 봤음 - 내가 생각하지 못한 대신, 이 방법의 원리를 더 고민해 봐야겠다
// https://medium.com/@saurav.agg19/find-all-numbers-disappeared-in-an-array-c6a01393909

// 25분 소요
// Runtime: 116 ms
// Memory Usage: 46.3 MB
var findDisappearedNumbers = function (nums) {
  let answer = [];

  for (let i = 0; i < nums.length; i++) {
    let val = Math.abs(nums[i]) - 1;
    if (nums[val] > 0) {
      nums[val] = -nums[val];
    }
  }

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] > 0) {
      answer.push(j + 1);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : O(N), O(1) JS Solution - Time Complexity: O(N) / Space Complexity: O(1)
/*
  We will scan through the input array and for every number we will use its value as an index and negate the number at the index. 
  For example, if we encounter 4, we will negate the number at index 3.
  The reason the index is not four is because the array is zero-indexed.
*/
var findDisappearedNumbers = function (nums) {
  let res = [];

  for (let i = 0; i < nums.length; i++) {
    let num = Math.abs(nums[i]);
    let idx = num - 1;
    nums[idx] = Math.abs(nums[idx]) * -1;
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }

  return res;
};
