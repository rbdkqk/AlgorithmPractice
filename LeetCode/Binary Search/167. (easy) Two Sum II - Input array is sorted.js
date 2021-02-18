/*  0218 : 167. (easy) Two Sum II - Input array is sorted  //  tag : Array, Two Pointers, Binary Search

  Given an array of integers `numbers` that is already sorted in ascending order, 
    find two numbers such that they add up to a specific `target` number.

  Return the indices of the two numbers (1-indexed) as an integer array `answer` of size `2`, 
    where `1 <= answer[0] < answer[1] <= numbers.length`.

  You may assume that each input would have exactly one solution 
    and you may not use the same element twice.


  Constraints:
    2 <= numbers.length <= 3 * 10^4
    -1000 <= numbers[i] <= 1000
    numbers is sorted in increasing order.
    -1000 <= target <= 1000
    Only one valid answer exists.


  Example 1:
    Input: numbers = [2,7,11,15], target = 9
    Output: [1,2]
    Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

  Example 2:
    Input: numbers = [2,3,4], target = 6
    Output: [1,3]
  
  Example 3:
    Input: numbers = [-1,0], target = -1
    Output: [1,2]

*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

// 내가 작성한 코드 : 실패함
var twoSum = function (numbers, target) {
  let start = numbers[0];
  let startIndex = 0;
  let end = numbers[1];
  let endIndex = 1;

  while (true) {
    if (start + end === target) {
      return [startIndex + 1, endIndex + 1];
    }

    if (start + end > target) {
      startIndex++;
      start = numbers[startIndex];
    }

    if (start + end < target) {
      endIndex++;
      end = numbers[endIndex];
    }

    if (startIndex === numbers.length - 2 && endIndex === numbers.length - 1) {
      start = numbers[0];
      startIndex = 0;
      end = numbers[1];
      endIndex = 1;
      numbers.pop();
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Cleanest JS
const twoSum = (numbers, target) => {
  let p1 = 0;
  let p2 = numbers.length - 1;

  while (numbers[p1] + numbers[p2] !== target) {
    if (numbers[p1] + numbers[p2] > target) {
      p2--;
    } else {
      p1++;
    }
  }

  return [p1 + 1, p2 + 1];
};
