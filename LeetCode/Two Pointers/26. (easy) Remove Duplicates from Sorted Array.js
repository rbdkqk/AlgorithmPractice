/*  230202 : 26. (easy) Remove Duplicates from Sorted Array   //  tag : Array, Two Pointers

  Given an integer array nums sorted in non-decreasing order,
    remove the duplicates in-place such that each unique element appears only once.
  The relative order of the elements should be kept the same.

  Since it is impossible to change the length of the array in some languages,
    you must instead have the result be placed in the first part of the array nums.
  More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result.
  It does not matter what you leave beyond the first k elements.

  Return k after placing the final result in the first k slots of nums.

  Do not allocate extra space for another array.
  You must do this by modifying the input array in-place with O(1) extra memory.
*/

/*  Custom Judge: The judge will test your solution with the following code:

  int[] nums = [...]; // Input array
  int[] expectedNums = [...]; // The expected answer with correct length

  int k = removeDuplicates(nums); // Calls your implementation

  assert k == expectedNums.length;
  for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
  }

  If all assertions pass, then your solution will be accepted.
*/

/*  Constraints:
  1 <= nums.length <= 3 * 10^4
  -100 <= nums[i] <= 100
  nums is sorted in non-decreasing order.
 */

/*  Example
  Example 1:
    Input: nums = [1,1,2]
    Output: 2, nums = [1,2,_]
    Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).

  Example 2:
    Input: nums = [0,0,1,1,1,2,2,3,3,4]
    Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
    Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

// 풀지 못했음 - 아래는 실패한 답안
var removeDuplicates = function (nums) {
  const startNumber = nums[0]; // 0
  const biggestNumber = nums[nums.length - 1]; // 4
  let answer = NaN;

  for (let i = 0; i < nums.length; i++) {
    if (startNumber + i > biggestNumber) {
      nums[i] = NaN;
      continue;
    }

    nums[i] = startNumber + i;

    if (nums[i] === biggestNumber) {
      answer = i + 1;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : 4 Lines of code, fast and easy solution
var removeDuplicates = function (nums) {
  let left = 0;

  for (let right = 1; right < nums.length; right++) {
    if (nums[left] != nums[right]) {
      nums[++left] = nums[right];
    }
  }

  return left + 1;
};

// ======================================================================================

// 다른 사람의 코드 : [JS] [97.1%] [two pointers]
var removeDuplicates = function (nums) {
  let l;
  let r = 1;

  while (r < nums.length && nums[r] !== nums[r - 1]) {
    r++;
  }

  l = r;
  r++;

  while (r < nums.length) {
    if (nums[r] != nums[r - 1]) {
      nums[l] = nums[r];
      l++;
    }
    r++;
  }

  return l;
};

// ======================================================================================

// 다른 사람의 코드 : (Comment of) [JS] [97.1%] [two pointers]
var removeDuplicates = function (nums) {
  let l = 1;
  let r = 1;

  while (r < nums.length) {
    if (nums[r] != nums[r - 1]) {
      nums[l] = nums[r];
      l++;
    }
    r++;
  }

  return l;
};
