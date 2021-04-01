/*  0401 Mock Interview : 1. (easy) Two Sum  // tag : Array, Hash Table

  Given an array of integers `nums` and an integer `target`, 
    return indices of the two numbers such that they add up to target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  You can return the answer in any order.


  Constraints:
    2 <= nums.length <= 10^3
    -10^9 <= nums[i] <= 10^9
    -10^9 <= target <= 1069
    Only one valid answer exists.


  Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

  Example 2:
    Input: nums = [3,2,4], target = 6  [3, 4, 2] 
    Output: [1,2]

  Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 성공 : 20분 소요 (코드 작성중에 반복문 조건을 실수로 잘못 줬음 - 시간복잡도가 O(n^2)일 것 같다. 개선할 수 없을까?)
// Runtime: 76 ms
// Memory Usage: 39.1 MB
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : [Neat] JavaScript Map, O(n)
// 평소 key-value 설정할 때 key에는 index, value에는 array[index]를 넣었는데, 반대로 넣어서 써먹을수도 있다는 점을 기억해 둬야 하겠음
var twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }

  return [];
};
