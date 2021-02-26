/*  0226 : 1528. (easy) Shuffle String  //  tag : Array

  이 문제는 일단 통과는 돼서 올림
    - 그러나, Follow up에서 주어진 조건은 만족하지 못했고, 해답 코드를 봐도 잘 이해가 되지 않음

  Given an unsorted integer array `nums`, find the smallest missing positive integer.


  Constraints:
    0 <= nums.length <= 300
    -2^31 <= nums[i] <= 2^31 - 1


  Example 1:
    Input: nums = [1,2,0]
    Output: 3
  
  Example 2:
    Input: nums = [3,4,-1,1]
    Output: 2
  
  Example 3:
    Input: nums = [7,8,9,11,12]
    Output: 1


  Follow up: 
    Could you implement an algorithm that runs in O(n) time and uses constant extra space?

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*  내가 작성한 코드 (30분 내외 소요, 9회 실패 후 성공) - Follow up 조건은 맞추지 못했음
  
  시간복잡도 : O(nlogn) : sort()에서 nlogn, slice()에서 n, for 반복문에서 n
  공간복잡도 : O(n) : slice()의 결과물은 nums 배열 전체일 수 있다

  Runtime: 84 ms, faster than 57.39% of JavaScript online submissions for First Missing Positive.
  Memory Usage: 38.9 MB, less than 54.86% of JavaScript online submissions for First Missing Positive.

*/
var firstMissingPositive = function (nums) {
  if (nums.length === 0) return 1;

  nums.sort((a, b) => a - b);

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] > 0) {
      nums = nums.slice(j);
      break;
    }
  }

  if (nums.length === 0 || nums[0] > 1) return 1;
  if (nums.length === 1 && nums[0] === 1) return 2;

  if (nums[nums.length - 1] <= 0) return 1;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) continue;
    if (nums[i + 1] - nums[i] !== 1) {
      return nums[i] + 1;
    }
  }

  return nums[nums.length - 1] + 1;
};

// ======================================================================================

// 다른 사람의 코드 : Simple JavaScript O(n) time and O(1) space
// 전혀 이해하지 못함
/*  설명
  Go through and place each number at the index of its value (minus one since 0 isn't positive). 
  All the negative and out-of-bounds elements should now be in the missing gap or on the right side of the array.
  Walk through and take the first index (plus one) which does not match its associated value.
*/
var firstMissingPositive = function (nums) {
  let i = 0;

  while (i < nums.length) {
    if (
      nums[i] > 0 &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    } else {
      i++;
    }
  }

  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return i + 1;
};

// ======================================================================================

// 다른 사람의 코드 : Three JS Solutions

// Time Complexity: O(nlog(n))  /  Space Complexity: O(n)
var firstMissingPositive = function (nums) {
  nums = Array.from(new Set(nums));
  nums = nums.sort((a, b) => a - b).filter((num) => num > 0);
  let j = 1;
  for (let i = 0; i < nums.length; i++) {
    if (j == nums[i]) j++;
    else return j;
  }
  return j;
};

// Time Complexity: O(n)  /  Space Complexity: O(n)
var firstMissingPositive = function (nums) {
  let m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], 1);
  }
  for (let i = 1; i <= nums.length; i++) {
    if (!m.has(i)) return i;
  }
  return nums.length + 1; // the array is [1,2,...,n]

  /*
  The worst case (the first missing positive being the greatest) is
  when the array is [1,2..,n]. Therefore, in all other cases except this case, 
  the first missing positive number is less than or equal to n (nums.length).
  */
};

// Time Complexity: O(n)  /  Space Complexity: O(1)
var firstMissingPositive = function (nums) {
  // First, we need to understand that the first missing positive number is less than or equal to n (length of array) except for one case.
  // The explanation is in the above.
  // We will position every positive integer in the array at its corresponding index
  // ex) 1 at index 0, 2 at index 1, 3 at index 2
  // In this way, the array can position all integers that are less than or equal to n at their corresponding indices without changing the size of given array.
  // Therefore, we can find the first missing positive integer by scanning through the array.

  for (let i = 0; i < nums.length; i++) {
    let idx = nums[i] - 1;
    if (i == idx || nums[i] == nums[idx]) continue; // already positioned or nums[i] is a duplicate
    if (idx >= 0 && idx <= nums.length - 1) {
      [nums[i], nums[idx]] = [nums[idx], nums[i]];
      i--; // check the swapped number
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (i + 1 == nums[i]) continue;
    else return i + 1; // the next positive number which is i+1 doesn't exist in the array
  }

  return nums.length + 1; // the array is [1,2,...,n]
};
