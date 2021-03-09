/*  0309-1 Mock Interview : 162. (medium) Find Peak Element  //  tag : Array, Binary Search

  A peak element is an element that is strictly greater than its neighbors.

  Given an integer array `nums`, find a peak element, and return its index. 
    If the array contains multiple peaks, return the index to any of the peaks.

  You may imagine that nums[-1] = nums[n] = -∞.


  Constraints:
    1 <= nums.length <= 1000
    -2^31  <= nums[i] <= 2^31 - 1
    nums[i] != nums[i + 1] for all valid i. 

    
  Example 1:
    Input: nums = [1,2,3,1]
    Output: 2
    Explanation: 3 is a peak element and your function should return the index number 2.
    
  Example 2:
    Input: nums = [1,2,1,3,5,6,4]
    Output: 5
    Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
    
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

// 성공 : 10분 소요
// 하나의 연산으로 전체를 탐색하지 못하고, 길이가 1일때 / 맨 앞의 값을 확인할 때 / 맨 뒤의 값을 확인할 때 / 그 외 등의 4가지로 나누어 작성한 점이 아쉽다

// Runtime: 80 ms
// Memory Usage: 38.9 MB
var findPeakElement = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      if (nums[i] > nums[i + 1]) {
        return i;
      }
    } else if (i === nums.length - 1) {
      if (nums[i] > nums[i - 1]) {
        return i;
      }
    } else {
      let currentNumber = nums[i];
      if (nums[i - 1] < currentNumber && currentNumber > nums[i + 1]) {
        return i;
      }
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Simple Binary and Linear Search

// Binary Search - Time: O(logN)
// 컨셉 : 'mid와 mid다음값을 비교해서,
// mid가 작다면 mid 왼쪽은 볼 필요 없으니 left를 mid로 옮기고, mid가 크다면 mid 오른쪽은 볼 필요 없으니 right를 mid+1로 옮긴다'
var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length - 1,
    mid;

  while (left < right) {
    mid = Math.floor((right + left) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// Linear Search - Time: O(N)
// 2개만 비교하면 된다는 점을 나는 생각해 내지 못했음
// 컨셉 : '첫번째와 두번째를 비교했을 때 첫번째가 크지 않아 넘어갔다면, 두번째와 세번째를 비교할 때에 두번째는 이미 첫번째보다 크다는 것이 확실하다'
// '마지막까지 탐색했는데도 안걸렸다면, 마지막 앞의 값이 마지막 값보다 작다는 뜻이므로, 마지막 값의 인덱스를 리턴하면 된다'
var findPeakElement = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) {
      return i;
    }
  }

  return nums.length - 1;
};
