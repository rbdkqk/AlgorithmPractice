/*  0209 : 1748. (easy) Sum of Unique Elements //  tag : Array, Hash Table

  You are given an integer array `nums`. 
  
  The unique elements of an array are the elements that appear exactly once in the array.

  Return the sum of all the unique elements of nums.


  Constraints:
    1 <= nums.length <= 100
    1 <= nums[i] <= 100


  Example 1: 
    Input: nums = [1,2,3,2]
    Output: 4
    Explanation: The unique elements are [1,3], and the sum is 4.
    
  Example 2:
    Input: nums = [1,1,1,1,1]
    Output: 0
    Explanation: There are no unique elements, and the sum is 0.
    
  Example 3:
    Input: nums = [1,2,3,4,5]
    Output: 15
    Explanation: The unique elements are [1,2,3,4,5], and the sum is 15.

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*  내가 작성한 코드

  시간복잡도 : O(2n => n) : 반복문 2회
  공간복잡도 : O(n) : obj 객체는 nums 배열의 길이에 따라 더 길어질 수 있음

  Runtime: 76 ms, faster than 89.23% of JavaScript online submissions for Sum of Unique Elements.
  Memory Usage: 38.9 MB, less than 38.46% of JavaScript online submissions for Sum of Unique Elements.

*/
var sumOfUnique = function (nums) {
  let answer = 0;
  let obj = {};

  for (let each of nums) {
    if (!obj[each]) {
      obj[each] = 1;
    } else {
      obj[each] = obj[each] + 1;
    }
  }

  for (let key in obj) {
    if (obj[key] === 1) {
      answer += Number(key);
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript simple and straightforward hash table solution
var sumOfUnique = function (nums) {
  var unique = [...new Set(nums)];
  var map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], { value: 0 });
    } else {
      map.set(nums[i], { value: 1 });
    }
  }
  var sum = 0;
  for (let i = 0; i < unique.length; i++) {
    if (map.get(unique[i]).value == 1) sum -= unique[i];
    sum += unique[i];
  }

  return sum;
};

// ======================================================================================

// 다른 사람의 코드 : 100% Faster JS Solution
var sumOfUnique = function (nums) {
  var sum = 0;
  let a = new Set(nums);
  for (var t of a.keys()) {
    var count = 0;
    for (var q = 0; q < nums.length; q++) {
      if (nums[q] == t) count++;
    }
    if (count <= 1) sum += t;
  }
  return sum;
};
