/*  0305 Mock Interview : 35. (easy) Search Insert Position  //  tag : Array, Binary Search

  Given a sorted array of distinct integers and a target value, 
    return the index if the target is found. 
    
  If not, return the index where it would be if it were inserted in order.


  Constraints:
    1 <= nums.length <= 10^4
    -10^4 <= nums[i] <= 10^4
    nums contains distinct values sorted in ascending order.
    -10^4 <= target <= 10^4


  Example 1:
    Input: nums = [1,3,5,6], target = 5
    Output: 2

  Example 2:
    Input: nums = [1,3,5,6], target = 2
    Output: 1

  Example 3:
    Input: nums = [1,3,5,6], target = 7
    Output: 4

  Example 4:
    Input: nums = [1,3,5,6], target = 0
    Output: 0
  
  Example 5:
    Input: nums = [1], target = 0
    Output: 0

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 5분 정도 소요됨
// Runtime: 68 ms
// Memory Usage: 38.8 MB
var searchInsert = function (nums, target) {
  if (target <= nums[0]) {
    return 0;
  } else if (nums[nums.length - 1] < target) {
    return nums.length;
  } else if (nums[nums.length - 1] === target) {
    return nums.length - 1;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === target) {
      return i;
    } else {
      if (nums[i] < target && target < nums[i + 1]) {
        return i + 1;
      }
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Fastest Javascript solution -  Binary Search log n
function searchInsert(nums, target) {
  return binarySearch(nums, target, 0, nums.length - 1);
}

function binarySearch(array, target, start, end) {
  // If the target is less then the very last item then insert it at that item index
  // because anything index less then that has already been confirmed to be less then the target.
  // Otherwise insert it at that item index + 1
  // because any index grater then that has already been confirmed to be greater then the target
  if (start > end) return start;

  const midPoint = Math.floor((start + end) / 2);

  // found target
  if (array[midPoint] === target) return midPoint;

  // search the left side
  if (array[midPoint] > target)
    return binarySearch(array, target, start, midPoint - 1);
  // search the right side
  if (array[midPoint] < target)
    return binarySearch(array, target, midPoint + 1, end);
}

// ======================================================================================

// 다른 사람의 코드 : Javascript solution (1 line) (92%)
// 위 글의 댓글 코드를 남김
var searchInsert = function (nums, target) {
  return nums.filter((n) => n < target).length;
};
