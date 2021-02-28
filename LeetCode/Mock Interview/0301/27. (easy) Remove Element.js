/*  0301 Mock Interview : 27. (easy) Remove Element  //  tag : Array, Two Pointers

  Given an array nums and a value `val`, 
    remove all instances of that value in-place and return the new length.

  Do not allocate extra space for another array, 
    you must do this by modifying the input array in-place with O(1) extra memory.

  The order of elements can be changed. 
    It doesn't matter what you leave beyond the new length.


  Clarification:
    Confused why the returned value is an integer but your answer is an array?

    Note that the input array is passed in by reference, 
      which means a modification to the input array will be known to the caller as well.

    Internally you can think of this:
      `nums` is passed in by `reference`. (i.e., without making a copy)
      int len = removeElement(nums, val);

      any modification to nums in your function would be known by the caller.
      using the length returned by your function, it prints the first len elements.
        for (int i = 0; i < len; i++) {
          print(nums[i]);
        }


  Constraints:
    0 <= nums.length <= 100
    0 <= nums[i] <= 50
    0 <= val <= 100


  Example 1:
    Input: nums = [3,2,2,3], val = 3
    Output: 2, nums = [2,2]
    Explanation: 
      Your function should return length = 2, with the first two elements of nums being 2.
      It doesn't matter what you leave beyond the returned length. 
      For example if you return 2 with nums = [2,2,3,3] or nums = [2,2,0,0], your answer will be accepted.

  Example 2:
    Input: nums = [0,1,2,2,3,0,4,2], val = 2
    Output: 5, nums = [0,1,4,0,3]
    Explanation: 
      Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4. 
      Note that the order of those five elements can be arbitrary. 
      It doesn't matter what values are set beyond the returned length.    

*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

// 40분 소요
var removeElement = function (nums, val) {
  let start = 0;
  let next = 1;

  if (nums.lengthh === 1) {
    if (nums[0] === val) {
      nums.pop();
      return 0;
    }
  }

  while (start < nums.length - 1 && next < nums.length) {
    if (nums[start] === val) {
      if (nums[next] !== val) {
        [nums[start], nums[next]] = [nums[next], nums[start]];
        start++;
        next++;
      } else if (nums[next] === val) {
        next++;
      }
    } else if (nums[start] !== val) {
      if (next - start > 1) {
        start++;
      } else {
        start++;
        next++;
      }
    }
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === val) {
      nums.pop();
    } else {
      break;
    }
  }

  return nums.length;
};

// ======================================================================================

// solution : Approach 1: Two Pointers - O(n) / O(1)
var removeElement = function (nums, val) {
  let i = 0;

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++;
    }
  }

  return i;
};

// ======================================================================================

// solution : Approach 2: Two Pointers - when elements to remove are rare - O(n) / O(1)
var removeElement = function (nums, val) {
  let i = 0;
  let n = nums.length;

  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1];
      // reduce array size by one
      n--;
    } else {
      i++;
    }
  }

  return n;
};

// ======================================================================================

// 다른 사람의 코드 : javascript 36ms (100% 97.34%)
// 시간복잡도가 불리해 보이는데(O(n^2)), 공간복잡도는 문제에서 요구한대로 추가공간 없이 O(1)로 처리된 것 같음
var removeElement = function (nums, val) {
  while (nums.indexOf(val, 0) >= 0) {
    nums.splice(nums.indexOf(val, 0), 1);
  }
  return nums.length;
};
